const port = 3000; // You can choose any available port
const sql = require('./sql.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const { WebSocketServer } = require('ws');
require('dotenv').config();
const https = require('https');
const pem = require('pem')
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json()) 						// to parse application/json
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// potential future solution??
// pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
//     if (err) {
//       throw err
//     }
//     const app = express()
  
//     app.get('/', (req, res) => {
//       res.send('o hai!')
//     })
  
//     const server = https.createServer({ key: keys.clientKey, cert: keys.certificate }, app).listen(443)
//   const sockserver = new WebSocketServer({ server });
// sockserver.on('connection', ws => {
// console.log('New client connected!')
// ws.send('connection established')
// ws.on('close', () => console.log('Client has disconnected!'))
// ws.on('message', data => {
//     data=data.toString()
//     console.log(data);
// })
// ws.onerror = function () {
//     console.log('websocket error')
// }
// });
// });

function toISOLocal(d) {
    const z = n => ('0' + n).slice(-2);
    let off = d.getTimezoneOffset();
    const sign = off < 0 ? '+' : '-';
    off = Math.abs(off);
    return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, -1) + sign + z(off / 60 | 0) + ':' + z(off % 60);
  }
  console.log(toISOLocal(new Date()));

const sockserver = new WebSocketServer({ port: 443 });
sockserver.on('connection', ws => {
console.log('New client connected!')
ws.send('connection established')
ws.on('close', () => console.log('Client has disconnected!'))
ws.on('message', data => {
    data=data.toString()
    console.log(data);

    //parse data and add it to hive
    if( data !== "Hello, server!"){
    const hiveData = JSON.parse(data);
    console.log(hiveData);
    db.addHiveData("Andi", hiveData.Temperature, hiveData.Humidity, hiveData.Weight, hiveData.Frequency, "youtube.com", toISOLocal(new Date()).slice(0, 19).replace('T', ' '));
    }
})
ws.onerror = function () {
    console.log('websocket error')
}
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
    console.log(req.body);

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
    else if(type == "temptrend") {
        const hive = req.body.Hive;
        const ret=await db.getTemperatures(hive);
        console.log(ret);
        res.send(ret);
    }
    else if(type == "humtrend") {
        const hive = req.body.Hive;
        const ret=await db.getHumidities(hive);
        console.log(ret);
        res.send(ret);
    }
    else if(type == "weighttrend") {
        const hive = req.body.Hive;
        const ret=await db.getWeights(hive);
        console.log(ret);
        res.send(ret);
    }
    else if(type == "frequencytrend") {
        const hive = req.body.Hive;
        const ret=await db.getFrequencies(hive);
        console.log(ret);
        res.send(ret);
    }
    else{
        const hive = req.body.Hive;
        const ret=await db.getHiveDataOfSpecificHive(hive);
        console.log(ret);
        res.send(ret);
    }
});

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
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;
    const password = req.body.Password;
   

    console.log(firstName, lastName, email, password);

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.addUser(firstName, lastName, email, hashedPassword);
    
    const ret=await db.getUsers(email);
    console.log(ret);
    res.send(ret);
});

app.post('/map', async (req, res) => {
    const email = req.body.Email;
    const ret=await db.getLocations(email);
    console.log(ret);
    res.send(ret);
});

// Define a route for the homepage
app.get('/', (req, res) => {
    res.send('Hello World');
    // res.sendFile(__dirname + '/public/index.html');
    // req.sendFile(__dirname + '/public/LoginPage.js');
});


 function addTables(){
    let data3 = (db.createUserTable());
    let data =  (db.createHiveTable());
    let data2 = (db.createHiveDataTable());
    let data4 = (db.createProductTable());
    let data5 = (db.createOrderTable());
    
}

function insertHive(){
    db.addHive("Hive1", "Email1", "Location1", 1);
    (db.addHive("Hive2", "Email2", "Location2", 0));
    db.addHive("Hive3", "Email3", "Location3", 1);
}

function insertHiveData(){
    // (db.addHiveData("Hive1",70, 55, 12, 150, "File1", toISOLocal(new Date()).slice(0, 19).replace('T', ' ')));
    // (db.addHiveData("Hive1",60, 50, 11, 100, "File2", '2023-08-02'));
    // (db.addHiveData("Hive2",50, 45, 10, 50, "File3", '2023-08-03'));
}

async function insertUsers(){
    const hashedPassword1 = await bcrypt.hash("Password1", 10); // 10 is the salt rounds
    const hashedPassword2 = await bcrypt.hash("Password2", 10); // 10 is the salt rounds
    const hashedPassword3 = await bcrypt.hash("Password3", 10); // 10 is the salt rounds
    (db.addUser("User1", "Email1", hashedPassword1, "Location1"));
    (db.addUser("User2", "Email2", hashedPassword2, "Location2"));
    (db.addUser("User3", "Email3", hashedPassword3, "Location3"));

}

addTables();
// db.addOrder("Email1", "Product1", '2021-05-01');
// db.addOrder("Email2", "Product2", '2021-05-02');
// db.addProduct("Product1", "Description1", 10.0);
// db.addProduct("Product2", "Description2", 20.0);
// insertHiveData();
db.deleteOldData();