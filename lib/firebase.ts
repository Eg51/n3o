// import { initializeApp, getApps } from "firebase/app";
// import { db } from "./firebase";
// import {getAuth} from "./firebase/auth";
// import {getFirestore, getStorage, collection, addDoc, serverTimestamp} from "firebase/firestore";



// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
//   };
// const app = getApps().length === 0? initializeApp(firebaseConfig) : getApps()[0];

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);


// createChat = async (userId, adminId) => {
//   await addDoc(collection(db, "chats"), {
//       participants: [userId, adminId],
//       messages: [],
//       createdAt: serverTimestamp()
//   });
// }


import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // Only needed if you're using Firebase Analytics — delete this line otherwise
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
 
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
 
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
 
/**
 * Creates (or resumes) a single, deterministic chat thread between a user
 * and the admin. Using a fixed chatId + setDoc(merge:true) means calling
 * this multiple times for the same pair never creates duplicate threads.
 *
 * NOTE: this only sets up the initial document — it does NOT enforce that
 * users can only chat with the admin. That restriction must live in your
 * Firestore security rules, since anyone can write to Firestore directly
 * from the browser console, bypassing this function entirely.
 */
export const createChat = async (userId: string, adminId: string) => {
  const chatId = `chat_${adminId}_${userId}`;
  await setDoc(
    doc(db, "chats", chatId),
    {
      members: [userId, adminId],
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
  return chatId;
};



// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /chats/{chatId} {
//       allow read, write: if request.auth != null
//         && request.auth.uid in resource.data.members
//         && "ADMIN_UID_HERE" in resource.data.members;

//       match /messages/{messageId} {
//         allow read, write: if request.auth != null
//           && request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.members;
//       }
//     }
//   }
// }