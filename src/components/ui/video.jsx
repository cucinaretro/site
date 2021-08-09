import React from "react"

import "../../scss/components/ui/_video.scss"

export default function Video({ id }) {
  return (
    <div className="has-text-centered">
      <iframe
        className="video"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
