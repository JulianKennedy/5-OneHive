var mysql = require('mysql');


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

// create tables

sql.prototype.createUserTable = function() {
  var sql = "CREATE TABLE IF NOT EXISTS User (User_ID INT NOT NULL AUTO_INCREMENT, User_Name VARCHAR(255), Email VARCHAR(200) NOT NULL, Password VARCHAR(200) NOT NULL, Location VARCHAR(255), PRIMARY KEY (User_ID), UNIQUE(Email))";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.createHiveTable = function() {
    var sql = "CREATE TABLE IF NOT EXISTS Hive (Hive_ID INT NOT NULL AUTO_INCREMENT, Hive_Name VARCHAR(255) NOT NULL, User_ID INT NOT NULL, Hive_Location VARCHAR(200), Hive_Anonymous INT, PRIMARY KEY (Hive_ID), FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE)";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

sql.prototype.createHiveDataTable = function() {
    var sql = "CREATE TABLE IF NOT EXISTS HiveData (Hive_Data_Point_ID INT NOT NULL AUTO_INCREMENT, Hive_ID INT NOT NULL, Temperature Double, Humidity INT, Weight Double, Frequency INT, Audio_File_Link VARCHAR(255), Timestamp Date, PRIMARY KEY (Hive_Data_Point_ID, Hive_ID), FOREIGN KEY (Hive_ID) REFERENCES Hive(Hive_ID) ON DELETE CASCADE)";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  }


// insert data into tables


sql.prototype.addUser = function(name, email, password, location) {
  var sql = "INSERT INTO User (User_Name, Email, Password, Location) VALUES ('"+name+"', '"+email+"', '"+password+"', '"+location+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.addHive = function(name, email, location, status) {
  var sql = "INSERT INTO Hive (Hive_Name, User_ID, Hive_Location, Hive_Anonymous) VALUES ('"+name+"', (SELECT User_ID FROM User WHERE Email='"+email+"'), '"+location+"', "+status+")";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.addHiveData = function(name,temperature, humidity, weight, frequency, audio_file_link, time) {
  var sql = "INSERT INTO HiveData (Hive_ID, Temperature, Humidity, Weight, Frequency, Audio_File_Link, Timestamp) VALUES ((SELECT Hive_ID FROM Hive WHERE Hive_Name='"+name+"'), "+temperature+", "+humidity+", "+weight+", "+frequency+", '"+audio_file_link+"', '"+time+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}


// get data from tables

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

  sql.prototype.getHivesOfSpecificUser = function(email){
    var sql = "SELECT * FROM Hive WHERE USER_ID=(SELECT User_ID FROM User WHERE Email='"+email+"')";
    return new Promise(
        (resolve, reject) => {
          con.query(sql, function (err, rows) {
            if (err) reject(err);
            resolve(rows.map(row => row));
          });
        }); 
      }

      sql.prototype.getHiveDataOfSpecificHive = function(hive_name){
        var sql = "SELECT * FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='"+hive_name+"') ORDER BY Timestamp DESC LIMIT 1"; 
        return new Promise(
            (resolve, reject) => {
              con.query(sql, function (err, rows) {
                if (err) reject(err);
                resolve(rows.map(row => row));
              });
            });
    }

    sql.prototype.getUsers = function(){
      var sql = "SELECT * FROM User";
      return new Promise(
          (resolve, reject) => {
            con.query(sql, function (err, rows) {
              if (err) reject(err);
              resolve(rows.map(row => row));
            });
          });
    }

    sql.prototype.updateHive = function(old_hive_name, hive_name, location, anonymous, email){
      var sql = "UPDATE Hive SET Hive_Name='"+hive_name+"', Hive_Location='"+location+"', Hive_Anonymous="+anonymous+" WHERE Hive_Name='"+old_hive_name+"' AND User_ID=(SELECT User_ID FROM User WHERE Email='"+email+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
      });
    }

    sql.prototype.deleteHive = function(hive_name, email){
      var sql = "DELETE FROM Hive WHERE Hive_Name='"+hive_name+"' AND User_ID=(SELECT User_ID FROM User WHERE Email='"+email+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
      });
    }

    sql.prototype.getUsersWithEmail = function(email){
      var sql = "SELECT * FROM User WHERE Email='"+email+"'";
      return new Promise(
          (resolve, reject) => {
            con.query(sql, function (err, rows) {
              if (err) reject(err);
              resolve(rows.map(row => row));
            });
          });
    }

    sql.prototype.addUser = function(name, email, password, location){
      var sql = "INSERT INTO User (User_Name, Email, Password, Location) VALUES ('"+name+"', '"+email+"', '"+password+"', '"+location+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
      });
    }

    sql.prototype.getUserName = function(email){
      var sql = "SELECT User_Name FROM User WHERE Email='"+email+"'";
      return new Promise(
          (resolve, reject) => {
            con.query(sql, function (err, rows) {
              if (err) reject(err);
              resolve(rows.map(row => row));
            });
          });
    }

module.exports = sql;