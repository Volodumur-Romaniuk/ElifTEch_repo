import React from 'react';
import './Header.css';
import {Link, NavLink} from 'react-router-dom';
function Header() {
  return (
    <div className="header">
        <div className="container">
             <ul>
              <li><NavLink activeClassName="active" to="/" > Shop</NavLink></li>
              <li><NavLink activeClassName="active" to="/basket" >Shopping Cart</NavLink></li>
             </ul>
            </div>
    </div>
  );
}

export default Header;
