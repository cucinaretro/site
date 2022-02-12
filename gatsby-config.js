require("dotenv").config()

const siteUrl = `https://${process.env.HOST}`
const locales = ["it", "en"]

module.exports = {
  siteMetadata: {
    title: process.env.NAME,
    author: process.env.OWNER_COMPANY,
    description: process.env.DESCRIPTION,
    locale: {
      language: process.env.LOCALE.toLowerCase(),
      culture: process.env.CULTURE.toUpperCase(),
    },
    siteUrl,
    organization: {
      company: process.env.OWNER_COMPANY,
      address: process.env.OWNER_ADDRESS,
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: locales,
        defaultLanguage: process.env.LOCALE.toLowerCase(),
        fallbackLanguage: process.env.LOCALE.toLowerCase(),
        siteUrl,
        i18nextOptions: {
          defaultNS: "messages",
          nonExplicitSupportedLngs: true,
          cleanCode: true,
        },
        pages: [
          {
            matchPath: "/:lang?/:slug",
            getLanguageFromPath: true,
            excludeLanguages: [process.env.LOCALE.toLowerCase()],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/public/**/*.html": [
            "Cache-Control: public, max-age=0, must-revalidate",
          ],
          "/sw.js": ["Cache-Control: public, max-age=0, must-revalidate"],
          "/public/page-data/*": [
            "Cache-Control: public, max-age=0, must-revalidate",
          ],
          "**/*.@(eot|otf|ttf|ttc|woff|woff2|font.css)": [
            "Access-Control-Allow-Origin: *",
          ],
          "**/page-data/*": [
            "Cache-Control: public, max-age=0, must-revalidate",
          ],
          "error/*": ["Cache-Control: max-age=300"],
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
        locales,
        fragmentsPath: "fragments",
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
        cookie: "cucinaretro-gdpr-analytics",
      },
      facebookPixel: {
        pixelId: process.env.FACEBOOK_PIXEL,
        cookieName: "cucinaretro-gdpr-marketing",
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
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes } }) =>
          nodes.map(({ path, pageContext }) => {
            const page = {
              path: new URL(path, siteUrl).href,
              changefreq: "daily",
              priority: 0.5,
              lastmod: null,
            }

            if (pageContext && pageContext.updatedAt) {
              page.lastmod = pageContext.updatedAt
            }

            page.priority = path === "/" ? 1.0 : 0.5

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
        type: "InstagramPost"
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
