process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const logger = require('./logger');
const port = process.env.PORT || 80;

process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(err);
  process.exit(1);
});

const server = express();

server.use(require('body-parser').json());
server.use(require('./middleware/logging'));
server.use(require('./routes'));
server.use(require('./middleware/error-handling'));

server.listen(port, () => {
  logger.info(`Server started on port ${port}`);
})
