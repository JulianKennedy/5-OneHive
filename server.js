const express = require('express');
const app = express();
const port = 3000; // You can choose any available port
const sql = require('./sql.js');
const cors = require('cors');

// Serve static files (e.g., HTML, CSS, images) from the 'public' directory
app.use(express.static('public'));
// app.use(cors());
// app.use(express.json()) 						// to parse application/json
// app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded

var db = new sql();

app.get('/fecinfo', async (req, res) => {
    res.sendFile(__dirname + '/public/fecinfo.html');
});


app.get('/payment', (req, res) => {
    res.sendFile(__dirname + '/public/payment.html');
});


app.get('/stats', (req, res) => {
    res.sendFile(__dirname + '/public/stats.html');
});

app.get('/add-on', (req, res) => {
    res.sendFile(__dirname + '/public/add-on.html');
});


app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});

app.get('/product', (req, res) => {
    res.sendFile(__dirname + '/public/product.html');
});

app.get('/adopt', (req, res) => {
    res.sendFile(__dirname + '/public/adopt.html');
});

app.get('/learn', (req, res) => {
    res.sendFile(__dirname + '/public/learn.html');
});

app.get('/home', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    // const promises = [
    //     db.getHives(),
    //     db.getHiveData()
    // ]
    
    // Promise.all(promises).then((data) => {
    //     res.send(data);
    // });
});

// Define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

 function addTables(){
    let data =  (db.createHiveTable());
    let data2 = (db.createHiveDataTable());
}

function insertHive(){
    db.addHive("Hive1", "Owner1", "Location1", 1);
    (db.addHive("Hive2", "Owner2", "Location2", 0));
    db.addHive("Hive3", "Owner3", "Location3", 1);
}

function insertHiveData(){
    (db.addHiveData("Hive1",70, 55, 12, 150, "File1"));
    (db.addHiveData("Hive1",60, 50, 11, 100, "File2"));
    (db.addHiveData("Hive1",50, 45, 10, 50, "File3"));
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



addTables();
// insertHive();
// insertHiveData();
getHives();
getHiveData();
getHiveDataOfSpecificHive1();
getHiveDataOfSpecificHive2();