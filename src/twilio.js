const Twilio = require('twilio');
const config = require('./config');

const twilioClient = new Twilio(config.twilio.sid, config.twilio.token);

module.exports.sendMessage = async function sendMessage (to, body) {
  const message = await twilioClient.messages
    .create({ body, from: config.twilio.from, to });
  console.log(to, message.sid)
}
