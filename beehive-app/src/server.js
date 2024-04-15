const port = 3000;
const sql = require('../sql.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const { WebSocketServer } = require('ws');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();

// token import
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

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
        data = data.toString()
        console.log(data);

        //parse data and add it to hive
        if (data !== "Hello, server!") {
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


app.post('/login', async (req, res) => {

    console.log(req.body);
    const email = req.body.Email;
    const password = req.body.Password;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(email, password);

    const ret = await db.getUsers(email, hashedPassword);
    console.log(ret);

    for (let i = 0; i < ret.length; i++) {
        const element = ret[i];
        if (element.Email == email && await bcrypt.compare(password, element.Password)) {
            // user authenticated! generate a token!
            const token = jwt.sign(
                { userId: element.id }, // payload
                process.env.TOKEN_SECRET, // secret
                { expiresIn: '30m' } // token expiration
            );

            res.send({
                status: true
                , token : token
                , profilePic: element.ProfilePic
            });
            return;
        }
    }
    res.send({ status: false });
});


// // verify token 
function authenticateToken(req, res, next) {
    console.log('verifying token...')
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // no token, deny access

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // token not valid, deny access
        req.user = user;
        next(); // proceed to the next function
    });
}


app.post('/dashboard',
    authenticateToken,
    async (req, res) => {
        const type = req.body.Type;
        console.log(req.body);

        if (type == "getUserHives") {
            const user = req.body.User;
            const ret = await db.getHivesOfSpecificUser(user);
            console.log(ret);
            res.send(ret);
        }
        else if (type == "getUsername") {
            const user = req.body.User;
            const ret = await db.getUserName(user);
            console.log(ret);
            res.send(ret);
        }
        else if (type == "temptrendtime") {
            const hive = req.body.Hive;
            const time = req.body.Timestamp;
            ret = null;
            if(time !== "ALL"){
                ret = await db.getTemperaturesTime(hive, time);
            }
            else {
                ret = await db.getTemperatures(hive);
            }
            console.log(ret);
            res.send(ret);
        }
        else if (type == "humtrendtime") {
            const hive = req.body.Hive;
            const time = req.body.Timestamp;
            ret = null;
            if(time !== "ALL"){
                ret = await db.getHumiditiesTime(hive, time);
            }
            else {
                ret = await db.getHumidities(hive);
            }
            console.log(ret);
            res.send(ret);
        }
        else if (type == "weighttrendtime") {
            const hive = req.body.Hive;
            const time = req.body.Timestamp;
            ret = null;
            if(time !== "ALL"){
            ret = await db.getWeightsTime(hive, time);
            }
            else {
                ret = await db.getWeights(hive);
            }
            console.log(ret);
            res.send(ret);
        }
        else if (type == "freqtrendtime") {
            const hive = req.body.Hive;
            const time = req.body.Timestamp;
            ret = null;
            if(time !== "ALL"){
            ret = await db.getFrequenciesTime(hive, time);
            }
            else {
                ret = await db.getFrequencies(hive);
            }
            console.log(ret);
            res.send(ret);
        }
        else {
            const hive = req.body.Hive;
            const ret = await db.getHiveDataOfSpecificHive(hive);
            console.log(ret);
            res.send(ret);
        }
    });


app.put('/dashboard', async (req, res) => {
    const hive = req.body.Hive_Name;
    const streetAddress = req.body.StreetAddress;
    const city = req.body.City;
    const province = req.body.Province;
    const postalCode = req.body.PostalCode;
    const lastName = req.body.LastName;
    const anonymous = req.body.Anonymous;
    const email = req.body.Email;

    console.log(hive, streetAddress, city, province, postalCode, anonymous, email);
    await db.addHive(hive, email, streetAddress, city, province, postalCode, anonymous);

    const ret = await db.getHivesOfSpecificUser(email);
    console.log(ret);
    res.send(ret);
});


app.patch('/dashboard', async (req, res) => {
    const old_hive_name = req.body.Old_Hive_Name;
    const hive = req.body.Hive_Name;
    const streetAddress = req.body.StreetAddress;
    const city = req.body.City;
    const province = req.body.Province;
    const postalCode = req.body.PostalCode;
    const anonymous = req.body.Anonymous;
    const email = req.body.Email;


    console.log(hive, streetAddress, city, province, postalCode, anonymous, email);
    await db.updateHive(old_hive_name, hive, streetAddress, city, province, postalCode, anonymous, email);

    const ret = await db.getHivesOfSpecificUser(email);
    console.log(ret);
    res.send(ret);
});


app.delete('/dashboard', async (req, res) => {
    const hive = req.body.Hive_Name;
    const email = req.body.Email;

    console.log(hive, email);
    db.deleteHive(hive, email);

    const ret = await db.getHivesOfSpecificUser(email);
    console.log(ret);
    res.send(ret);
});


app.post('/register', async (req, res) => {
    const email = req.body.Email;

    console.log(email);

    const ret = await db.getUsersWithEmail(email);

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

    const ret = await db.getUsers(email);
    console.log(ret);
    res.send(ret);
});


