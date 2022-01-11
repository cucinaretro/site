import React from "react"
import classNames from "classnames"
import { StaticImage } from "gatsby-plugin-image"

import VideoSlider from "../../ui/video-slider"
import ImageSlider from "../../ui/image-slider"

import "../../../scss/components/section/content/_child.scss"

export default function Cook({
  content: { title, subtitle, content, videos, images },
}) {
  return (
    <div className={classNames("container", "child")}>
      {title && <h2 className="title">{title}</h2>}
      {subtitle && <h3 className="subtitle">{subtitle}</h3>}
      <div className={classNames("columns", "is-vcentered", "is-multiline")}>
        <div className={classNames("column", "is-two-thirds", "content")}>
          {content && (
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
          )}
        </div>
        <div
          className={classNames("column", "is-one-third", "has-text-centered")}
        >
          <StaticImage
            src="../../../images/section/child.png"
            alt="Cucina Retrò"
          />
        </div>
        <div className={classNames("column", "is-full")}>
          <ImageSlider items={images} />
          <VideoSlider items={videos} />
        </div>
      </div>
    </div>
  )
}
