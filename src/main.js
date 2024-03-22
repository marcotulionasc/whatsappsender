const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs'); // Importe o módulo fs
const { MessageMedia } = require('whatsapp-web.js'); // Importe o módulo MessageMedia

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

const numbers = ['19993679551', '19981221745', '16981218109', '19999191106',
    '19996877656', '19997603010', '19991768883', '19997602293',
    '19997602293', '19999189791', '19989366336'];

function formatNumbers(numbers) {
    const brCode = '55';
    const suffix = '@c.us';
    return numbers.map((number) => {
        return brCode + number + suffix
    })
}

client.on('ready', async () => {
    console.log('Client is ready to send the message.');

    const formattedNumbers = formatNumbers(numbers);
    console.log('Formatted numbers:', formattedNumbers);

    try {

        for (const number of formattedNumbers) {
            const textMessage = 'Vem aí na Multi Arena - Fresno tocando seus melhores sucessos!\n\n' +
                'Dia 10/05 no estacionamento do shopping iguatemi!\n\n' +
                'Link para vendas!\n' +
                'https://bit.ly/fresnoemcps';
            await client.sendMessage(number, textMessage);
            console.log('Text message was successfully sent to', number);
        }

        for (const number of formattedNumbers) {
            const img = fs.readFileSync('./imagem.png', { encoding: 'base64' });
            const { size } = fs.statSync('./imagem.png');
            const msg = new MessageMedia('image/png', img, 'imagem', size);

            await client.sendMessage(number, msg);
            console.log('Image message was successfully sent to', number);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
});

