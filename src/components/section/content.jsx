import React from "react"

import Section from "../ui/section"
import Video from "../ui/video"

import "../../scss/components/section/_content.scss"

export default function Content({
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
        {videos &&
          videos.map(({ id }, i) => <Video id={id} key={`${id}-${i}`} />)}
      </Section>
    </article>
  )
}
