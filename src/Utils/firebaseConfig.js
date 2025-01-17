// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBunOQFrs518L175HdOkH8-XacYud4oZ74",
    authDomain: "ipgeomapper.firebaseapp.com",
    projectId: "ipgeomapper",
    storageBucket: "ipgeomapper.firebasestorage.app",
    messagingSenderId: "1077142115452",
    appId: "1:1077142115452:web:87c9659bdddc03ddfd25f9",
    measurementId: "G-VER2D6QF9V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);