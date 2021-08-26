require('dotenv').config();

module.exports = {
  twitter: {
    accounts: process.env.TWITTER_ACCOUNTS.split(','),
    api: {
      key: process.env.TWITTER_API_KEY,
      secretKey: process.env.TWITTER_API_SECRET_KEY,
    },
    accessToken: {
      token: process.env.TWITTER_ACCESS_TOKEN,
      tokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    },
  },
  twilio: {
    sid: process.env.TWILIO_SID,
    token: process.env.TWILIO_TOKEN,
    from: process.env.TWILIO_FROM,
  },
}
