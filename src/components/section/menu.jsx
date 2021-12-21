import React from "react"
import { MarkdownRenderer } from "@pittica/gatsby-plugin-mdx-shortcodes"

import Hero from "../ui/hero"
import Section from "../ui/section"
import Entry from "./menu/entry"

import "../../scss/components/section/_menu.scss"

export default function Menu({ content: { name, sections } }) {
  return (
    <article
      className="menu"
      itemProp="menu"
      itemScope=""
      itemType="https://schema.org/Menu"
    >
      <Hero title={name} />
      {sections.map((section) => (
        <Section
          title={section.title}
          key={section.id}
          itemProp="hasMenuSection"
          itemScope=""
          itemType="https://schema.org/MenuSection"
        >
          {section.description && (
            <MarkdownRenderer>{section.description}</MarkdownRenderer>
          )}
          {section.entries.map((entry) => (
            <Entry key={entry.id} entry={entry} />
          ))}
          {section.notes && <div className="notes">{section.notes}</div>}
        </Section>
      ))}
    </article>
  )
}
