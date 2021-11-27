import React from "react"
import { YouTube, Vimeo } from "@pittica/gatsby-plugin-video"

import "../../scss/components/ui/_video.scss"

function Switcher({ id, provider, url }) {
  switch (provider) {
    case "YouTube":
      return <YouTube id={id} />
    case "Vimeo":
      return <Vimeo id={id} />
    default:
      return <a href={url}>{url}</a>
  }
}

export default function Video({ id, provider, url }) {
  return (
    <div className="has-text-centered">
      <Switcher id={id} provider={provider} url={url} />
    </div>
  )
}
