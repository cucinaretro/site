import React from "react"
import { graphql } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"
import { formatLocale } from "@pittica/gatsby-plugin-utils"

import Footer from "../components/ui/footer"
import Hero from "../components/ui/hero"
import Main from "../components/ui/main"
import TopMenu from "../components/ui/top-menu"

export default function NotFoundPage({
  children,
  location,
  locale,
  data: {
    site: {
      siteMetadata: {
        organization: { phone },
      },
    },
    navigation,
  },
}) {
  const localeObject = formatLocale(locale)

  localeObject.path =
    localeObject.language === process.env.LOCALE
      ? ""
      : `/${localeObject.language}`

  return (
    <div>
      <Seo title="404" description="Not Found" path={location.pathname} />
      <TopMenu
        title="404"
        start={navigation.start}
        end={navigation.end}
        location={location}
        locale={localeObject}
        phone={phone}
      />
      <Main>
        <Hero title="404" subtitle="Not Found" />
        {children}
      </Main>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query Page404 {
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
