import React from "react";

import "normalize.css";
import "@progress/kendo-theme-material/dist/all.css";
import "./App.scss";

import { AppProvider } from "./context/AppContext";
import Frame from "./Frame";
import { FirebaseProvider } from "./firebase/firebase";
import { FirebaseUser } from "./firebase/FirebaseUser";
const App = () => {
  return (
    <AppProvider>
      <FirebaseProvider>
        <FirebaseUser>
          <Frame />
        </FirebaseUser>
      </FirebaseProvider>
    </AppProvider>
  );
};

export default App;
