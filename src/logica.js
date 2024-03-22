const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs'); // Importe o módulo fs
const path = require('path'); // Importe o módulo path para manipulação de caminhos
const { MessageMedia } = require('whatsapp-web.js'); // Importe o módulo MessageMedia

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

let number = '5519971172264@c.us'; 
let textMessage = 'Teste com imagem';
let imageMessage = 'imagem.png';


client.on('ready', async () => {
    console.log('Client is ready to send the message.');

    // Enviar a mensagem de texto inicial
    client.sendMessage(number, textMessage).then(async (response) => {
        if (response.id.fromMe) {
            console.log('Text message was successfully sent!'); // aqui funciona

            try {
                
                const img = fs.readFileSync('./imagem.png', {encoding: 'base64'});
                const { size } = fs.statSync('./imagem.png');
                
                const msg = new MessageMedia('image/png', img ,'imagem', size);

                // Envia a mensagem com a imagem
                await client.sendMessage(number, msg);

                console.log('Image message was successfully sent!');
            } catch (error) {
                console.error('Error sending image message:', error);
            }
        }
    });
});

