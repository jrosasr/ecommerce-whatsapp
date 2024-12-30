import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCJjpWdAJ_tCpExPU7RnebKdvfumjYLr0I",
  authDomain: "rifa-ya.firebaseapp.com",
  projectId: "rifa-ya",
  storageBucket: "rifa-ya.firebasestorage.app",
  messagingSenderId: "620440514463",
  appId: "1:620440514463:web:a449ff5c11a6864bc757aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

export const db = getFirestore(app);

export { auth, provider, facebookProvider };

export const storage = getStorage(app);