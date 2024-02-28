// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-big-estate.firebaseapp.com",
  projectId: "mern-big-estate",
  storageBucket: "mern-big-estate.appspot.com",
  messagingSenderId: "252310846092",
  appId: "1:252310846092:web:384ef3c3ebe529d72619a9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);