import React from "react"

import PageContent from "../../ui/page-content"
import Section from "../../ui/section"
import VideoSlider from "../../ui/video-slider"
import ImageSlider from "../../ui/image-slider"

export default function Default({
  content: { title, subtitle, content, videos, images },
}) {
  return (
    <PageContent>
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
    </PageContent>
  )
}
