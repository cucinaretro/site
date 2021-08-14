import React from "react"
import PropTypes from "prop-types"

import Slider from "../ui/slider"
import Video from "./video"

export default function VideoSlider({ items }) {
  if (items.length > 0) {
    if (items.length > 1) {
      return (
        <Slider items={1}>
          {items.map(({ id }, i) => (
            <Video id={id} key={i} />
          ))}
        </Slider>
      )
    } else {
      return <Video id={items[0].id} />
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
