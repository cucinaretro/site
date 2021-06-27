import React from "react"

import Section from "../ui/section"

import "../../scss/components/section/_content.scss"

export default function Content({
  content: {
    title,
    subtitle,
    content: { html },
  },
}) {
  return (
    <article className="page-content">
      <Section title={title} subtitle={subtitle}>
        <div className="text" dangerouslySetInnerHTML={{ __html: html }} />
      </Section>
    </article>
  )
}
