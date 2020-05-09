import firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBq3bp8ZVdJ3f5Pl_DH7R0Lh4ZbgsaNYiI",
  authDomain: "noble-feat-243412.firebaseapp.com",
  databaseURL: "https://noble-feat-243412.firebaseio.com",
  projectId: "noble-feat-243412",
  storageBucket: "noble-feat-243412.appspot.com",
  messagingSenderId: "300476008839",
  appId: "1:300476008839:web:091d925817e10b768b6b22",
  measurementId: "G-9P56Y2QL7P"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()
export const f = firebase
export const storage = firebase.storage()




