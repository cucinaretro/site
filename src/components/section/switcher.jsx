import React from "react"

import Menu from "./menu"
import Place from "./place"
import Template from "./template"

export default function Switcher({ content }) {
  switch (content.remoteTypeName) {
    case "Content":
      return <Template content={content}></Template>
    case "Menu":
      return <Menu content={content} />
    case "Place":
      // return <Place content={content} />
      return null
    default:
      return null
  }
}
