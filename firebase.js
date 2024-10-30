// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdfoD_B2VbDNeRrQLY_TVBdlkuCmFTLF8",
  authDomain: "markdown-note-39b55.firebaseapp.com",
  projectId: "markdown-note-39b55",
  storageBucket: "markdown-note-39b55.appspot.com",
  messagingSenderId: "438073463300",
  appId: "1:438073463300:web:5e50ac21810688d6155b51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
