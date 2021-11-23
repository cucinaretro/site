require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: process.env.NAME,
    author: process.env.OWNER_COMPANY,
    description: process.env.DESCRIPTION,
    locale: {
      language: process.env.LOCALE.toLowerCase(),
      culture: process.env.CULTURE.toUpperCase(),
    },
    siteUrl: `https://${process.env.HOST}`,
    organization: {
      company: process.env.OWNER_COMPANY,
      address: process.env.OWNER_ADDRESS,
      url: `https://${process.env.HOST}`,
      logo: `https://${process.env.HOST}/logo.png`,
      zipCode: process.env.OWNER_ZIP_CODE,
      city: process.env.OWNER_CITY,
      province: process.env.OWNER_PROVINCE,
      country: process.env.OWNER_COUNTRY,
      email: process.env.OWNER_EMAIL,
      phone: process.env.OWNER_PHONE,
      taxId: process.env.OWNER_TAX_ID,
      vatId: process.env.OWNER_VAT_ID,
      registryId: process.env.OWNER_REGISTRY_ID,
      share: process.env.ONWER_SHARE,
    },
    appearance: {
      accent: process.env.APPEARANCE_THEME,
      background: process.env.APPEARANCE_BACKGROUND,
      theme: process.env.APPEARANCE_COLOR,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        mediaTypes: [`text/markdown`, `text/x-markdown`],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/public/**/*.html": [
            "cache-control: public",
            "cache-control: max-age=0",
            "cache-control: must-revalidate",
          ],
          "/sw.js": [
            "cache-control: public",
            "cache-control: max-age=0",
            "cache-control: must-revalidate",
          ],
          "/public/page-data/*": [
            "cache-control: public",
            "cache-control: max-age=0",
            "cache-control: must-revalidate",
          ],
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-source-graphcms",
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        buildMarkdownNodes: true,
        locales: ["en_US", "it_IT"],
        fragmentsPath: "fragments",
        downloadLocalImages: true,
        stages: ["PUBLISHED"],
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GA_TRACKING_ID,
          cookieName: "cucinaretro-gdpr-analytics",
          anonymize: true,
          allowAdFeatures: false,
        },
        environments: ["production", "development"],
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-cookiehub`,
      options: {
        code: process.env.COOKIEHUB_CODE,
        debug: (process.env.ENV || process.env.NODE_ENV) !== "production",
        cookie: "cucinaretro-gdpr",
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: process.env.NAME,
        short_name: process.env.NAME,
        start_url: `/`,
        background_color: process.env.APPEARANCE_BACKGROUND,
        theme_color: process.env.APPEARANCE_THEME,
        display: `minimal-ui`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/./",
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
                context {
                  updatedAt
                }
              }
            }
          }
        `,
        resolvePages: ({
          site: {
            siteMetadata: { siteUrl },
          },
          allSitePage: { nodes },
        }) =>
          nodes.map(({ path, context }) => {
            const page = {
              path: new URL(path, siteUrl).href,
              changefreq: "daily",
              priority: 0.5,
              lastmod: null,
            }

            if (context && context) {
              if (context.updatedAt) {
                page.lastmod = context.updatedAt
              }

              page.priority = path === "/" ? 1.0 : 0.5
            }

            return page
          }),
        serialize: ({ path, changefreq, priority, lastmod }) => {
          return { url: path, changefreq, priority, lastmod }
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: [
          { domain: "https://www.gstatic.com", crossOrigin: true },
          { domain: "https://www.google.com", crossOrigin: true },
          { domain: "https://www.google-analytics.com", crossOrigin: true },
        ],
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        image: `/share.jpg`,
        socials: {
          instagram: {
            username: process.env.INSTAGRAM_USERNAME,
            icon: "icon-cucinaretro-instagram",
          },
          facebook: {
            page: process.env.FACEBOOK_PAGE_USERNAME,
            app: process.env.FACEBOOK_APP_ID,
            icon: "icon-cucinaretro-facebook",
          },
        },
      },
    },
    {
      resolve: `@pittica/gatsby-source-instagram`,
      options: {
        token: process.env.INSTAGRAM_TOKEN,
        limit: 9,
        locale: process.env.LOCALE.toLowerCase(),
      },
    },
    {
      resolve: `gatsby-plugin-react-leaflet`,
      options: {
        linkStyles: false,
      },
    },
  ],
}
