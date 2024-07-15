import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6VfMio9vobHa0wbJmSuwEPieOSfNmVqU",
  authDomain: "chatapp-c431a.firebaseapp.com",
  projectId: "chatapp-c431a",
  storageBucket: "chatapp-c431a.appspot.com",
  messagingSenderId: "688124760638",
  appId: "1:688124760638:web:8e8e06263b8ca965fb376f",
  measurementId: "G-DQ2B6VJ0RE",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
