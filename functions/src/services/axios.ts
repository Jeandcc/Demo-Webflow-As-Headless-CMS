import axios from 'axios';
import { envConfig } from './envVars';

export const wfApi = axios.create({
  baseURL: 'https://api.webflow.com/',
  headers: {
    Authorization: `Bearer ${envConfig?.wf?.token}`,
    'accept-version': '1.0.0',
  },
});
