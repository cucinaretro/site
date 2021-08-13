import React from "react"

import Section from "../../ui/section"
import VideoSlider from "../../ui/video-slider"

import "../../../scss/components/section/content/_default.scss"

export default function Default({
  content: { title, subtitle, content, videos },
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
        <VideoSlider items={videos} />
      </Section>
    </article>
  )
}
