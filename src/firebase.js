// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REDIRECT_API_KEY,
  authDomain: "tphone-db.firebaseapp.com",
  projectId: "tphone-db",
  storageBucket: "tphone-db.appspot.com",
  messagingSenderId: "998748839669",
  appId: "1:998748839669:web:811027babacf98d603afbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // variable to contain database

export default firebaseConfig 
export {database}