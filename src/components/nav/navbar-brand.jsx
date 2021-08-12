import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classnames from "classnames"

import logo from "../../images/nav/logo.svg"

import "../../scss/components/nav/_navbar-brand.scss"

export default function NavbarBrand({ title, location, locale, onChange }) {
  const [burger, setBuger] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setBuger(!burger)
    onChange(burger)

    return false
  }

  return (
    <div className="navbar-brand">
      <Link
        to={`${locale ? locale.path : ""}/`}
        className="navbar-logo"
        title={title}
      >
        <img src={logo} alt={title} width="380" height="172" />
      </Link>
      <Link
        to={location.pathname}
        onClick={handleClick}
        role="button"
        className={classnames("navbar-burger", "burger", {
          "is-active": burger,
        })}
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </Link>
    </div>
  )
}

NavbarBrand.propTypes = {
  title: PropTypes.string,
  location: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

NavbarBrand.defaultProps = {
  links: [],
}
