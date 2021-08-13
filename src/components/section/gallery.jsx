import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import InfiniteCarousel from "react-leaf-carousel"

import Hero from "../ui/hero"

import "../../scss/components/section/_gallery.scss"

export default function Gallery({ content: { id, title, items } }) {
  if (items && items.length > 0) {
    return (
      <article className="gallery">
        <Hero title={title} />
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          dots={false}
          showSides={true}
          sidesOpacity={0.5}
          sideSize={0.1}
          slidesToScroll={3}
          slidesToShow={3}
          scrollOnDevice={true}
        >
          {items.map((item, i) => {
            const image = getImage(item.localFile)

            if (image) {
              return (
                <GatsbyImage
                  image={image}
                  key={`${id}-${i}`}
                  alt={item.title || "Cucina Retrò"}
                />
              )
            } else {
              return null
            }
          })}
        </InfiniteCarousel>
      </article>
    )
  } else {
    return null
  }
}
