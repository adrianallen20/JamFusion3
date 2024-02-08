import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmjUmy-TC-8QmyaxbDC2UgdM-5Jr41uW4",
  authDomain: "jamf4-login1.firebaseapp.com",
  projectId: "jamf4-login1",
  storageBucket: "jamf4-login1.appspot.com",
  messagingSenderId: "947964521089",
  appId: "1:947964521089:web:314f467a6693e82a9d7b80",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); 
}
export default firebase;
export const firebaseRef = firebase;
export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
