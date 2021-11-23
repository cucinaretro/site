import React from "react"

import Menu from "./menu"
import Place from "./place"
import Content from "./content"
import Instagram from "./instagram"

export default function Switcher({ content }) {
  switch (content.remoteTypeName) {
    case "Content":
      return <Content content={content} />
    case "Menu":
      return <Menu content={content} />
    case "Place":
      return <Place content={content} />
    case "Instagram":
      return <Instagram content={content} />
    default:
      return null
  }
}
