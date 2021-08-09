import React from "react"

import Content from "./content"
import Cook from "./template/cook"
import Family from "./template/family"
import Lady from "./template/lady"

export default function Switcher({ content }) {
  switch (content.template) {
    case "cook":
      return <Cook content={content} />
    case "family":
      return <Family content={content} />
    case "lady":
      return <Lady content={content} />
    default:
      return <Content content={content} />
  }
}
