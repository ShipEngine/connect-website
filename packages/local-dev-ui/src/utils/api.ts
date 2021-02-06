import env from '@beam-australia/react-env';

let apiHost;

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiHost = process.env.REACT_APP_API_HOST!;
} else {
  apiHost = env('API_HOST');
}

const API = {
  getAppInfo: apiHost,
  getAppStatus: `${apiHost}/app-status`,
  putConnect: `${apiHost}/connect`,
};

export default API;
