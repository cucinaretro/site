import React from "react"

import Menu from "./menu"
import Place from "./place"
import Content from "./content"
import Instagram from "./instagram"

export default function Switcher({ content, neutral }) {
  switch (content.remoteTypeName) {
    case "Content":
      return <Content content={content} />
    case "Menu":
      return <Menu content={content} neutral={neutral} />
    case "Place":
      return <Place content={content} />
    case "Instagram":
      return <Instagram content={content} />
    default:
      return null
  }
}
