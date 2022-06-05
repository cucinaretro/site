import React from "react"

import Hero from "../ui/hero"
import Section from "../ui/section"
import Entry from "./menu/entry"
import Notes from "../ui/notes"

import "../../scss/components/section/_menu.scss"

export default function Menu({ content: { name, showNotes, sections } }) {
  let vegan = false
  let notInFullBoard = false

  if (showNotes) {
    sections.forEach((section) => {
      section.entries.forEach((entry) => {
        if (entry.vegan) {
          vegan = true
        }

        if (entry.notInFullBoard) {
          notInFullBoard = true
        }

        return vegan || notInFullBoard
      })

      return vegan || notInFullBoard
    })
  }

  return (
    <article
      className="menu"
      itemProp="menu"
      itemScope=""
      itemType="https://schema.org/Menu"
    >
      <Hero title={name} />
      <Notes vegan={vegan} notInFullBoard={notInFullBoard} />
      {sections.map((section) => (
        <Section
          title={section.title}
          key={section.id}
          itemProp="hasMenuSection"
          itemScope=""
          itemType="https://schema.org/MenuSection"
        >
          {section.description && (
            <div
              dangerouslySetInnerHTML={{ __html: section.description.html }}
            />
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
