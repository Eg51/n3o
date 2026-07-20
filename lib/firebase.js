import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCBHGnXgrcy4a7LoRyCzNAP2gYeYEpvlHI",
  authDomain: "test-project-a6133.firebaseapp.com",
  projectId: "test-project-a6133",
  storageBucket: "test-project-a6133.firebasestorage.app",
  messagingSenderId: "85362115920",
  appId: "1:85362115920:web:5ff996501107749c469855",
  measurementId: "G-JJWC2JQ5ES"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();