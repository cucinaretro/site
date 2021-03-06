import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

export default function Hero({
  title,
  subtitle,
  centered,
  children,
  className,
}) {
  return (
    <section className={classNames("hero", className)}>
      <div className="hero-body">
        <div className="container">
          {title && (
            <h1
              className={classNames("title", "is-size-1", {
                "has-text-centered": centered,
              })}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <h2
              className={classNames("subtitle", "is-size-3", {
                "has-text-centered": centered,
              })}
            >
              {subtitle}
            </h2>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  centered: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
}

Hero.defaultProps = {
  centered: false,
}
