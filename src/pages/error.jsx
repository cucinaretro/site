import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Hero from "../components/ui/hero"
import Page from "../components/layout/page"

export default function Error({
  location,
  title,
  description,
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
      title={title}
      description={description}
      location={location}
      navigationStart={navigation.start}
      navigationEnd={navigation.end}
      phone={phone}
    >
      <Hero title={title} subtitle={description} />
    </Page>
  )
}

export const pageQuery = graphql`
  query PageError($language: GraphCMS_Locale!) {
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

Error.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.object,
}

Error.defaultProps = {
  title: "500",
  description: "Error",
  data: {},
}
