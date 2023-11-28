const express = require('express');
const app = express();
const port = 3000; // You can choose any available port

// Serve static files (e.g., HTML, CSS, images) from the 'public' directory
app.use(express.static('public'));

app.get('/fecinfo', (req, res) => {
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

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
