import React from "react"
import classNames from "classnames"
import { StaticImage } from "gatsby-plugin-image"

import VideoSlider from "../../ui/video-slider"
import ImageSlider from "../../ui/image-slider"

import "../../../scss/components/section/content/_lady.scss"

export default function Cook({
  content: { title, subtitle, content, videos, images },
}) {
  return (
    <div className={classNames("columns", "is-vcentered", "lady")}>
      <div className={classNames("column", "is-one-third", "graphic")}>
        <StaticImage
          src="../../../images/section/lady.png"
          alt="Cucina Retrò"
        />
      </div>
      <div className={classNames("column", "is-two-thirds", "content")}>
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
        <ImageSlider items={images} />
        <VideoSlider items={videos} />
      </div>
    </div>
  )
}
