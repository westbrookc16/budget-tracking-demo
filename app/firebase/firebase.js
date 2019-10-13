import React from "react";
import { config } from "./config.js";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export class Firebase {
  constructor() {
    app.initializeApp(config);
    console.log("app initialized");

    this.emailProvider = app.auth.EmailAuthProvider.PROVIDER_ID;
    this.googleProvider = new app.auth.GoogleAuthProvider();

    this.auth = app.auth();

    this.db = app.firestore();
  }

  signOut() {
    app.auth().signOut();
  }
}

//export default Firebase;
const FirebaseContext = React.createContext(null);
const FirebaseProvider = props => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
export { FirebaseContext, FirebaseProvider };