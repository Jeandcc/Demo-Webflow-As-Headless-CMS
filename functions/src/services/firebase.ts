import * as admin from 'firebase-admin';

admin.initializeApp();

export const fireStore = admin.firestore();
