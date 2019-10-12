import { useEffect, useState } from "react";

export const useAuthState = auth => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const listener = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const currentUser = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email
        };

        setUser(currentUser);
      } else {
        console.log("signed out.");

        setUser(null);
      }
    });
    return listener;
  }, [auth]);
  return user;
};
