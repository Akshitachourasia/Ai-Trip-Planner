// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcYE3AySCjboZSjeuhxIBH7xfjgSnr0r4",
  authDomain: "trip-planner-1092b.firebaseapp.com",
  projectId: "trip-planner-1092b",
  storageBucket: "trip-planner-1092b.appspot.com",
  messagingSenderId: "885074051153",
  appId: "1:885074051153:web:0ed0e84407c24ee25cf870",
  measurementId: "G-NS5LFZBV3N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);