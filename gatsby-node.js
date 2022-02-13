require("dotenv").config()

const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { formatLocale } = require("@pittica/gatsby-plugin-utils")
const { getProvider } = require("@pittica/gatsby-plugin-video")
const { refreshAccessToken } = require("@pittica/gatsby-source-instagram")
const axios = require("axios")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: { pages },
  } = await graphql(`
    {
      pages: allGraphCmsPage(filter: { stage: { eq: PUBLISHED } }) {
        nodes {
          slug
          updatedAt
          language: locale
          remotePath
        }
      }
    }
  `)

  pages.nodes.forEach(({ slug, updatedAt, language, remotePath }) =>
    createPage({
      path: remotePath,
      component: path.resolve(`./src/templates/page.jsx`),
      context: {
        slug,
        updatedAt,
        language,
      },
    })
  )
}

exports.onPreInit = async ({ reporter }) => {
  const config = {
    headers: {
      "User-Agent": `${process.env.HOST} (${process.env.OWNER_EMAIL})`,
      Authorization: `Bearer ${process.env.NETLIFY_TOKEN}`,
    },
  }
  const endpoint = `https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}`

  const payload = await axios
    .get(endpoint, config)
    .then(async ({ data: { build_settings } }) => {
      if (typeof build_settings.env !== "undefined") {
        build_settings.env.INSTAGRAM_TOKEN = await refreshAccessToken(
          process.env.INSTAGRAM_TOKEN
        )

        return build_settings
      } else {
        reporter.warn({
          context: {
            sourceMessage: `Netlify connection failed.`,
          },
        })

        return null
      }
    })
    .catch(() => {
      reporter.warn({
        context: {
          sourceMessage: `Netlify connection failed.`,
        },
      })
    })

  if (payload !== null) {
    await axios.patch(endpoint, { build_settings: payload }, config)
  }
}

exports.createResolvers = ({ createResolvers }) => {
  const lc = (locale) => {
    const lc = formatLocale(locale)

    lc.path = lc.language === process.env.LOCALE ? "" : `/${lc.language}`

    return lc
  }

  const resolvers = {
    GraphCMS_Page: {
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
    type Locale implements Node {
      language: GraphCMS_Locale
    }
    type Video {
      url: String!
      id: String
      provider: String
    }
    type GraphCMS_Asset implements Node {
      localFile: File @link(from: "fields.localFile")
      category: String
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
  cache,
}) => {
  switch (node.remoteTypeName) {
    case "Asset":
      try {
        const ext = path.extname(node.fileName)
        const fileNode = await createRemoteFileNode({
          url: node.url,
          parentNodeId: node.id,
          createNode,
          createNodeId,
          cache,
          getCache,
          name: path.basename(node.fileName, ext),
          ext,
        })

        if (fileNode) {
          createNodeField({ node, name: "localFile", value: fileNode.id })
        }
      } catch (e) {
        console.error("GraphCMS", e)
      }

      return
  }
}
