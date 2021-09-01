import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Navbar } from "@pittica/gatsby-plugin-navigation"

import logo from "../../images/nav/logo.svg"

import "../../scss/components/ui/_top-menu.scss"

export default function TopMenu({ location, locale, title, links }) {
  const items = []

  links.forEach((link) => {
    switch (link.remoteTypeName) {
      case "Page":
        items.push({
          to: link.remotePath,
          label: link.pageTitle,
          sticky: link.sticky,
        })
        break
      case "NavigationLink":
        items.push({
          href: link.uri,
          label: link.title,
          className: classNames({ sticky: link.sticky }),
        })
        break
      default:
        break
    }
  })

  return (
    <Navbar
      className={classNames("top-menu", "is-fixed-top")}
      location={location}
      endItems={items}
      link={`${locale ? locale.path : ""}/`}
    >
      <img src={logo} alt={title} width="380" height="172" />
    </Navbar>
  )
}

TopMenu.propTypes = {
  title: PropTypes.string,
  location: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  locale: PropTypes.object,
}

TopMenu.defaultProps = {
  links: [],
}
