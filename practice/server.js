const app = require('./src/app');

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`>>> BE APP is listening at ${PORT}...`);
});

process.on('SIGINT', () => {
  server.close(() => console.log('>>> Server stopped!'));
});