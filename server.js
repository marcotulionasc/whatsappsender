const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/qrcode', (req, res) => {
    res.sendFile(path.join(__dirname, 'qrcode.png'));
});

app.post('/sendMessage', (req, res) => {
    const { number, message, image } = req.body;
    // You can now use the number, message, and image for whatever you need
    console.log(`Number: ${number}, Message: ${message}, Image: ${image}`);
    res.status(200).send('Message received!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
