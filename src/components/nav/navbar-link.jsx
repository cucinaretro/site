import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "../../scss/components/nav/_navbar-item.scss"

export default function NavbarLink({ href, title, location, sticky }) {
  return (
    <a
      href={href}
      className={classnames("navbar-item", {
        sticky,
      })}
    >
      <span>{title}</span>
    </a>
  )
}

NavbarLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
  location: PropTypes.object,
  sticky: PropTypes.bool.isRequired,
}

NavbarLink.defaultProps = {
  sticky: false,
}
