import React from "react"
import { Link } from "gatsby"
import classnames from "classnames"

export default function SectionTitle({ title, subtitle, link, centered }) {
  return (
    <div className="container">
      {title && (
        <h2
          className={classnames("title", {
            "has-text-centered": centered,
          })}
        >
          {link ? <Link to={link}>{title}</Link> : title}
        </h2>
      )}
      {subtitle && (
        <h3
          className={classnames("subtitle", {
            "has-text-centered": centered,
          })}
        >
          {link ? <Link to={link}>{subtitle}</Link> : subtitle}
        </h3>
      )}
    </div>
  )
}
