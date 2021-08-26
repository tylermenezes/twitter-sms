(async () => {
  await require('./src/db').subscribe(process.argv[2]);
  process.exit();
})();
