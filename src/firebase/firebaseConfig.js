import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_XtcENQpya9ZABnqKU_uJ7DLv9HAozuw",
  authDomain: "bmart-4a002.firebaseapp.com",
  projectId: "bmart-4a002",
  storageBucket: "bmart-4a002.firebasestorage.app",
  messagingSenderId: "896050665439",
  appId: "1:896050665439:web:a7b6465158eea45df4566a",
  measurementId: "G-9DQ3YJVN2R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 