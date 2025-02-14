var mysql = require('mysql');


var con = mysql.createConnection({
  host: "34.123.76.156",
  user: "root",
  password: "",
  database: "beehives"
});

function sql() {
  con.connect((error) => {
    if (error) {
      console.log('Error connecting to the MySQL Database');
      throw error;
    }
    console.log('Connection established sucessfully');
  });
}

// create tables

sql.prototype.createUserTable = function () {
  var sql = "CREATE TABLE IF NOT EXISTS User (User_ID INT NOT NULL AUTO_INCREMENT, First_Name VARCHAR(255), Last_Name VARCHAR(255), Email VARCHAR(200) NOT NULL, Password VARCHAR(200) NOT NULL, Location VARCHAR(255), PRIMARY KEY (User_ID), UNIQUE(Email))";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.createHiveTable = function () {
  var sql = "CREATE TABLE IF NOT EXISTS Hive (Hive_ID INT NOT NULL AUTO_INCREMENT, Hive_Name VARCHAR(255) NOT NULL, User_ID INT NOT NULL, Hive_Location VARCHAR(200), Hive_Anonymous INT, PRIMARY KEY (Hive_ID), FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE)";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.createHiveDataTable = function () {
  var sql = "CREATE TABLE IF NOT EXISTS HiveData (Hive_Data_Point_ID INT NOT NULL AUTO_INCREMENT, Hive_ID INT NOT NULL, Temperature Double, Humidity INT, Weight Double, Frequency INT, Audio_File_Link VARCHAR(255), Timestamp Date, PRIMARY KEY (Hive_Data_Point_ID, Hive_ID), FOREIGN KEY (Hive_ID) REFERENCES Hive(Hive_ID) ON DELETE CASCADE)";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.createProductTable = function () {
  var sql = "CREATE TABLE IF NOT EXISTS Product (Product_ID INT NOT NULL AUTO_INCREMENT, Product_Name VARCHAR(255) NOT NULL, Product_Description VARCHAR(255), Product_Price Double, PRIMARY KEY (Product_ID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.createOrderTable = function () {
  var sql = "CREATE TABLE IF NOT EXISTS Orders (Order_ID INT NOT NULL AUTO_INCREMENT, User_ID INT NOT NULL, Product_ID INT NOT NULL, Order_Date Date, PRIMARY KEY (Order_ID), FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE, FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID) ON DELETE CASCADE)";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}


// insert data into tables


sql.prototype.addUser = function (firstName, lastName, email, password) {
  var sql = "INSERT INTO User (First_Name, Last_Name, Email, Password) VALUES ('" + firstName + "', '" + lastName + "', '" + email + "', '" + password + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.addHive = function (name, email, streetAddress, city, province, postalCode, status) {
  var sql = "INSERT INTO Hive (Hive_Name, User_ID, Hive_Anonymous, StreetAddress, City, Province, PostalCode) VALUES ('" + name + "', (SELECT User_ID FROM User WHERE Email='" + email + "'), " + status + ", '" + streetAddress + "', '" + city + "', '" + province + "', '" + postalCode + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.addHiveData = function (name, temperature, humidity, weight, frequency, audio_file_link, time) {
  var sql = "INSERT INTO HiveData (Hive_ID, Temperature, Humidity, Weight, Frequency, Audio_File_Link, Timestamp) VALUES ((SELECT Hive_ID FROM Hive WHERE Hive_Name='" + name + "'), " + temperature + ", " + humidity + ", " + weight + ", " + frequency + ", '" + audio_file_link + "', '" + time + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}


sql.prototype.addProduct = function (name, description, price) {
  var sql = "INSERT INTO Product (Product_Name, Product_Description, Product_Price) VALUES ('" + name + "', '" + description + "', " + price + ")";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.addOrder = function (email, product_name, order_date) {
  var sql = "INSERT INTO Orders (User_ID, Product_ID, Order_Date) VALUES ((SELECT User_ID FROM User WHERE Email='" + email + "'), (SELECT Product_ID FROM Product WHERE Product_Name='" + product_name + "'), '" + order_date + "')"; con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

// get data from tables

sql.prototype.getUsersWithPasswordAndEmail = function (email, password) {
  var sql = "SELECT * FROM User WHERE Email='" + email + "' AND Password='" + password + "'";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getHivesOfSpecificUser = function (email) {
  var sql = "SELECT * FROM Hive WHERE USER_ID=(SELECT User_ID FROM User WHERE Email='" + email + "')";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getHiveDataOfSpecificHive = function (hive_name) {
  var sql = "SELECT * FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hive_name + "') ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getUsers = function () {
  var sql = "SELECT * FROM User";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.updateHive = function (old_hive_name, hive_name, streetAddress, city, province, postalCode, anonymous, email) {
  var sql = "UPDATE Hive SET Hive_Name='" + hive_name + "', Hive_Anonymous=" + anonymous + ", StreetAddress='" + streetAddress + "', City='" + city + "', Province='" + province + "', PostalCode='" + postalCode + "' WHERE Hive_Name='" + old_hive_name + "' AND User_ID=(SELECT User_ID FROM User WHERE Email='" + email + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.deleteHive = function (hive_name, email) {
  var sql = "DELETE FROM Hive WHERE Hive_Name='" + hive_name + "' AND User_ID=(SELECT User_ID FROM User WHERE Email='" + email + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.getUsersWithEmail = function (email) {
  var sql = "SELECT * FROM User WHERE Email='" + email + "'";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.addUser = function (firstName, lastName, email, password) {
  var sql = "INSERT INTO User (FirstName, LastName, Email, Password) VALUES ('" + firstName + "', '" + lastName + "', '" + email + "', '" + password + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

//create reset token table
sql.prototype.createResetTokenTable = function () {
  var sql = "CREATE TABLE IF NOT EXISTS ResetToken (Token_ID INT NOT NULL AUTO_INCREMENT, User_ID INT NOT NULL, Token VARCHAR(255), Expiry_Date DATETIME, PRIMARY KEY (Token_ID), FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE)";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

//insert reset token for a user
sql.prototype.addResetToken = function (email, token) {
  var sql = "INSERT INTO ResetToken (User_ID, Token, Expiry_Date) VALUES ((SELECT User_ID FROM User WHERE Email='" + email + "'), '" + token + "', DATE_ADD(NOW(), INTERVAL 1 HOUR))";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}


//delete all reset tokens that are expired
sql.prototype.deleteExpiredResetTokens = function () {
  var sql = "DELETE FROM ResetToken WHERE Expiry_Date < NOW()";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

//delete all reset tokens for a specific user
sql.prototype.deleteUserResetTokens = function (email) {
  var sql = "DELETE FROM ResetToken WHERE User_ID=(SELECT User_ID FROM User WHERE Email='" + email + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

//update password of user
sql.prototype.updatePassword = function (email, password) {
  var sql = "UPDATE User SET Password='" + password + "' WHERE Email='" + email + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

//add order to the database
//            body: JSON.stringify({ "FullName": contactInfo.fullName, "Email": contactInfo.email, "Phone": contactInfo.phone, "AddressLine1": shippingAddress.addressLine1, "AddressLine2": shippingAddress.addressLine2, "City": shippingAddress.city, "State": shippingAddress.state, "PostalCode": shippingAddress.postalCode, "Country": shippingAddress.country, "Subtotal": subtotal.toFixed(2), "Tax": tax.toFixed(2), "Shipping": shipping.toFixed(2), "Total": total.toFixed(2) })
sql.prototype.addOrder = function (fullName, email, phone, addressLine1, addressLine2, city, state, postalCode, country, subtotal, tax, shipping, total, date, cart) {
  var sql = "INSERT INTO Orders (User_ID, Email, Full_Name, Phone, Address_Line_1, Address_Line_2, City, State, Postal_Code, Country, Subtotal, Tax, Shipping, Total, Date, Cart) VALUES (0, '" + email + "', '" + fullName + "', '" + phone + "', '" + addressLine1 + "', '" + addressLine2 + "', '" + city + "', '" + state + "', '" + postalCode + "', '" + country + "', " + subtotal + ", " + tax + ", " + shipping + ", " + total + ", '" + date + "', '" + cart + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

//get all orders
sql.prototype.getOrders = function () {
  var sql = "SELECT * FROM Orders";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows.map(row => row));
      });
    });
}

// get order from order id
sql.prototype.getOrder = function (order_id) {
  var sql = "SELECT * FROM Orders WHERE Order_ID=" + order_id;
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows.map(row => row));
      });
    });
}

//get user by reset token
sql.prototype.getUserByResetToken = function (token) {
  console.log(token);
  var sql = "SELECT * FROM User WHERE User_ID=(SELECT User_ID FROM ResetToken WHERE Token='" + token + "' AND Expiry_Date > NOW())";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getUserName = function (email) {
  var sql = "SELECT FirstName, LastName FROM User WHERE Email='" + email + "'";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

//get the temperature and timestamp of a specific hive
sql.prototype.getTemperatures = function (hive_name) {
  var sql = "SELECT Temperature, Timestamp FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hive_name + "') ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        console.log(rows);
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getHumidities = function (hive_name) {
  var sql = "SELECT Humidity, Timestamp FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hive_name + "') ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getWeights = function (hive_name) {
  var sql = "SELECT Weight, Timestamp FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hive_name + "') ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getFrequencies = function (hive_name) {
  var sql = "SELECT Frequency, Timestamp FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hive_name + "') ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getLocations = function () {
  var sql = "SELECT Hive_ID, Hive_Name, StreetAddress, City, Province, PostalCode, Hive_Anonymous, FirstName, Email FROM Hive JOIN User ON Hive.User_ID = User.User_ID";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getHives = function () {
  //get all hive information and the most recent temperature, humidity, weight, frequency, and timestamp from each hive there should only be one row per hive

  var sql = "SELECT H.Hive_ID, H.Hive_Name, H.StreetAddress, H.City, H.Province, H.PostalCode, H.Hive_Anonymous, HD.Temperature, HD.Humidity, HD.Weight, HD.Frequency, HD.Timestamp, HD.Hive_Data_Point_ID FROM Hive H LEFT JOIN HiveData HD ON H.Hive_ID = HD.Hive_ID WHERE (HD.Hive_ID, HD.Timestamp) IN (SELECT Hive_ID, MAX(Timestamp) FROM HiveData GROUP BY Hive_ID);";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getProfile = function (email) {
  //find the number of hives owned by a user, the user's first name, last name, email, password, donation amount, and profile picture
  var sql = "SELECT U.FirstName, U.LastName, U.Email, U.Donation_Amount, U.ProfilePic, COUNT(H.Hive_ID) as Hive_Count FROM User U LEFT JOIN Hive H ON U.User_ID = H.User_ID WHERE U.Email='" + email + "'";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.updateProfile = function (email, firstName, lastName, donationAmount, profilePic) {
  console.log("Profilepic: "+profilePic);
  if(profilePic !== ''){
  var sql = "UPDATE User SET FirstName='" + firstName + "', LastName='" + lastName + "', Donation_Amount=" + donationAmount + ", ProfilePic='" + profilePic + "' WHERE Email='" + email + "'";
  }
  else {
    var sql = "UPDATE User SET FirstName='" + firstName + "', LastName='" + lastName + "', Donation_Amount=" + donationAmount + ", ProfilePic=NULL WHERE Email='" + email + "'";
  }
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
}

sql.prototype.getProducts = function () {
  var sql = "SELECT * FROM Product";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getTemperaturesTime = function (hiveName, timeRange) {
  var sql = "SELECT Temperature, Timestamp FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hiveName + "') AND Timestamp >= DATE_SUB(CURDATE(), INTERVAL " + timeRange + ") ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getHumiditiesTime = function (hiveName, timeRange) {
  var sql = "SELECT Humidity, Timestamp FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hiveName + "') AND Timestamp >= DATE_SUB(CURDATE(), INTERVAL " + timeRange + ") ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getWeightsTime = function (hiveName, timeRange) {
  var sql = "SELECT Weight, Timestamp FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hiveName + "') AND Timestamp >= DATE_SUB(CURDATE(), INTERVAL " + timeRange + ") ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}

sql.prototype.getFrequenciesTime = function (hiveName, timeRange) {
  var sql = "SELECT Frequency, Timestamp FROM HiveData WHERE Hive_ID=(SELECT Hive_ID FROM Hive WHERE Hive_Name='" + hiveName + "') AND Timestamp >= DATE_SUB(CURDATE(), INTERVAL " + timeRange + ") ORDER BY Timestamp";
  return new Promise(
    (resolve, reject) => {
      con.query(sql, function (err, rows) {
        if (err) reject(err);
        resolve(rows.map(row => row));
      });
    });
}



//if the temperature is over 1 year old 
// - keep the average value of all temperatures recorded that day
// - delete the rest
sql.prototype.deleteOldData = function () {
  //get the average temp, weight, humidity, frequency, timestamp of each day for each hive if the date is over 1 year old
  var sql = "SELECT Hive_ID, DATE(Timestamp) as Date, AVG(Temperature) as Avg_Temperature, AVG(Weight) as Avg_Weight, AVG(Humidity) as Avg_Humidity, AVG(Frequency) as Avg_Frequency, MAX(Timestamp) as Timestamp FROM HiveData WHERE Timestamp < DATE_SUB(NOW(), INTERVAL 1 YEAR) GROUP BY Hive_ID, DATE(Timestamp)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      //delete all temperature data that is over 1 year old
      var sql = "DELETE FROM HiveData WHERE Timestamp < DATE_SUB(NOW(), INTERVAL 1 YEAR)";
      con.query(sql, function (err, result) {
        if (err) throw err;
      });

      //console.log(result);
      //insert the average data back into the table from the result of the previous query
      if (result.length > 0) {
        var sql = "INSERT INTO HiveData (Hive_ID, Temperature, Humidity, Weight, Frequency, Timestamp) VALUES ?";
        var values = [];
        for (var i = 0; i < result.length; i++) {
          values.push([result[i].Hive_ID, result[i].Avg_Temperature, result[i].Avg_Humidity, result[i].Avg_Weight, result[i].Avg_Frequency, result[i].Timestamp]);
        }
        con.query(sql, [values], function (err, result) {
          if (err) throw err;
        });
      }
    }
  });
}

module.exports = sql;