import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Navbar } from "@pittica/gatsby-plugin-navigation"

import logo from "../../images/logo.svg"

import "../../scss/components/ui/_top-menu.scss"

function getItems(links) {
  if (links) {
    return links.map((link) => {
      switch (link.remoteTypeName) {
        case "Page":
          return {
            to: link.remotePath,
            label: link.pageTitle,
            sticky: link.sticky,
          }
        case "NavigationLink":
          return {
            link: link.uri,
            label: link.title,
            className: classNames({ sticky: link.sticky }),
            icon: `icon-cucinaretro-${link.icon}`,
          }
        default:
          return null
      }
    })
  } else {
    return []
  }
}

export default function TopMenu({
  location,
  locale,
  title,
  start,
  end,
  phone,
}) {
  const phoneUri = `tel:${phone.replaceAll(" ", "-")}`
  const endItems = getItems(end)

  endItems.push({
    link: phoneUri,
    label: "Chiama",
    className: classNames("is-sticky", "is-hidden-tablet", "is-hidden-mobile"),
    icon: "icon-cucinaretro-phone",
  })

  return (
    <Navbar
      className={classNames("top-menu", "is-fixed-top")}
      location={location}
      startItems={getItems(start)}
      endItems={endItems}
      link={`${locale ? locale.path : ""}/`}
      title={title}
      logoImage={logo}
      logoWidth={380}
      logoHeight={172}
    >
      <a href={phoneUri} className="call-direct">
        <span className="icon">
          <i className="icon-cucinaretro-phone"></i>
        </span>
      </a>
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
