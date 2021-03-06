import React from "react"
import { graphql } from "gatsby"

import Hero from "../components/ui/hero"
import Page from "../components/layout/page"

export default function NotFoundPage({
  location,
  data: {
    site: {
      siteMetadata: {
        organization: { phone },
      },
    },
    navigation,
  },
}) {
  return (
    <Page
      title="404"
      description="Not Found"
      location={location}
      navigationStart={navigation.start}
      navigationEnd={navigation.end}
      phone={phone}
    >
      <Hero title="404" subtitle="Not Found" />
    </Page>
  )
}

export const pageQuery = graphql`
  query Page404($language: GraphCMS_Locale!) {
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
  }
`
