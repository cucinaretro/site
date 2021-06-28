require("dotenv").config()

const path = require("path")
const { formatLocale } = require("@pittica/gatsby-plugin-utils")

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
        }
      }
    }
  `)

  pages.nodes.forEach(({ slug, updatedAt, locale, localeObject }) => {
    const page = slug !== "home" ? slug : ""

    createPage({
      path: `${localeObject.path}/${page}`,
      component: path.resolve(`./src/templates/page.jsx`),
      context: {
        slug,
        updatedAt,
        locale,
        localeObject,
      },
    })
  })
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GraphCMS_Page: {
      localeObject: {
        type: "Locale",
        resolve: ({ locale }) => {
          const lc = formatLocale(locale)

          lc.path = lc.language === process.env.LOCALE ? "" : `/${lc.language}`

          return lc
        },
      },
    },
    GraphCMS_Content: {
      videoEmbeds: {
        type: "[Video!]!",
        resolve: ({ videos }) => {
          const results = []

          videos.map((video) => {
            const matches = video.match(
              /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
            )

            if (typeof matches[1] !== "undefined") {
              results.push({
                url: video,
                id: matches[1],
              })
            }
          })

          return results
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  const typeDefs = `
    type Locale {
      language: String!
      culture: String!
      path: String!
    }
    type Video {
      url: String!
      id: String!
    }
  `
  createTypes(typeDefs)
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-javascript") {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
    )

    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }

    actions.replaceWebpackConfig(config)
  }
}
