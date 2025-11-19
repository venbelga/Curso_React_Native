import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNCORWh0xpitNP1dSIq88YIa-xKuflHgY",
  authDomain: "cursoreactnative-53bc5.firebaseapp.com",
  projectId: "cursoreactnative-53bc5",
  storageBucket: "cursoreactnative-53bc5.firebasestorage.app",
  messagingSenderId: "468627020747",
  appId: "1:468627020747:web:a1bf874fe473f20f57f44e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };