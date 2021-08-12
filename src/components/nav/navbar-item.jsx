import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classnames from "classnames"

import "../../scss/components/nav/_navbar-item.scss"

export default function NavbarItem({ to, title, location, sticky }) {
  return (
    <Link
      to={to}
      className={classnames("navbar-item", {
        "is-active": location.pathname === to,
        sticky,
      })}
    >
      <span>{title}</span>
    </Link>
  )
}

NavbarItem.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string.isRequired,
  location: PropTypes.object,
  sticky: PropTypes.bool.isRequired,
}

NavbarItem.defaultProps = {
  sticky: false,
}
