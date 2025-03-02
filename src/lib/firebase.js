import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "meetqchat.firebaseapp.com",
  projectId: "meetqchat",
  storageBucket: "meetqchat.firebasestorage.app",
  messagingSenderId: "583380273601",
  appId: "1:583380273601:web:c06f2203fdf730c08ec740",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
