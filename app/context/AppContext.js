import React, { useState, useEffect, createContext } from "react";
import { useMediaPredicate } from "react-media-hook";
import PropTypes from "prop-types";
const AppContext = createContext();

const AppProvider = props => {
  const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const [appData, setApp] = useState({
    navOpen: false,
    toggleSidenav: value => setApp(data => ({ ...data, navOpen: value })),
    themeMode: localStorage.getItem("kr_todo_theme") || preferredTheme,
    changeTheme: mode => setApp(data => ({ ...data, themeMode: mode }))
  });

  useEffect(() => {
    localStorage.setItem("kr_todo_theme", appData.themeMode);
  }, [appData.themeMode]);

  return (
    <AppContext.Provider value={appData}>{props.children}</AppContext.Provider>
  );
};
AppProvider.propTypes = { children: PropTypes.object };
export { AppContext, AppProvider };
