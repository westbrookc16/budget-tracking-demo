import React, { Suspense } from "react";

import "normalize.css";
import "@progress/kendo-theme-material/dist/all.css";
import "./App.scss";

import { AppProvider } from "./context/AppContext";
import Frame from "./Frame";
import { FirebaseAppProvider } from "reactfire";
import "firebase/performance";
import { config } from "./firebase/config";
const App = () => {
  return (
    <AppProvider>
      <FirebaseAppProvider firebaseConfig={config} initPerformance>
        <Suspense fallback={`Loading...`}>
          <Frame />
        </Suspense>
      </FirebaseAppProvider>
    </AppProvider>
  );
};

export default App;
