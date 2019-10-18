import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FirebaseContext } from "../firebase/firebase";
const Signin = () => {
  document.title = "Sign In";
  const firebase = useContext(FirebaseContext);
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",

    signInSuccessUrl: "/budget",

    signInOptions: [firebase.googleProvider]
  };

  return (
    <div>
      <h1>Sign In</h1>
      Please sign in below.
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
    </div>
  );
};
export default Signin;