app.post('/map', async (req, res) => {
    const type = req.body.Type;
    if (type == "location") {
        const ret = await db.getLocations();
        console.log("251\n"+ ret);
        res.send(ret);
    }
    else {
        const ret = await db.getHives();
        console.log(ret);
        res.send(ret);
    }
});


app.post('/profile', async (req, res) => {
    const email = req.body.Email;
    const ret = await db.getProfile(email);
    console.log(ret);
    res.send(ret);
});

app.patch('/profile', async (req, res) => {
    const email = req.body.Email;
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const donationAmount = req.body.Donation_Amount;
    const profilePic = req.body.ProfilePic;

    console.log(email, firstName, lastName, donationAmount, profilePic);
    await db.updateProfile(email, firstName, lastName, donationAmount, profilePic);

    const ret = await db.getProfile(email);
    console.log(ret);
    res.send(ret);
});

app.post('/purchase', async (req, res) => {
    const type = req.body.Type;
    console.log(req.body);
    const ret = await db.getProducts();
        console.log(ret);
        res.send(ret);
});

    

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//      user: 'cpen491f1@gmail.com',
//      pass: 'ljtf fyrf yhci zqf',
//     },
//    });
 
//    app.post('/forgotpassword', async (req, res) => {
//     const email = req.body.Email;
//     const mailOptions = {
//      from: 'cpen491f1@gmail.com',
//      to: email,
//      subject: 'Email verification',
//      html:
//    '<p>Please click on the following link to verify your email address:</p>',
//    };
 
//    transporter.sendMail(mailOptions, function (error, info) {
//      if (error) {
//        console.log('Error in sending email  ' + error);
//        return true;
//      } else {
//       console.log('Email sent: ' + info.response);
//       return false;
//      }
//     });
//    });



// Route for handling forgot password request
app.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
  
    // Check if email exists in your database
    // Assuming you have a function to check the existence of the email
    const userExists = true; // Replace with your actual check logic
  
    if (userExists) {
      // Generate a temporary password reset token (optional)
      const resetToken = 'generate-your-reset-token-here';
  
      // Send reset email
      try {
        const transporter = nodemailer.createTransport({
          // Configure your SMTP settings here
          // For example, if you're using Gmail:
          service: 'Gmail',
          auth: {
            user: 'cpen491f1@gmail.com',
            pass: 'xpej jwic jyem qcvn',
          }
        });
  
        const mailOptions = {
          from: 'cpen491f1@gmail.com',
          to: 'julian.m.kennedy@gmail.com',
          subject: 'Password Reset Request',
          text: `Hello! You requested a password reset. Here is your reset token: ${resetToken}`
        };
  
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: 'Reset email sent successfully!' });
      } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ error: 'An error occurred while sending the reset email.' });
      }
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  });


  
  // Function to generate reset token
  function generateResetToken() {
    // Implement your token generation logic here
    return 'dummy_reset_token';
  }


app.get('/', (req, res) => {
    res.send('Hello World');
});


function addTables() {
    let data3 = (db.createUserTable());
    let data = (db.createHiveTable());
    let data2 = (db.createHiveDataTable());
    let data4 = (db.createProductTable());
    let data5 = (db.createOrderTable());

}

function insertHive() {
    db.addHive("Hive1", "Email1", "Location1", 1);
    (db.addHive("Hive2", "Email2", "Location2", 0));
    db.addHive("Hive3", "Email3", "Location3", 1);
}

function insertHiveData() {
    // (db.addHiveData("Hive1",70, 55, 12, 150, "File1", toISOLocal(new Date()).slice(0, 19).replace('T', ' ')));
    // (db.addHiveData("Hive1",60, 50, 11, 100, "File2", '2023-08-02'));
    // (db.addHiveData("Hive2",50, 45, 10, 50, "File3", '2023-08-03'));
    // insert a bunch of data into "Julian" using a random number between 34 and 36, then between 40 and 70, then between 0 and 40, then between 0 and 300, and the date should be everyday over the last year
    for (let i = 0; i < 365; i++) {
        db.addHiveData("Julian", Math.floor(Math.random() * (36 - 34 + 1) + 34), Math.floor(Math.random() * (70 - 40 + 1) + 40), Math.floor(Math.random() * (40 - 0 + 1) + 0), Math.floor(Math.random() * (300 - 0 + 1) + 0), "File1", toISOLocal(new Date(new Date().setDate(new Date().getDate() - i-1))).slice(0, 19).replace('T', ' '));
    }

    //delete HiveData from Andi where the date is 2024-04-11 or later
    db.deleteHiveData("Andi", "2024-04-11");

}

async function insertUsers() {
    const hashedPassword1 = await bcrypt.hash("Password1", 10);
    const hashedPassword2 = await bcrypt.hash("Password2", 10);
    const hashedPassword3 = await bcrypt.hash("Password3", 10);
    (db.addUser("User1", "Email1", hashedPassword1, "Location1"));
    (db.addUser("User2", "Email2", hashedPassword2, "Location2"));
    (db.addUser("User3", "Email3", hashedPassword3, "Location3"));

}

//insertHiveData();
// addTables();
// db.deleteOldData();

db.deleteHiveData("Andi", "2024-04-11");