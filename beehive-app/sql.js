var mysql = require('mysql');
const fs = require("fs");
const { get } = require('express/lib/response');


var con = mysql.createConnection({
  host: "34.123.76.156",
  user: "root",
  password: "",
  database: "beehives"
});

function sql(){
    con.connect((error) => {
        if(error){
            console.log('Error connecting to the MySQL Database');
            throw error;
        }
        console.log('Connection established sucessfully');
    });
}

sql.prototype.getHives = function(){
    var sql = "SELECT * FROM Hive";
        return new Promise(
            (resolve, reject) => {
              con.query(sql, function (err, rows) {
                if (err) reject(err);
                resolve(rows.map(row => row));
              });
            });
}

sql.prototype.getHivesOfSpecificUser = function(email){
  var sql = "SELECT * FROM Hive WHERE Owner_ID=(SELECT User_ID FROM User WHERE Email='"+email+"')";
      return new Promise(
          (resolve, reject) => {
            con.query(sql, function (err, rows) {
              if (err) reject(err);
              resolve(rows.map(row => row));
            });
          });
}

sql.prototype.getHiveDataOfSpecificHive = function(hive_name){
    var sql = "SELECT * FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='"+hive_name+"')";
    return new Promise(
        (resolve, reject) => {
          con.query(sql, function (err, rows) {
            if (err) reject(err);
            resolve(rows.map(row => row));
          });
        });
}

//create an sql statement that takes the hivedata and joins the email of the owner and the hive name
sql.prototype.getHiveDataWithOwnerAndHiveName = function(){
    var sql = "SELECT HiveData.Hive_ID, HiveData.Owner_ID, HiveData.Temperature, HiveData.Humidity, HiveData.Weight, HiveData.Frequency, HiveData.Audio_File_Link, Hive.Hive_Name, User.Email FROM HiveData INNER JOIN Hive ON HiveData.Hive_ID=Hive.Hive_ID INNER JOIN User ON HiveData.Owner_ID=User.User_ID";
    return new Promise(
        (resolve, reject) => {
          con.query(sql, function (err, rows) {
            if (err) reject(err);
            resolve(rows.map(row => row));
          });
        });
}

sql.prototype.getHiveData = function(){
    var sql="SELECT * FROM HiveData";
    return new Promise(
        (resolve, reject) => {
          con.query(sql, function (err, rows) {
            if (err) reject(err);
            resolve(rows.map(row => row));
          });
        });
    }

sql.prototype.getHiveDataOfSpecificUser = function(email){
    var sql = "SELECT * FROM HiveData WHERE Owner_ID=(SELECT User_ID FROM User WHERE Email='"+email+"')";
    return new Promise(
        (resolve, reject) => {
          con.query(sql, function (err, rows) {
            if (err) reject(err);
            resolve(rows.map(row => row));
          });
        }); 
      }

    sql.prototype.getUsers = function(){
        var sql="SELECT * FROM User";
        return new Promise(
            (resolve, reject) => {
              con.query(sql, function (err, rows) {
                if (err) reject(err);
                resolve(rows.map(row => row));
              });
            });
        }

sql.prototype.getUsersWithPasswordAndEmail = function(email, password){
    var sql="SELECT * FROM User WHERE Email='"+email+"' AND Password='"+password+"'";
    return new Promise(
        (resolve, reject) => {
          con.query(sql, function (err, rows) {
            if (err) reject(err);
            resolve(rows.map(row => row));
          });
        });
    }
    

sql.prototype.createHiveTable = function() {
    var sql = "CREATE TABLE IF NOT EXISTS Hive (Hive_ID INT NOT NULL AUTO_INCREMENT, Hive_Name VARCHAR(255), Owner_ID INT NOT NULL, Hive_Owner VARCHAR(200), Hive_Location VARCHAR(200), Hive_Anonymous INT, PRIMARY KEY (Hive_ID), FOREIGN KEY (Owner_ID) REFERENCES User(User_ID) ON DELETE CASCADE)";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  sql.prototype.createHiveDataTable = function() {
    var sql = "CREATE TABLE IF NOT EXISTS HiveData (Hive_Data_Point_ID INT NOT NULL AUTO_INCREMENT, Hive_ID INT NOT NULL, Owner_ID INT NOT NULL, Temperature INT, Humidity INT, Weight INT, Frequency INT, Audio_File_Link VARCHAR(255), PRIMARY KEY (Hive_Data_Point_ID, Hive_ID), FOREIGN KEY (Hive_ID) REFERENCES Hive(Hive_ID) ON DELETE CASCADE, FOREIGN KEY (Owner_ID) REFERENCES User(User_ID) ON DELETE CASCADE)";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  sql.prototype.createUserTable = function() {
    var sql = "CREATE TABLE IF NOT EXISTS User (User_ID INT NOT NULL AUTO_INCREMENT, Name VARCHAR(255), Email VARCHAR(200), Password VARCHAR(200), Location VARCHAR(255), PRIMARY KEY (User_ID))";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  sql.prototype.addHive = function(name, email, location, status) {
    var sql = "INSERT INTO Hive (Hive_Name, Owner_ID, Hive_Owner, Hive_Location, Hive_Anonymous) VALUES ('"+name+"', (SELECT User_ID FROM User WHERE Email='"+email+"'), (SELECT Name FROM User WHERE Email='"+email+"'), '"+location+"', "+status+")";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  sql.prototype.addHiveData = function(name,temperature, humidity, weight, frequency, audio_file_link) {
    var sql = "INSERT INTO HiveData (Hive_ID, Owner_ID, Temperature, Humidity, Weight, Frequency, Audio_File_Link) VALUES ((SELECT Hive_ID FROM Hive WHERE Hive_Name='"+name+"'), (SELECT User_ID FROM User WHERE Name = (SELECT Hive_Owner From Hive WHERE Hive_Name = '"+name+"')), "+temperature+", "+humidity+", "+weight+", "+frequency+", '"+audio_file_link+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  sql.prototype.addUser = function(name, email, password, location) {
    var sql = "INSERT INTO User (Name, Email, Password, Location) VALUES ('"+name+"', '"+email+"', '"+password+"', '"+location+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  module.exports=sql;