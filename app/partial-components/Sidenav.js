import React from 'react';
import './Sidenav.scss';

import Menu from './Menu';

const Sidenav = () => {
  return (
    <div className={`sidenav`}>
      <Menu />
    </div>
  )
}

export default Sidenav;