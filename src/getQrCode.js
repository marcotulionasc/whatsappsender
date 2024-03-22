const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

export function getQrCode() {
  const client = new Client();

  client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
  });
}
