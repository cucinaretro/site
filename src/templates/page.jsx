import React from "react"
import { graphql } from "gatsby"

import Switcher from "../components/section/switcher"
import Page from "../components/layout/page"

export default function PageTemplate({
  data: {
    site: {
      siteMetadata: {
        organization: { phone },
      },
    },
    navigation,
    page: { title, description, contents },
  },
  location,
}) {
  return (
    <Page
      title={title}
      description={description}
      location={location}
      navigationStart={navigation.start}
      navigationEnd={navigation.end}
      phone={phone}
    >
      {contents.map((content) => (
        <Switcher key={content.id} content={content} />
      ))}
    </Page>
  )
}

export const pageQuery = graphql`
  query PageBySlug(
    $remoteId: ID!
    $language: GraphCMS_Locale!
    $stage: GraphCMS_Stage!
  ) {
    site {
      siteMetadata {
        organization {
          phone
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    navigation: graphCmsNavigation(
      slug: { eq: "top" }
      stage: { eq: $stage }
      locale: { eq: $language }
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
      remoteId: { eq: $remoteId }
      stage: { eq: $stage }
      locale: { eq: $language }
    ) {
      slug
      title
      locale
      description
      contents {
        ... on GraphCMS_Content {
          id
          remoteId
          remoteTypeName
          title
          subtitle
          template
          locale
          content {
            html
          }
          videos: videoEmbeds {
            url
            id
            provider
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
          locale
          notes {
            html
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
          locale
          name
          showNotes
          sections {
            id
            remoteId
            title
            description {
              html
            }
            entries {
              id
              remoteId
              name
              description {
                html
              }
              prices {
                id
                notes
                price
                formattedPrice
                locale
              }
              vegan
              notInFullBoard
            }
            notes
          }
        }
        ... on GraphCMS_Instagram {
          id
          remoteId
          remoteTypeName
          locale
          title
          description
        }
      }
    }
  }
`
