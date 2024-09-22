import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NODE_ENV.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.NODE_ENV.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NODE_ENV.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NODE_ENV.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NODE_ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NODE_ENV.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();
