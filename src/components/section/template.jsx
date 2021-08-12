import React from "react"

import Content from "./content"
import Cook from "./template/cook"
import Family from "./template/family"
import Lady from "./template/lady"
import Mom from "./template/mom"

export default function Switcher({ content }) {
  switch (content.template) {
    case "cook":
      return <Cook content={content} />
    case "family":
      return <Family content={content} />
    case "lady":
      return <Lady content={content} />
    case "mom":
      return <Mom content={content} />
    default:
      return <Content content={content} />
  }
}
