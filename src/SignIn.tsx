'use client'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect } from "react";
import "firebaseui/dist/firebaseui.css";
import {getFirebaseUI} from "@/firebase";


// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export const SignIn = () => {
  useEffect(() => {
    console.log('SignIn useEffect')
    getFirebaseUI().then((ui) => {
        ui.start("#firebaseui-auth-container", uiConfig);
    })
  });
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center">ログイン</h1>
        <form className="space-y-4">
          <div id={"firebaseui-auth-container"} />
        </form>
      </div>
    </div>
  );
};
