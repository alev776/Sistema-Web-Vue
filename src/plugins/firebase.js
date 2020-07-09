import firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDC5sbw87NWgm-6u-f-6YpCGG-5u32A5xc",
  authDomain: "node-template-9ae7c.firebaseapp.com",
  databaseURL: "https://node-template-9ae7c.firebaseio.com",
  projectId: "node-template-9ae7c",
  storageBucket: "node-template-9ae7c.appspot.com",
  messagingSenderId: "688949504845",
  appId: "1:688949504845:web:c14d89e1b592ca15002504"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };
