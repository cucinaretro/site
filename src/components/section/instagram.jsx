import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import PageContent from "../ui/page-content"
import Section from "../ui/section"
import Slider from "../ui/slider"

export default function Instagram({ content: { title, description } }) {
  const {
    instagram: { items },
  } = useStaticQuery(graphql`
    query Instagram {
      instagram: allInstagramPost {
        items: nodes {
          id
          caption
          localFile {
            childImageSharp {
              gatsbyImageData(
                height: 640
                width: 640
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          mediaType
          permalink
          formattedDate
        }
      }
    }
  `)

  if (items.length > 0) {
    return (
      <PageContent>
        <Section title={title} description={description}>
          <Slider>
            {items.map((item, i) => {
              const image = getImage(item.localFile)

              if (image) {
                return (
                  <a
                    href={item.permalink}
                    key={`Instagram-${i}-${item.id}`}
                    target="_new"
                  >
                    <GatsbyImage image={image} alt={title} />
                  </a>
                )
              } else {
                return null
              }
            })}
          </Slider>
        </Section>
      </PageContent>
    )
  } else {
    return null
  }
}
