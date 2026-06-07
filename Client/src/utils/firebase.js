import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vocaliq-56c24.firebaseapp.com",
  projectId: "vocaliq-56c24",
  storageBucket: "vocaliq-56c24.firebasestorage.app",
  messagingSenderId: "485444484883",
  appId: "1:485444484883:web:29723ac0d53db40981a4e6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}
