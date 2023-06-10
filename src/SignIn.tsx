import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect } from "react";
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5nLCEkTeMNbef7D_08qn8JI4CBTegFW8",
  authDomain: "niboshi-flight.firebaseapp.com",
  projectId: "niboshi-flight",
  storageBucket: "niboshi-flight.appspot.com",
  messagingSenderId: "964246248569",
  appId: "1:964246248569:web:d8d7a3e0654d86bb2f48a8",
  measurementId: "G-8M3YGY0NFL",
};

firebase.initializeApp(firebaseConfig);

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
    // Initialize the FirebaseUI Widget using Firebase.
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
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
