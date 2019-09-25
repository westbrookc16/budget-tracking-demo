import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <ul>
      <li className="link">
        <NavLink tabIndex="2" exact activeClassName="active" to="/">Home</NavLink>
      </li>
      <li className="link">
        <NavLink tabIndex="3" activeClassName="active" to="/todos">To Do's</NavLink>
      </li>
      <li className="link">
        <a tabIndex="4" href="https://github.com/httpJunkie/2019-devreach-react-workshop">
          Source Code <span className="k-icon k-i-hyperlink-open-sm"></span>
        </a>
      </li>
      <li className="menu"><span className="k-icon k-i-menu"></span></li>
    </ul>
  )
}

export default Menu;