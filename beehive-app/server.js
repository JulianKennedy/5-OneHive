const port = 3000; // You can choose any available port
const sql = require('./sql.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json()) 						// to parse application/json
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


var db = new sql();

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
            res.send({status: true});
            return;
        }
    }
    res.send({status: false});
});

app.post('/dashboard', async (req, res) => {

    //find the hives of a specific user then return the data of a specific hive

    const user = req.body.User;
    const hive = req.body.Hive;
    console.log(user, hive);
    const ret=await db.getHiveDataOfSpecificUser(user);

    console.log(ret);

    //loop through the hives and find the hive that matches the name
    //then return the data of that hive

    for (let i = 0; i < ret.length; i++) {
        const element = ret[i];
        console.log(element);
        const ret2=await db.getHiveDataOfSpecificHive(hive);
        res.send(ret2);
        return;
    }
    res.send("No hives found");
});

app.get('/dashboard', async (req, res) => {
    const retu=await db.getHiveDataWithOwnerAndHiveName();
    console.log(retu);
    res.send(retu);
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
    let data2 = (db.createHiveDataTable());
    let data =  (db.createHiveTable());
    let data3 = (db.createUserTable());
}

function insertHive(){
    db.addHive("Hive1", "Email1", "Location1", 1);
    (db.addHive("Hive2", "Email2", "Location2", 0));
    db.addHive("Hive3", "Email3", "Location3", 1);
}

function insertHiveData(){
    (db.addHiveData("Hive1",70, 55, 12, 150, "File1"));
    (db.addHiveData("Hive1",60, 50, 11, 100, "File2"));
    (db.addHiveData("Hive1",50, 45, 10, 50, "File3"));
}

async function insertUsers(){
    const hashedPassword1 = await bcrypt.hash("Password1", 10); // 10 is the salt rounds
    const hashedPassword2 = await bcrypt.hash("Password2", 10); // 10 is the salt rounds
    const hashedPassword3 = await bcrypt.hash("Password3", 10); // 10 is the salt rounds
    (db.addUser("User1", "Email1", hashedPassword1, "Location1"));
    (db.addUser("User2", "Email2", hashedPassword2, "Location2"));
    (db.addUser("User3", "Email3", hashedPassword3, "Location3"));

}

async function getHives(){
    let data = await db.getHives(function(result){
        console.log(result);
    });
    console.log(data);
}

async function getHiveData(){
    let data = await db.getHiveData(function(result){
        console.log(result);
    });
    console.log(data);
}

async function getUsers(){
    let data = await db.getUsers(function(result){
        console.log(result);
    });
    console.log(data);
}

async function getHiveDataOfSpecificHive1(){
    let data = await db.getHiveDataOfSpecificHive("Hive1", function(result){
        console.log(result);
    });
    console.log(data);
}

async function getHiveDataOfSpecificHive2(){
    let data = await db.getHiveDataOfSpecificHive("Hive2", function(result){
        console.log(result);
    });
    console.log(data);
}

async function getHivesOfSpecificUser(email){
    let data = await db.getHivesOfSpecificUser(email, function(result){
        console.log(result);
    });
    console.log(data);
}



addTables();
// insertUsers();
// insertHive();
// insertHiveData();
getHives();
getHiveData();
getUsers();
getHivesOfSpecificUser("User1");
getHiveDataOfSpecificHive1();
getHiveDataOfSpecificHive2();