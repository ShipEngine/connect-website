// import errorHandler from 'errorhandler';
import log from './utils/logger';
import app from './app';

/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler());

const port = Number(process.argv[2]) || 3000;
const pathToApp = process.argv[3];

/**
 * Start Express server.
 */
app.listen(port, () => log(`server running at http://localhost:${port}`));
