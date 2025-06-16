// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmKxsvOKCTyh1vhZ7mmbGJdowMAwvMuLs",
  authDomain: "dorsin-react.firebaseapp.com",
  projectId: "dorsin-react",
  storageBucket: "dorsin-react.firebasestorage.app",
  messagingSenderId: "19147809676",
  appId: "1:19147809676:web:6769717d52d0f949f22ca9",
  measurementId: "G-HC68M2P283",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
