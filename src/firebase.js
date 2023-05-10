import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfgEgJXgFVCNvEtMrGwq1Cz4brF2CNC7g",
  authDomain: "medicare-react-f4673.firebaseapp.com",
  projectId: "medicare-react-f4673",
  storageBucket: "medicare-react-f4673.appspot.com",
  messagingSenderId: "655234591254",
  appId: "1:655234591254:web:b7538f00826bbe3d6ce337",
  measurementId: "G-89KF8GPSWY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { app, auth, db };
