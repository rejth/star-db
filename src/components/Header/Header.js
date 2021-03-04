import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => (
  <div className="header d-flex">
    <h3>
      <Link to="/">StarDB</Link>
    </h3>
    <ul className="header-links d-flex">
      <li>
        <Link to="/people">People</Link>
      </li>
      <li>
        <Link to="/planets">Planets</Link>
      </li>
      <li>
        <Link to="/starships">Starships</Link>
      </li>
    </ul>
  </div>
);

export default Header;
