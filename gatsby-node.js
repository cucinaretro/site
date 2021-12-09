require("dotenv").config()

const path = require("path")
const { formatLocale } = require("@pittica/gatsby-plugin-utils")
const { getProvider } = require("@pittica/gatsby-plugin-video")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: { pages },
  } = await graphql(`
    {
      pages: allGraphCmsPage(filter: { stage: { eq: PUBLISHED } }) {
        nodes {
          slug
          updatedAt
          locale
          localeObject {
            language
            culture
            path
          }
          remotePath
        }
      }
    }
  `)

  pages.nodes.forEach(
    ({ slug, updatedAt, locale, localeObject, remotePath }) => {
      createPage({
        path: remotePath,
        component: path.resolve(`./src/templates/page.jsx`),
        context: {
          slug,
          updatedAt,
          locale,
          language: locale,
          localeObject,
        },
      })
    }
  )
}

exports.createResolvers = ({ createResolvers }) => {
  const lc = (locale) => {
    const lc = formatLocale(locale)

    lc.path = lc.language === process.env.LOCALE ? "" : `/${lc.language}`

    return lc
  }

  const resolvers = {
    GraphCMS_Page: {
      localeObject: {
        type: "LocaleData",
        resolve: ({ locale }) => lc(locale),
      },
      remotePath: {
        type: "String",
        resolve: ({ locale, slug }) => {
          const lo = lc(locale)

          return `${lo.path}/${slug !== "home" ? slug : ""}`
        },
      },
    },
    GraphCMS_Content: {
      videoEmbeds: {
        type: "[Video!]!",
        resolve: ({ videos }) => videos.map((url) => getProvider(url)),
      },
    },
  }

  createResolvers(resolvers)
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type LocaleData {
      language: String!
      culture: String
      path: String!
    }
    type Locale implements Node {
      language: GraphCMS_Locale
    }
    type Video {
      url: String!
      id: String
      provider: String
    }
  `)
}
