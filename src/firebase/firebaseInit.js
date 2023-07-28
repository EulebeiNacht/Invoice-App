import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVAz_UFEy8ftVNGs-3tB4Uv7n0R5FLc68",
  authDomain: "invoice-app-yt-1c40a.firebaseapp.com",
  projectId: "invoice-app-yt-1c40a",
  storageBucket: "invoice-app-yt-1c40a.appspot.com",
  messagingSenderId: "925611493485",
  appId: "1:925611493485:web:2ecb8eeec665bc1366d764",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
