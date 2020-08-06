// import buildAPI from './build-api';
import express from 'express';
import { loadApp } from '@shipengine/integration-platform-loader';
import cors from 'cors';

const app = express();

app.use(cors());

// try {
//   const sdkApp = await loadApp(pathToApp);
//   buildAPI(sdkApp, app);
// } catch (error) {
//   // TODO - consider how this should work
//   // We want an app to have the ability to boot up even if it is not valid
//   // But I think we only want to boot up if we are in a valid app directory
//   console.log('Error building API from SDK');
//   console.log(error.stack);
// }

export default app;
