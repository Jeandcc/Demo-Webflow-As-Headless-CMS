/* eslint-disable import/no-duplicates */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA9SubJRdl7FfjekeGS7l-9KZ4GB0AsLDs',
  authDomain: 'headless-webflow-cms.firebaseapp.com',
  projectId: 'headless-webflow-cms',
  storageBucket: 'headless-webflow-cms.appspot.com',
  messagingSenderId: '984451388728',
  appId: '1:984451388728:web:efc4e7c18966a8e2bd1dcd',
};

firebase.initializeApp(firebaseConfig);

export const FireAuth = firebase.auth();
export const FireDB = firebase.firestore();

// import 'firebase/analytics';
// firebase.analytics();

// export const FireStorage = firebase.storage();
// export const FireFunctions = firebase.functions();
// export const FireRealTime = firebase.database();
