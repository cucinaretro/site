import React from "react"
import classnames from "classnames"
import { StaticImage } from "gatsby-plugin-image"

import Video from "../../ui/video"

import "../../../scss/components/section/template/_lady.scss"

export default function Cook({
  content: { title, subtitle, content, videos },
}) {
  return (
    <div className={classnames("columns", "is-vcentered", "lady")}>
      <div className={classnames("column", "is-one-third", "graphic")}>
        <StaticImage
          src="../../../images/section/lady.png"
          alt="Cucina Retrò"
        />
      </div>
      <div className={classnames("column", "is-two-thirds", "content")}>
        {title && <h2 className="title">{title}</h2>}
        <div className="divider">
          <StaticImage
            src="../../../images/section/lady-divider.png"
            alt="Cucina Retrò"
          />
        </div>
        {subtitle && <h3 className="subtitle">{subtitle}</h3>}
        {content && (
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
        )}
        {videos &&
          videos.map(({ id }, i) => <Video id={id} key={`${id}-${i}`} />)}
      </div>
    </div>
  )
}
