import React, { useContext } from "react";
import { useAuthState } from "./firebase-hooks";
import { FirebaseContext } from "./firebase";
const UserContext = React.createContext(null);
const FirebaseUser = props => {
  const firebase = useContext(FirebaseContext);

  const user = useAuthState(firebase.auth);
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
export { FirebaseUser, UserContext };
