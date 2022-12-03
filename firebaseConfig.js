// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxu8s0EZJ0d8ulLAVZtnJ9Vj5ZzSCeABg",
    authDomain: "fir-a88b5.firebaseapp.com",
    databaseURL: "https://fir-a88b5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-a88b5",
    storageBucket: "fir-a88b5.appspot.com",
    messagingSenderId: "1018103090038",
    appId: "1:1018103090038:web:e9b2c12e2e0699a0f14857",
    measurementId: "G-BE066H64Z6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);