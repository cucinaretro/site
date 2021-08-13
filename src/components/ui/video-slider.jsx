import React from "react"
import PropTypes from "prop-types"
import InfiniteCarousel from "react-leaf-carousel"

import Video from "./video"

export default function VideoSlider({ items }) {
  if (items.length > 0) {
    if (items.length > 1) {
      return (
        <InfiniteCarousel
          dots={false}
          showSides={true}
          sidesOpacity={0.5}
          sideSize={0.1}
          slidesToScroll={1}
          slidesToShow={1}
          scrollOnDevice={true}
          lazyLoad={false}
        >
          {items.map(({ id }, i) => (
            <Video id={id} key={i} />
          ))}
        </InfiniteCarousel>
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
