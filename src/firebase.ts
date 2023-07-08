"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { UserData } from "./model";

const firebaseConfig = {
  apiKey: "AIzaSyD5nLCEkTeMNbef7D_08qn8JI4CBTegFW8",
  authDomain: "niboshi-flight.firebaseapp.com",
  projectId: "niboshi-flight",
  storageBucket: "niboshi-flight.appspot.com",
  messagingSenderId: "964246248569",
  appId: "1:964246248569:web:d8d7a3e0654d86bb2f48a8",
  measurementId: "G-8M3YGY0NFL",
};

initializeApp(firebaseConfig);
export const getFirebaseUI = async () => {
  const firebaseui = await import("firebaseui");
  return (
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(getAuth())
  );
};

export const JALDB = Object.freeze({
  userData: {
    async get(uid: string): Promise<UserData | null> {
      const docRef = doc(getFirestore(), "jal", uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data() as UserData | undefined;
      return data ?? null;
    },
  },
});
