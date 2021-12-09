import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Navbar } from "@pittica/gatsby-plugin-navigation"
import { useI18next } from "gatsby-plugin-react-i18next"

import logo from "../../images/logo.svg"

import "../../scss/components/ui/_top-menu.scss"

function getItems(links, path) {
  if (links) {
    return links.map((link) => {
      switch (link.remoteTypeName) {
        case "Page":
          return {
            to: `${link.remotePath}`.replaceAll("//", "/"),
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

export default function TopMenu({ location, title, start, end, phone }) {
  const phoneUri = `tel:${phone.replaceAll(" ", "-")}`
  const { t, defaultLanguage, language } = useI18next()
  const endItems = getItems(end)

  endItems.push({
    link: phoneUri,
    label: t("Call"),
    className: classNames("is-sticky", "is-hidden-mobile"),
    icon: "icon-cucinaretro-phone",
  })

  return (
    <Navbar
      className={classNames("top-menu", "is-fixed-top")}
      location={location}
      startItems={getItems(start)}
      endItems={endItems}
      link={defaultLanguage !== language ? `/${language}` : "/"}
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
}

TopMenu.defaultProps = {
  links: [],
}
