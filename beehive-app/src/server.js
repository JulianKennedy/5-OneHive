const port = 3000;
const sql = require('../sql.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const { WebSocketServer } = require('ws');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const crypto = require('crypto'); // Node.js built-in crypto module for generating random tokens
const { jsPDF } = require('jspdf'); // Import jsPDF library for generating PDFs
require('jspdf-autotable'); // Import jsPDF autotable plugin for creating tables in PDFs


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

            //store in cookies

            res.send({
                status: true
                , token: token
                , profilePic: element.ProfilePic
            });
            return;
        }
    }
    res.send({ status: false });
});

//create refresh token



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
            if (time !== "ALL") {
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
            if (time !== "ALL") {
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
            if (time !== "ALL") {
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
            if (time !== "ALL") {
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
        
        // Registration successful email
        const registrationMailOptions = {
            from: '5-OneHive+ Team <cpen491f1@gmail.com>',
            to: email,
            subject: 'Welcome to 5-OneHive+',
            html: `
                <p>Dear ${firstName} ${lastName},</p>
                <p>Welcome to 5-OneHive+! Your registration was successful.</p>
                <p>We're excited to have you on board. Explore our platform and enjoy!</p>
                <p>Best regards,<br/>5-OneHive+ Team</p>
            `,
        };
    
        // Send the email
        await transporter.sendMail(registrationMailOptions);
    }
    catch (error) {
        console.error('Error sending registration email:', error);
        res.status(500).json({ error: 'An error occurred while sending the registration email.', ok: false });
    }
    

    const ret = await db.getUsers(email);
    console.log(ret);
    res.send(ret);
});


app.post('/map', async (req, res) => {
    const type = req.body.Type;
    if (type == "location") {
        const ret = await db.getLocations();
        console.log("251\n" + ret);
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


// Route for handling forgot password request
app.post('/forgotpassword', async (req, res) => {
    const email = req.body.Email;

    // Check if email exists in your database
    // Assuming you have a function to check the existence of the email
    const userExists = await db.getUsersWithEmail(email);
    // 
    // console.log("User: "+ userExists);


    if (userExists.length > 0) {
        // Generate a temporary password reset token (optional)
        // make the token expire after a certain amount of time
        const resetToken = generateResetToken();

        //remove all other reset tokens for this user
        await db.deleteUserResetTokens(email);

        //delete all expired reset tokens
        await db.deleteExpiredResetTokens();




        //add reset token to user
        await db.addResetToken(email, resetToken);

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
                from: '5-OneHive+ Team <cpen491f1@gmail.com>',
                to: email,
                subject: '5-OneHive+ Password Reset Request',
                // Include the reset token in the email and the link to the reset password page and that the token will expire in 1 hour
                text: `Hello! You have requested a password reset. Please click on the following link to reset your password: http://localhost:3003/resetpassword/${resetToken}. This link will expire in 1 hour.`,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending reset email:', error);
            res.status(500).json({ error: 'An error occurred while sending the reset email.', ok: false });
        }
    } else {
        res.status(404).json({ error: 'User not found.' });
    }
});

// Route for handling reset password request
app.post('/resetpassword/:resetToken', async (req, res) => {
    console.log(req);
    const newPassword = req.body.Password;
    const resetToken = req.params.resetToken;

    console.log(resetToken);
    console.log("New password: " + newPassword);

    //delete all expired reset tokens
    await db.deleteExpiredResetTokens();

    // Check if reset token exists in your database
    // Assuming you have a function to check the existence of the reset token
    const user = await db.getUserByResetToken(resetToken);

    if (user.length === 1) {
        console.log("user found");
        // Reset the user's password
        // Assuming you have a function to update the user's password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.updatePassword(user[0].Email, hashedPassword);

        // Remove the reset token from the database
        // Assuming you have a function to delete the reset token
        await db.deleteUserResetTokens(user[0].Email);

        res.status(200).json({ message: 'Password reset successfully!', ok: true });

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
            const resetMailOptions = {
                from: '5-OneHive+ Team <cpen491f1@gmail.com>',
                to: user[0].Email,
                subject: '5-OneHive+ Password Reset Successful',
                text: `Hello! Your password has been successfully reset. If you did not request this reset, please contact us immediately.`,
            };
            await transporter.sendMail(resetMailOptions);
        }
        catch (error) {
            console.error('Error sending reset email:', error);
            res.status(500).json({ error: 'An error occurred while sending the reset email.', ok: false });
        }
    } else {
        res.status(404).json({ error: 'Invalid or expired reset token.', ok: false });
    }
}
);



// Function to generate reset token
function generateResetToken() {
    const token = crypto.randomBytes(20).toString('hex');
    return token;
}

app.post('/checkout', async (req, res) => {
    const cart = JSON.stringify(req.body.Cart);
    const email = req.body.Email;
    //            body: JSON.stringify({ "FullName": contactInfo.fullName, "Email": contactInfo.email, "Phone": contactInfo.phone, "AddressLine1": shippingAddress.addressLine1, "AddressLine2": shippingAddress.addressLine2, "City": shippingAddress.city, "State": shippingAddress.state, "PostalCode": shippingAddress.postalCode, "Country": shippingAddress.country, "Subtotal": subtotal.toFixed(2), "Tax": tax.toFixed(2), "Shipping": shipping.toFixed(2), "Total": total.toFixed(2) })
    const fullName = req.body.FullName;
    const phone = req.body.Phone;
    const addressLine1 = req.body.AddressLine1;
    const addressLine2 = req.body.AddressLine2;
    const city = req.body.City;
    const state = req.body.State;
    const postalCode = req.body.PostalCode;
    const country = req.body.Country;
    const subtotal = req.body.Subtotal;
    const tax = req.body.Tax;
    const shipping = req.body.Shipping;
    const total = req.body.Total;
    //date and time
    const date = toISOLocal(new Date()).slice(0, 19).replace('T', ' ');

    console.log(fullName, email, phone, addressLine1, addressLine2, city, state, postalCode, country, subtotal, tax, shipping, total, date, cart);
    await db.addOrder(fullName, email, phone, addressLine1, addressLine2, city, state, postalCode, country, subtotal, tax, shipping, total, date, cart);

    orders = await db.getOrders();
    console.log(orders);
    res.send(orders);
});

const emailSentStatus = {};

const downloadInvoice = (order) => {
    console.log("Order: ")
    console.log(order)

    if (!order) return;

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font styles
    doc.setFont('Helvetica', 'bold');

    let headerColor = '';
    order.status = 'Pending';
    switch (order.status) {
        case 'Pending':
            headerColor = 'hotpink'; // Yellow
            break;
        case 'Shipped':
            headerColor = '#28a745'; // Green
            break;
        case 'Delivered':
            headerColor = '#198754'; // Dark Green
            break;
        case 'Cancelled':
            headerColor = '#dc3545'; // Red
            break;
        default:
            headerColor = '#6c757d'; // Gray
    }
    doc.setFillColor(headerColor);
    doc.rect(0, 0, 210, 30, 'F'); // Header background
    doc.setTextColor('#ffffff'); // Header text color
    doc.setFontSize(22);
    doc.text(`Invoice for Order #${order.Order_ID}`, 105, 20, { align: 'center' });

    // Add order details
    doc.setTextColor('#000000'); // Reset text color
    doc.setFontSize(12);

    // Convert the date to a readable format with the time
    const date = new Date(order.Date);
    order.Date = date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    doc.setFont('Helvetica', 'bold');
    doc.text(`Order Date: `, 15, 40);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Date}`, 50, 40);
    doc.setFont('Helvetica', 'bold');
    doc.text(`Total: `, 15, 50);
    doc.setFont('Helvetica', 'normal');
    doc.text(`$${order.Total.toFixed(2)}`, 50, 50);
    doc.setFont('Helvetica', 'bold');
    doc.text(`Status: `, 15, 60);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.status}`, 50, 60);

    // Add customer details (replace with actual customer info)
    doc.setFont('Helvetica', 'bold');
    doc.text(`Customer Name: `, 15, 80);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Full_Name}`, 50, 80); // Replace with actual name
    doc.setFont('Helvetica', 'bold');
    doc.text(`Email: `, 15, 90);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Email}`, 50, 90); // Replace with actual email
    doc.setFont('Helvetica', 'bold');
    doc.text(`Phone: `, 15, 100); // Replace with actual phone number
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Phone}`, 50, 100);

    // Add shipping information
    doc.setFont('Helvetica', 'bold');
    doc.text(`Shipping Address:`, 15, 120);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${order.Address_Line_1}, ${order.Address_Line_2}`, 15, 130); // Replace with actual address
    doc.text(`${order.City}, ${order.State}, ${order.Country}`, 15, 140); // Add city, state, country
    doc.text(`${order.Postal_Code}`, 15, 150); // Add postal code

    // Add table for item details
    // Add table for item details
    // Convert order.Cart back to JSON from string
    const cart = JSON.parse(order.Cart);
    console.log(cart);
    const tableData = cart.map((item) => [
        { content: item.name, styles: { fontStyle: 'bold' } }, // Bold item name
        item.quantity,
        { content: `$${(item.quantity * item.price).toFixed(2)}`, styles: { fontStyle: 'bold' } }, // Bold total price
    ]);

    // Calculate subtotal
    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const taxRate = 0.08; // Example tax rate of 10%
    const taxAmount = subtotal * taxRate;
    const shippingCost = 10; // Example shipping cost
    const totalAmount = subtotal + taxAmount + shippingCost;

    // Add subtotal, tax, shipping, and total to the table data
    tableData.push(['', '', '', '']); // Empty row for spacing
    tableData.push([{ content: 'Subtotal', styles: { fontStyle: 'bold' } }, '', `$${subtotal.toFixed(2)}`, '']);
    tableData.push([{ content: 'Tax (8%)', styles: { fontStyle: 'bold' } }, '', `$${taxAmount.toFixed(2)}`, '']);
    tableData.push([{ content: 'Shipping', styles: { fontStyle: 'bold' } }, '', `$${shippingCost.toFixed(2)}`, '']);
    tableData.push(['', '', '', '']); // Empty row for spacing
    tableData.push(['', '', '', '']); // Empty row for spacing

    tableData.push([{ content: 'Total', styles: { fontStyle: 'bold' } }, '', `$${totalAmount.toFixed(2)}`, '']);

    // Add the table with faded pink alternating rows
    doc.autoTable({
        startY: 170,
        head: [['Item', 'Quantity', 'Total Price', '']],
        body: tableData,
        theme: 'striped', // Use the 'striped' theme for alternating row colors
        styles: {
            fillColor: '#ffe6f3', // Faded pink color for table rows
            font: 'Helvetica',
            fontStyle: 'normal',
            fontSize: 10,
        },
        headStyles: {
            fillColor: 'hotpink', // Faded pink color for table header
            font: 'Helvetica',
            fontStyle: 'bold',
            fontSize: 12,
        },
    });

    // Add footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(190, doc.internal.pageSize.height - 10, `Page ${i} of ${totalPages}`, { align: 'right' });
    }

    // Save the PDF
    doc.save(`uploads/Invoice_Order_${order.Order_ID}.pdf`);
};


