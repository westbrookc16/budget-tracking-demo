import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";
import { useFirebaseApp } from "reactfire";
const Signin = () => {
  document.title = "Sign In";
  const firebase = useFirebaseApp();
  console.log(`google=${firebase.auth.GoogleAuthProvider.PROVIDER_ID}`);
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",

    signInSuccessUrl: "/budget",

    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  };

  return (
    <div>
      <h1>Sign In</h1>
      Please sign in below.
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
export default Signin;
