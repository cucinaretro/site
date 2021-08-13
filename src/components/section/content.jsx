import React from "react"

import Default from "./content/default"
import Cook from "./content/cook"
import Family from "./content/family"
import Lady from "./content/lady"
import Mom from "./content/mom"

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
      return <Default content={content} />
  }
}
