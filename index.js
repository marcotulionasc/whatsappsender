const express = require('express');
const path = require('path');
const helmet = require('helmet');
const { Client } = require('whatsapp-web.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            // outras diretivas aqui
        }
    }
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    app.get('/qr', (req, res) => {
        res.send({qr: qr});
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.post('/sendMessage', (req, res) => {
        const { number, message, image } = req.body;
        // You can now use the number, message, and image for whatever you need
        console.log(`Number: ${number}, Message: ${message}, Image: ${image}`);
    });
});

client.initialize();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});