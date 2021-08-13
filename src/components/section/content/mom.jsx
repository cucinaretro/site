import React from "react"
import classnames from "classnames"

import VideoSlider from "../../ui/video-slider"

import "../../../scss/components/section/content/_mom.scss"

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
        <VideoSlider items={videos} />
      </div>
      <div className={classnames("column", "is-half", "graphic")} />
    </div>
  )
}
