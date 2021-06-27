import React from "react"

import Menu from "./menu"
import Content from "./content"
import Place from "./place"

export default function Switcher({ content }) {
  switch (content.remoteTypeName) {
    case "Content":
      return <Content content={content} />
    case "Menu":
      return <Menu content={content} />
    case "Place":
      return <Place content={content} />
    default:
      return null
  }
}
