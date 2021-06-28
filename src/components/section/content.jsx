import React from "react"

import Section from "../ui/section"

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
          videos.map(({ id }, i) => {
            return (
              <div key={`${id}-${i}`} className="has-text-centered">
                <iframe
                  className="youtube"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )
          })}
      </Section>
    </article>
  )
}
