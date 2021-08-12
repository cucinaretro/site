import React, { useState } from "react"
import classnames from "classnames"

import NavbarBrand from "./navbar-brand"
import NavbarEnd from "./navbar-end"

import "../../scss/components/nav/_navbar.scss"

export default function Navbar({ location, locale, title, links }) {
  const [burger, setBuger] = useState(false)

  return (
    <nav
      className={classnames("navbar", "is-fixed-top")}
      role="navigation"
      aria-label="main navigation"
    >
      <NavbarBrand
        title={title}
        location={location}
        locale={locale}
        onChange={(active) => setBuger(!active)}
      />
      <div
        className={classnames("navbar-menu", {
          "is-active": burger,
        })}
      >
        <NavbarEnd links={links} location={location} active={burger} />
      </div>
    </nav>
  )
}
