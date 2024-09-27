// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG_SnNWW94b2kU552JNJ2s4pBk9ZHJMaE",
  authDomain: "moviesgpt-334e8.firebaseapp.com",
  projectId: "moviesgpt-334e8",
  storageBucket: "moviesgpt-334e8.appspot.com",
  messagingSenderId: "72680235462",
  appId: "1:72680235462:web:e6b3d5d744d39bb0b9d2c7",
  measurementId: "G-4PYZ4GCQJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth= getAuth();