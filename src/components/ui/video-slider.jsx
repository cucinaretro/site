import React from "react"
import PropTypes from "prop-types"

import Slider from "../ui/slider"
import Video from "./video"

export default function VideoSlider({ items }) {
  if (items.length > 0) {
    if (items.length > 1) {
      return (
        <Slider items={1}>
          {items.map(({ id, url, provider }, i) => (
            <Video
              id={id}
              url={url}
              provider={provider}
              key={`${provider}-${i}`}
            />
          ))}
        </Slider>
      )
    } else {
      return (
        <Video
          id={items[0].id}
          url={items[0].url}
          provider={items[0].provider}
        />
      )
    }
  } else {
    return null
  }
}

VideoSlider.propTypes = {
  items: PropTypes.array.isRequired,
}

VideoSlider.defaultProps = {
  items: [],
}
