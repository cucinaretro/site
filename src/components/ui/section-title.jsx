import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import "../../scss/components/ui/_section-title.scss"

export default function SectionTitle({ title, subtitle, link, centered }) {
  return (
    <div className={classNames("container", "section-title")}>
      {title && (
        <h2
          className={classNames("title", {
            "has-text-centered": centered,
          })}
        >
          {link ? <Link to={link}>{title}</Link> : title}
        </h2>
      )}
      {subtitle && (
        <h3
          className={classNames("subtitle", {
            "has-text-centered": centered,
          })}
        >
          {link ? <Link to={link}>{subtitle}</Link> : subtitle}
        </h3>
      )}
    </div>
  )
}
