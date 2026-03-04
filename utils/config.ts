import * as dotenv from 'dotenv';
dotenv.config();

import { getEnv } from './env';

export const config = {
  url: getEnv('LOGIN_URL'),
  username: getEnv('LOGIN_USERNAME'),
  password: getEnv('LOGIN_PASSWORD'),
};