import React from "react"
import classnames from "classnames"
import { StaticImage } from "gatsby-plugin-image"

import Video from "../../ui/video"

import "../../../scss/components/section/template/_mom.scss"

export default function Mom({ content: { title, subtitle, content, videos } }) {
  return (
      <div className={classnames("columns", "mom")}>
        <div className={classnames("column", "is-half", "content")}>
          {title && <h2 className="title">{title}</h2>}
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
        </div>
      </div>
  )
}
