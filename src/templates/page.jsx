import React from "react"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Navbar from "../components/nav/navbar"
import Footer from "../components/ui/footer"
import Main from "../components/ui/main"
import Switcher from "../components/section/switcher"

export default function Page({
  data: {
    navigation,
    page: { title, description, contents, localeObject },
  },
  location,
}) {
  return (
    <div>
      <Seo title={title} description={description} path={location.pathname} />
      {navigation && (
        <Navbar
          title={navigation.title}
          links={navigation.links}
          location={location}
          locale={localeObject}
        />
      )}
      <Main>
        {contents &&
          contents.map((content) => (
            <Switcher key={content.id} content={content} />
          ))}
      </Main>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!, $locale: GraphCMS_Locale!) {
    navigation: graphCmsNavigation(
      slug: { eq: "top" }
      stage: { eq: PUBLISHED }
      locale: { eq: $locale }
    ) {
      title
      links {
        ... on GraphCMS_Page {
          id
          slug
          pageTitle: title
          remotePath
          remoteTypeName
        }
        ... on GraphCMS_NavigationLink {
          id
          uri
          title
          sticky
          remoteTypeName
        }
      }
    }
    page: graphCmsPage(
      slug: { eq: $slug }
      locale: { eq: $locale }
      stage: { eq: PUBLISHED }
    ) {
      title
      locale
      description
      localeObject {
        language
        culture
        path
      }
      contents {
        ... on GraphCMS_Content {
          id
          remoteTypeName
          title
          subtitle
          template
          content {
            html
          }
          videos: videoEmbeds {
            url
            id
          }
          images {
            title
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 480
                  height: 480
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
        ... on GraphCMS_Place {
          id
          remoteTypeName
          title
          notes {
            markdownNode {
              childMdx {
                body
              }
            }
          }
          coordinates {
            latitude
            longitude
          }
        }
        ... on GraphCMS_Menu {
          id
          remoteTypeName
          name
          sections {
            id
            title
            description {
              markdownNode {
                childMdx {
                  body
                }
              }
            }
            entries {
              id
              name
              prices {
                notes
                price
                id
              }
              vegan
            }
            notes
          }
        }
      }
    }
  }
`
