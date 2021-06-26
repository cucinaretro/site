import React, { useState } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

import NavbarItem from './navbar-item';

import logo from '../../images/nav/logo.svg';

import '../../scss/components/nav/_navbar.scss';

export default function Navbar({ location, locale }) {
  const [ burger, setBuger ] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setBuger(!burger);

    return false;
  };

  const path = locale ? locale.path : '';

  return (
    <nav className={classnames('navbar', 'is-fixed-top')} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to={`${path}/`} className="navbar-logo">
          <img src={logo} alt="Cucina Retrò" width="380" height="172" />
        </Link>
        <Link
          to={location.pathname}
          onClick={handleClick}
          role="button"
          className={classnames('navbar-burger', 'burger', {
            'is-active': burger
          })}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </Link>
      </div>
      <div
        className={classnames('navbar-menu', {
          'is-active': burger
        })}
      >
        <div className="navbar-end">
          <NavbarItem to={`${path}/menu`} location={location}>
            Menu
          </NavbarItem>
        </div>
      </div>
    </nav>
  );
}
