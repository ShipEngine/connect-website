import 'source-map-support/register';
import { loadApp } from './load-app';

export * from './load-app';

// The default export is an "Connect Loader" object, which has a `loadApp()` method
export default { loadApp };
