import React from "react"
import classNames from "classnames"

import SectionTitle from "./section-title"

export default function Section({
  children,
  title,
  subtitle,
  link,
  className,
  itemProp,
  itemScope,
  itemType,
}) {
  return (
    <section
      className={classNames("section", className)}
      itemProp={itemProp}
      itemScope={itemScope}
      itemType={itemType}
    >
      <SectionTitle title={title} subtitle={subtitle} link={link} />
      {children && <div className="container">{children}</div>}
    </section>
  )
}
