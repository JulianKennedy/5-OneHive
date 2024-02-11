const port = 3000; // You can choose any available port
const sql = require('./sql.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()) 						// to parse application/json
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// access config var
process.env.TOKEN_SECRET;

var db = new sql();

// function generateAccessToken(username) {
//     return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1d' });
//   }

//   function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
  
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, String(process.env.TOKEN_SECRET), (err, user) => {
//         console.log(err)

//         if (err) return res.sendStatus(403)

//         req.user = user

//         next()
//     })
//   }

app.post('/login', async (req, res) => {

    console.log(req.body);
    const email = req.body.Email;
    const password = req.body.Password;

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(email, password);



    
    //check if any of the users have the same email and password
    //if they do, then return true
    //if they don't, then return false
    const ret=await db.getUsers(email, hashedPassword);
    console.log(ret);


    //loop through users and unhash passwords
    //if any of the passwords match, then return true
    //if none of the passwords match, then return false
    //the return from the query is stored in ret
    for (let i = 0; i < ret.length; i++) {
        const element = ret[i];
        if (element.Email == email && await bcrypt.compare(password, element.Password)) {
            res.send({status: true
            //, token:
            });
            return;
        }
    }
    res.send({status: false});
});

app.post('/dashboard', async (req, res) => {

    //find the hives of a specific user then return the data of a specific hive

    const type = req.body.Type;

    if (type == "getUserHives") {
        const user = req.body.User;
        const ret=await db.getHivesOfSpecificUser(user);
        console.log(ret);
        res.send(ret);
    }
    else if (type == "getUsername") {
        const user = req.body.User;
        const ret=await db.getUserName(user);
        console.log(ret);
        res.send(ret);
    }
    else{
        const hive = req.body.Hive;
        const ret=await db.getHiveDataOfSpecificHive(hive);
        console.log(ret);
        res.send(ret);
    }

    // //loop through the hives and find the hive that matches the name
    // //then return the data of that hive

    // for (let i = 0; i < ret.length; i++) {
    //     const element = ret[i];
    //     console.log(element);
    //     const ret2=await db.getHiveDataOfSpecificHive(hive);
    //     res.send(ret2);
    //     return;
    // }
    // res.send("No hives found");
});

// app.get('/dashboard', async (req, res) => {
//     const retu=await db.getHiveDataWithOwnerAndHiveName();
//     console.log(retu);
//     res.send(retu);
// });

app.put('/dashboard', async (req, res) => {
    const hive = req.body.Hive_Name;
    const location = req.body.Location;
    const anonymous = req.body.Anonymous;
    const email = req.body.Email;

    console.log(hive, location, anonymous, email);
    await db.addHive(hive, email, location, anonymous);

    const ret=await db.getHivesOfSpecificUser(email);
    console.log(ret);
    res.send(ret);   
});

app.patch('/dashboard', async (req, res) => {
    const old_hive_name = req.body.Old_Hive_Name;
    const hive = req.body.Hive_Name;
    const location = req.body.Location;
    const anonymous = req.body.Anonymous;
    const email = req.body.Email;


    console.log(hive, location, anonymous, email);
    await db.updateHive(old_hive_name, hive, location, anonymous, email);

    const ret=await db.getHivesOfSpecificUser(email);
    console.log(ret);
    res.send(ret); 
});

app.delete('/dashboard', async (req, res) => {
    const hive = req.body.Hive_Name;
    const email = req.body.Email;

    console.log(hive, email);
    db.deleteHive(hive, email);
    
    const ret=await db.getHivesOfSpecificUser(email);
    console.log(ret);
    res.send(ret);
});

app.post('/register', async (req, res) => {
    const email = req.body.Email;

    console.log(email);

    const ret=await db.getUsersWithEmail(email);

    console.log(ret);
    res.send(ret);
});

app.put('/register', async (req, res) => {
    const name = req.body.Username;
    const email = req.body.Email;
    const password = req.body.Password;
    const location = req.body.Location;

    console.log(name, email, password, location);

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.addUser(name, email, hashedPassword, location);
    
    const ret=await db.getUsers(email);
    console.log(ret);
    res.send(ret);
});
    

  

// app.get('/home', (req, res) => {
//     // res.sendFile(__dirname + '/public/index.html');
//     const promises = [
//         db.getHives(),
//         db.getHiveData()
//     ]
    
//     Promise.all(promises).then((data) => {
//         res.send(data);
//     });
// });

// app.post('/register', async (req, res) => {
//     const { name, email, password, location } = req.body;
  
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
//       const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
//       db.query(query, [name, email, hashedPassword, location], (err, result) => {
//         if (err) {
//           res.status(500).send('Error');
//           return;
//         }
//         res.send('User registered successfully');
//       });
//     } catch (error) {
//       console.error('Error registering user:', error);
//       res.status(500).send('Error');
//     }
//   });
  

// Define a route for the homepage
app.get('/', (req, res) => {
    res.send('Hello World');
    res.sendFile(__dirname + '/public/index.html');
    req.sendFile(__dirname + '/public/LoginPage.js');
});


 function addTables(){
    let data3 = (db.createUserTable());
    let data =  (db.createHiveTable());
    let data2 = (db.createHiveDataTable());
    
}

function insertHive(){
    db.addHive("Hive1", "Email1", "Location1", 1);
    (db.addHive("Hive2", "Email2", "Location2", 0));
    db.addHive("Hive3", "Email3", "Location3", 1);
}

function insertHiveData(){
    (db.addHiveData("Hive1",70, 55, 12, 150, "File1", '2023-08-01'));
    (db.addHiveData("Hive1",60, 50, 11, 100, "File2", '2023-08-02'));
    (db.addHiveData("Hive2",50, 45, 10, 50, "File3", '2023-08-03'));
}

async function insertUsers(){
    const hashedPassword1 = await bcrypt.hash("Password1", 10); // 10 is the salt rounds
    const hashedPassword2 = await bcrypt.hash("Password2", 10); // 10 is the salt rounds
    const hashedPassword3 = await bcrypt.hash("Password3", 10); // 10 is the salt rounds
    (db.addUser("User1", "Email1", hashedPassword1, "Location1"));
    (db.addUser("User2", "Email2", hashedPassword2, "Location2"));
    (db.addUser("User3", "Email3", hashedPassword3, "Location3"));

}

// async function getHives(){
//     let data = await db.getHives(function(result){
//         console.log(result);
//     });
//     console.log(data);
// }

// async function getHiveData(){
//     let data = await db.getHiveData(function(result){
//         console.log(result);
//     });
//     console.log(data);
// }

// async function getUsers(){
//     let data = await db.getUsers(function(result){
//         console.log(result);
//     });
//     console.log(data);
// }

// async function getHiveDataOfSpecificHive1(){
//     let data = await db.getHiveDataOfSpecificHive("Hive1", function(result){
//         console.log(result);
//     });
//     console.log(data);
// }

// async function getHiveDataOfSpecificHive2(){
//     let data = await db.getHiveDataOfSpecificHive("Hive2", function(result){
//         console.log(result);
//     });
//     console.log(data);
// }

// async function getHivesOfSpecificUser(email){
//     let data = await db.getHivesOfSpecificUser(email, function(result){
//         console.log(result);
//     });
//     console.log(data);
// }



addTables();
//  insertUsers();
//  insertHive();
//  insertHiveData();
// getHives();
// getHiveData();
// getUsers();
// getHivesOfSpecificUser("User1");
// getHiveDataOfSpecificHive1();
// getHiveDataOfSpecificHive2();