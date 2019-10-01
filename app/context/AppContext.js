import React, { useState, useEffect, createContext } from "react";
import { useMediaPredicate } from "react-media-hook";

const AppContext = createContext();

const AppProvider = props => {
  const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)") ? "dark" : "light";
  const [appData, setApp] = useState({
    navOpen: false,
    toggleSidenav: value => setApp(data => (
      { ...data, navOpen: value }
    )),
    themeMode: localStorage.getItem('kr_todo_theme') || preferredTheme,
    changeTheme: mode => setApp(data => (
      {...data, themeMode: mode }
    ))
  });

  useEffect(() => {
    localStorage.setItem('kr_todo_theme', appData.themeMode)
    }, [appData.themeMode]
  );
  
  return <AppContext.Provider value={appData}>{props.children}</AppContext.Provider>
}

export { AppContext, AppProvider };