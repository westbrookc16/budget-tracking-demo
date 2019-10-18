import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { UserContext } from "../firebase/FirebaseUser";
import { FirebaseContext } from "../firebase/firebase";
import { Redirect } from "react-router-dom";
//import { useAuthState } from "../firebase/firebase-hooks";
const Menu = () => {
  const context = useContext(AppContext);
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [signOutState, setSignOut] = useState(0);
  return (
    <ul>
      <li className="link">
        <NavLink tabIndex="2" exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      {!user && (
        <li className="link">
          <NavLink tabIndex="3" exact activeClassName="active" to="/signin">
            Sign In
          </NavLink>
        </li>
      )}

      {user && (
        <li className="link">
          <NavLink tabIndex="3" exact activeClassName="active" to="/budget">
            Budget Management
          </NavLink>
        </li>
      )}
      {user && (
        <li className="link">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              firebase.signOut();
              setSignOut(1);
            }}
          >
            Sign Out
          </a>
        </li>
      )}
      <li className="menu">
        <span
          className="k-icon k-i-menu"
          onKeyPress={event => {
            if (event.key === "Enter") {
              context.toggleSidenav(!context.navOpen);
            }
          }}
          onClick={() => {
            context.toggleSidenav(!context.navOpen);
          }}
        ></span>
      </li>
      {signOutState == 1 && <Redirect to="/" />}
    </ul>
  );
};

export default Menu;
