import React from "react"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"
import merge from "lodash.merge"

import Footer from "../components/ui/footer"
import Main from "../components/ui/main"
import Switcher from "../components/section/switcher"
import TopMenu from "../components/ui/top-menu"
import LocalesMenu from "../components/ui/locales-menu"

export default function Page({
  data: {
    site: {
      siteMetadata: {
        organization: { phone },
      },
    },
    navigation,
    pageLocalized,
    pageNeutral,
  },
  location,
}) {
  const { title, description, contents } = merge(pageNeutral, pageLocalized)

  return (
    <div>
      <Seo
        title={title}
        description={description}
        path={location.pathname}
      />
      {navigation && (
        <TopMenu
          title={navigation.title}
          start={navigation.start}
          end={navigation.end}
          location={location}
          phone={phone}
        />
      )}
      <LocalesMenu />
      <Main>
        {contents.map((content) => (
          <Switcher key={content.id} content={content} />
        ))}
      </Main>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  fragment PageTemplate on GraphCMS_Page {
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
        locale
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
        locale
        title
        description
      }
    }
  }
  query PageBySlug($slug: String!, $language: GraphCMS_Locale!) {
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
      stage: { eq: PUBLISHED }
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
    pageLocalized: graphCmsPage(
      slug: { eq: $slug }
      locale: { eq: $language }
      stage: { eq: PUBLISHED }
    ) {
      ...PageTemplate
    }
    pageNeutral: graphCmsPage(
      slug: { eq: $slug }
      locale: { eq: it }
      stage: { eq: PUBLISHED }
    ) {
      ...PageTemplate
    }
  }
`
