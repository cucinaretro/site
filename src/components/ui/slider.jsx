import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import MobileDetect from "mobile-detect"
import Carousel from "react-multi-carousel"

import "../../scss/components/ui/_slider.scss"

export default function Slider({ children, items }) {
  if (children) {
    const getDeviceType = () => {
      if (typeof navigator !== "undefined") {
        const md = new MobileDetect(navigator.userAgent)

        if (md.tablet()) {
          return "tablet"
        } else if (md.mobile()) {
          return "mobile"
        } else {
          return "desktop"
        }
      }

      return "desktop"
    }

    const responsive = {
      desktop: {
        breakpoint: { max: 4096, min: 1024 },
        items: Math.max(items, 1),
        slidesToSlide: Math.max(items, 1),
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: Math.max(Math.ceil(items / 2), 1),
        slidesToSlide: Math.max(Math.ceil(items / 2), 1),
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    }

    return (
      <div className="slider">
        <Carousel
          responsive={responsive}
          ssr={true}
          infinite={true}
          containerClass={classNames("first-carousel-container", "container")}
          deviceType={getDeviceType()}
        >
          {children}
        </Carousel>
      </div>
    )
  } else {
    return null
  }
}

Slider.propTypes = {
  children: PropTypes.any,
  items: PropTypes.number,
}

Slider.defaultProps = {
  items: 3,
}
