import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export const config = {
  apiKey: API_KEY,
  authDomain: "time-tracker-9578e.firebaseapp.com",
  databaseURL: "https://time-tracker-9578e.firebaseio.com",
  projectId: "time-tracker-9578e",
  storageBucket: "time-tracker-9578e.appspot.com",
  messagingSenderId: "507541137774",
  appId: "1:507541137774:web:d7da3f8f9561e6a98b797f",
  measurementId: "G-3H30QVNSDH",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database;
export default firebase;
