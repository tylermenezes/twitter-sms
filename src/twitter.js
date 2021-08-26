const { promisify } = require('util');
const Twitter = require('twitter');
const { DateTime } = require('luxon');
const chunk = require('chunk-text');
const { getLastProcessedId, markTweetProcessed, getSubscribers } = require('./db');
const { sendMessage } = require('./twilio');
const config = require('./config')

const MULTIPART_LENGTH = 8;
const SMS_MAX_LENGTH = 160;

const twitterClient = new Twitter({
  consumer_key: config.twitter.api.key,
  consumer_secret: config.twitter.api.secretKey,
  access_token_key: config.twitter.accessToken.token,
  access_token_secret: config.twitter.accessToken.tokenSecret,
});
twitterClient.get = promisify(twitterClient.get).bind(twitterClient);
twitterClient.post = promisify(twitterClient.post).bind(twitterClient);

function parseTwitterDate(dateStr) {
  return DateTime.fromFormat(dateStr, 'EEE MMM d HH:mm:ss ZZZ yyyy');
}

async function sendTweet(phoneNumber, tweet) {
  try {
    const messages = tweet.length > SMS_MAX_LENGTH
      ? chunk(tweet, SMS_MAX_LENGTH - MULTIPART_LENGTH)
      : [tweet];

    for (let i = 0; i < messages.length; i++) {
      const trailer = messages.length > 1 ? ` [${i+1}/${messages.length}]` : '';
      const message = messages[i] + trailer;
      await sendMessage(phoneNumber, message);
    }
  } catch (err) { console.error(err); }
}

async function fetch() {
  const subscribers = await getSubscribers();
  for (const account of config.twitter.accounts) {
    const lastProcessed = await getLastProcessedId(account);
    const tweets = await twitterClient.get('statuses/user_timeline', {
      screen_name: account,
      since_id: lastProcessed,
      tweet_mode: 'extended',
    });
    for (tweet of tweets) {
      try {
        await markTweetProcessed(
          tweet.id.toString(),
          tweet.user.screen_name,
          parseTwitterDate(tweet.created_at).toJSDate()
        );
      } catch (ex) { continue; }
      await Promise.all(subscribers.map(async (s) => sendTweet(s, tweet.full_text)));
    }
  }
}

module.exports.start = async function start() {
  console.log('Checking for new messages');
  await fetch();
  setTimeout(start, 30000);
}
