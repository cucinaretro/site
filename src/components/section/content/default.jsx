import React from "react"

import Section from "../../ui/section"
import VideoSlider from "../../ui/video-slider"
import ImageSlider from "../../ui/image-slider"

import "../../../scss/components/section/content/_default.scss"

export default function Default({
  content: { title, subtitle, content, videos, images },
}) {
  return (
    <article className="page-content">
      <Section title={title} subtitle={subtitle}>
        {content && (
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
        )}
        <ImageSlider items={images} />
        <VideoSlider items={videos} />
      </Section>
    </article>
  )
}
