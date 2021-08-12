import React from "react"
import PropTypes from "prop-types"

import NavbarItem from "./navbar-item"
import NavbarLink from "./navbar-link"

export default function NavbarEnd({ location, links }) {
  if (links.length > 0) {
    return (
      <div className="navbar-end">
        {links.map((link) => {
          switch (link.remoteTypeName) {
            case "Page":
              return (
                <NavbarItem
                  title={link.pageTitle}
                  to={link.remotePath}
                  location={location}
                  key={`${link.remoteTypeName}-${link.id}`}
                />
              )
            case "NavigationLink":
              return (
                <NavbarLink
                  title={link.title}
                  href={link.uri}
                  sticky={link.sticky}
                  location={location}
                  key={`${link.remoteTypeName}-${link.id}`}
                />
              )
            default:
              return null
          }
        })}
      </div>
    )
  } else {
    return null
  }
}

NavbarEnd.propTypes = {
  location: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  active: PropTypes.bool.isRequired,
}

NavbarEnd.defaultProps = {
  links: [],
  active: false,
}
