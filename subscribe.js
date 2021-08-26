(async () => {
  await require('./src/twilio').sendMessage(process.argv[2], `You're now subscribed for EnforcerNews text messages!`);
  await require('./src/db').subscribe(process.argv[2]);
  process.exit();
})();
