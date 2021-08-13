import React from "react"
import classnames from "classnames"
import { StaticImage } from "gatsby-plugin-image"

import VideoSlider from "../../ui/video-slider"

import "../../../scss/components/section/content/_family.scss"

export default function Cook({
  content: { title, subtitle, content, videos },
}) {
  return (
    <div className="family">
      <div className={classnames("columns", "is-vcentered")}>
        <div className={classnames("column", "is-half", "content")}>
          {title && <h2 className="title">{title}</h2>}
          {subtitle && <h3 className="subtitle">{subtitle}</h3>}
          {content && (
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
          )}
          <VideoSlider items={videos} />
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
