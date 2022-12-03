// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdGllB6H3rq-P1VZVtNIhn-eTDXmxVSSI",
  authDomain: "what-to-cook-today-firebase.firebaseapp.com",
  projectId: "what-to-cook-today-firebase",
  storageBucket: "what-to-cook-today-firebase.appspot.com",
  messagingSenderId: "753472251684",
  appId: "1:753472251684:web:38d1e5537ac9bc6625f5b1",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
