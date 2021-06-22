export interface BasicAuth {
  username: string;
  password: string;
}

export function getBasicAuthFromHeader(headerValue: string): BasicAuth {
  if (!headerValue) {
    return {
      username: '',
      password: '',
    };
  }
  const base64Credentials = headerValue.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  return {
    username,
    password,
  };
}
