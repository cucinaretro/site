import React from "react"
import classnames from "classnames"
import { StaticImage } from "gatsby-plugin-image"

import Video from "../../ui/video"

import "../../../scss/components/section/template/_family.scss"

export default function Cook({
  content: { title, subtitle, content, videos },
}) {
  return (
    <div className="family">
      {title && <h2 className="title">{title}</h2>}
      <div className={classnames("columns", "is-vcentered", "family")}>
        <div className={classnames("column", "is-half", "content")}>
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
        <div className={classnames("column", "is-half", "graphic")}>
          <StaticImage
            src="../../../images/section/family.jpg"
            alt="Cucina Retrò"
          />
        </div>
      </div>
    </div>
  )
}