app.post('/paymentconfirmation', async (req, res) => {
    const orderNumber = req.body.OrderNumber;
    console.log(orderNumber);
    order = await db.getOrder(orderNumber);
    console.log("585: " + order[0].Order_ID);

    if (emailSentStatus[order[0].Order_ID]) {
        console.log('Email already sent for this order.');
    }
    else {
        downloadInvoice(order[0])

        emailSentStatus[order[0].Order_ID] = true;

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

            // Prepare formatted email content
            const emailContent = `
    <h2>Order Confirmation</h2>
    <p>Hello ${order[0].Full_Name},</p>
    <p>Your order has been successfully placed. Here are the details:</p>
    <ul>
        <li><strong>Order Number:</strong> ${order[0].Order_ID}</li>
        <li><strong>Order Date:</strong> ${order[0].Date}</li>
        <li><strong>Total:</strong> $${order[0].Total}</li>
        <li><strong>Status:</strong> ${order[0].status}</li>
    </ul>
    <h3>Customer Information</h3>
    <ul>
        <li><strong>Name:</strong> ${order[0].Full_Name}</li>
        <li><strong>Email:</strong> ${order[0].Email}</li>
        <li><strong>Phone:</strong> ${order[0].Phone}</li>
    </ul>
    <h3>Shipping Address</h3>
    <p>${order[0].Address_Line_1}</p>
    ${order[0].Address_Line_2 ? `<p>${order[0].Address_Line_2}</p>` : ''}
    <p>${order[0].City}, ${order[0].State}, ${order[0].Postal_Code}</p>
    <p>${order[0].Country}</p>
    <p>Thank you for shopping with us!</p>
`;

            const mailOptions = {
                from: '5-OneHive+ Team <cpen491f1@gmail.com>',
                to: order[0].Email,
                subject: '5-OneHive+ Order Confirmation',

                // Include the order details in the email
                html: emailContent,
                //attach the invoice
                attachments: [
                    {
                        filename: 'invoice.pdf',
                        path: `./uploads/Invoice_Order_${order[0].Order_ID}.pdf`
                    }
                ]

            };
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending reset email:', error);
            res.status(500).json({ error: 'An error occurred while sending the reset email.', ok: false });
        }
    }

    res.send(order);
}
);




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
        db.addHiveData("Julian", Math.floor(Math.random() * (36 - 34 + 1) + 34), Math.floor(Math.random() * (70 - 40 + 1) + 40), Math.floor(Math.random() * (40 - 0 + 1) + 0), Math.floor(Math.random() * (300 - 0 + 1) + 0), "File1", toISOLocal(new Date(new Date().setDate(new Date().getDate() - i - 1))).slice(0, 19).replace('T', ' '));
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

// db.deleteHiveData("Andi", "2024-04-11");