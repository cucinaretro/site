import React from "react"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Footer from "../components/ui/footer"
import Main from "../components/ui/main"
import Switcher from "../components/section/switcher"
import TopMenu from "../components/ui/top-menu"

export default function Page({
  data: {
    site: {
      siteMetadata: {
        organization: { phone },
      },
    },
    navigation,
    page: { title, description, contents, localeObject },
    pageNeutral,
  },
  location,
}) {
  return (
    <div>
      <Seo
        title={title || pageNeutral.title}
        description={description || pageNeutral.description}
        path={location.pathname}
      />
      {navigation && (
        <TopMenu
          title={navigation.title}
          start={navigation.start}
          end={navigation.end}
          location={location}
          locale={localeObject}
          phone={phone}
        />
      )}
      <Main>
        {pageNeutral.contents.map((element) => {
          let result = element

          contents.forEach((content) => {
            if (content.remoteId === element.remoteId) {
              result = content

              return true
            }
          })

          return <Switcher key={result.id} content={result} neutral={element} />
        })}
      </Main>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  fragment PageTemplate on GraphCMS_Page {
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
        remoteId
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
        remoteId
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
        remoteId
        remoteTypeName
        name
        sections {
          id
          remoteId
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
            remoteId
            name
            prices {
              id
              remoteId
              notes
              price
            }
            vegan
          }
          notes
        }
      }
      ... on GraphCMS_Instagram {
        id
        remoteId
        remoteTypeName
        title
        description
      }
    }
  }
  query PageBySlug($slug: String!, $locale: GraphCMS_Locale!) {
    site {
      siteMetadata {
        organization {
          phone
        }
      }
    }
    navigation: graphCmsNavigation(
      slug: { eq: "top" }
      stage: { eq: PUBLISHED }
      locale: { eq: $locale }
    ) {
      title
      start {
        ... on GraphCMS_Page {
          id
          remoteTypeName
          slug
          pageTitle: title
          remotePath
        }
        ... on GraphCMS_NavigationLink {
          id
          remoteTypeName
          uri
          title
          sticky
          icon
        }
      }
      end {
        ... on GraphCMS_Page {
          id
          remoteTypeName
          slug
          pageTitle: title
          remotePath
        }
        ... on GraphCMS_NavigationLink {
          id
          remoteTypeName
          uri
          title
          sticky
          icon
        }
      }
    }
    page: graphCmsPage(
      slug: { eq: $slug }
      locale: { eq: $locale }
      stage: { eq: PUBLISHED }
    ) {
      ...PageTemplate
    }
    pageNeutral: graphCmsPage(
      slug: { eq: $slug }
      locale: { eq: it_IT }
      stage: { eq: PUBLISHED }
    ) {
      ...PageTemplate
    }
  }
`
