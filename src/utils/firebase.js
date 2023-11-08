import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const Firebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDmktguxeaQZsf9ggqDT0T-UdoZkAoV8uo",
    authDomain: "assignmentstudymonk.firebaseapp.com",
    projectId: "assignmentstudymonk",
    storageBucket: "assignmentstudymonk.appspot.com",
    messagingSenderId: "1039980114016",
    appId: "1:1039980114016:web:df01387e20dc21e49e1305",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
};
