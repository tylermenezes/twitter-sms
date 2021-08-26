(async () => {
  await require('./src/db').unsubscribe(process.argv[2]);
  process.exit();
})();
