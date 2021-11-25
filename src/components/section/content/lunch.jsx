import React from "react"
import classNames from "classnames"
import { StaticImage } from "gatsby-plugin-image"

import VideoSlider from "../../ui/video-slider"
import ImageSlider from "../../ui/image-slider"

import "../../../scss/components/section/content/_lunch.scss"

export default function Cook({
  content: { title, subtitle, content, videos, images },
}) {
  return (
    <div className="lunch">
      <div className="container">
        {title && <h2 className="title">{title}</h2>}
        {subtitle && <h3 className="subtitle">{subtitle}</h3>}
      </div>
      <div className={classNames("columns", "is-vcentered")}>
        <div className={classNames("column", "is-half", "graphic")}>
          <StaticImage
            src="../../../images/section/lunch.png"
            alt="Cucina Retrò"
          />
        </div>
        <div className={classNames("column", "is-half", "content")}>
          {content && (
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
          )}
          <ImageSlider items={images} />
          <VideoSlider items={videos} />
        </div>
      </div>
    </div>
  )
}
