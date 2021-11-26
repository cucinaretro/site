import React from "react"

import Hero from "../ui/hero"
import Section from "../ui/section"
import Entry from "./menu/entry"
import Renderer from "../../mdx/renderer"

import "../../scss/components/section/_menu.scss"

export default function Menu({ content: { name, sections }, neutral }) {
  return (
    <article
      className="menu"
      itemProp="menu"
      itemScope=""
      itemType="https://schema.org/Menu"
    >
      <Hero title={name || neutral.name} />
      {neutral.sections.map((section) => {
        let result = section

        sections.forEach((content) => {
          if (content.remoteId === section.remoteId) {
            result = content

            return true
          }
        })

        return (
          <Section
            title={result.title}
            key={result.id}
            itemProp="hasMenuSection"
            itemScope=""
            itemType="https://schema.org/MenuSection"
          >
            {result.description && <Renderer>{result.description}</Renderer>}
            {result.entries.map((entry) => (
              <Entry key={entry.id} entry={entry} />
            ))}
            {result.notes && <div className="notes">{result.notes}</div>}
          </Section>
        )
      })}
    </article>
  )
}
