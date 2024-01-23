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

sql.prototype.createHiveTable = function() {
    var sql = "CREATE TABLE IF NOT EXISTS Hive (Hive_ID INT NOT NULL AUTO_INCREMENT, Hive_Name VARCHAR(255), Hive_Owner VARCHAR(200), Hive_Location VARCHAR(200), Hive_Anonymous INT, PRIMARY KEY (Hive_ID))";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  sql.prototype.createHiveDataTable = function() {
    var sql = "CREATE TABLE IF NOT EXISTS HiveData (Hive_Data_Point_ID INT NOT NULL AUTO_INCREMENT, Hive_ID INT NOT NULL, Temperature INT, Humidity INT, Weight INT, Frequency INT, Audio_File_Link VARCHAR(255), PRIMARY KEY (Hive_Data_Point_ID, Hive_ID), FOREIGN KEY (Hive_ID) REFERENCES Hive(Hive_ID) ON DELETE CASCADE)";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  sql.prototype.addHive = function(name, owner, location, status) {
    var sql = "INSERT INTO Hive (Hive_Name, Hive_Owner, Hive_Location, Hive_Anonymous) VALUES ('"+name+"', '"+owner+"', '"+location+"', "+status+")";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  sql.prototype.addHiveData = function(name,temperature, humidity, weight, frequency, audio_file_link) {
    var sql = "INSERT INTO HiveData (Hive_ID, Temperature, Humidity, Weight, Frequency, Audio_File_Link) VALUES ((SELECT Hive_ID FROM Hive WHERE Hive_Name='"+name+"'), "+temperature+", "+humidity+", "+weight+", "+frequency+", '"+audio_file_link+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }


  module.exports=sql;