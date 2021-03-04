import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as dotenv from 'dotenv';

dotenv.config();
admin.initializeApp();

export const fireStore = admin.firestore();

interface IEnvConfig {
  wf: {
    token: string;
  };
}

const devEnv: IEnvConfig = {
  wf: { token: process.env.WF_TOKEN || '' },
};

export const envConfig: IEnvConfig =
  process.env.NODE_ENV === 'production'
    ? (functions.config() as IEnvConfig)
    : devEnv;
