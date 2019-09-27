import React, { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = props => {
  const [appData, setApp] = useState({
    navOpen: false,
    toggleSidenav: value => setApp(data => (
      { ...data, navOpen: value }
    )),
  });
  
  return <AppContext.Provider value={appData}>{props.children}</AppContext.Provider>
}

export { AppContext, AppProvider };