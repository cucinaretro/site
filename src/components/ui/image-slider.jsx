import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Slider from "../ui/slider"

export default function ImageSlider({ items }) {
  if (items.length > 0) {
    if (items.length > 1) {
      return (
        <Slider>
          {items.map((item, i) => {
            const image = getImage(item.localFile)

            if (image) {
              return (
                <GatsbyImage
                  image={image}
                  key={i}
                  alt={item.title || "Cucina Retrò"}
                />
              )
            } else {
              return null
            }
          })}
        </Slider>
      )
    } else {
      const image = getImage(items[0].localFile)

      return (
        <GatsbyImage image={image} alt={items[0].title || "Cucina Retrò"} />
      )
    }
  } else {
    return null
  }
}

ImageSlider.propTypes = {
  items: PropTypes.array.isRequired,
}

ImageSlider.defaultProps = {
  items: [],
}
