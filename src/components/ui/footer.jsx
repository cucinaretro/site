import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import classNames from "classnames"
import { SocialFollow } from "@pittica/gatsby-plugin-seo"
import { useI18next } from "gatsby-plugin-react-i18next"

import logo from "../../images/logo.svg"

import "../../scss/components/ui/_footer.scss"

export default function Footer() {
  const { t } = useI18next()
  const {
    site: {
      siteMetadata: { title, organization },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            organization {
              company
              address
              zipCode
              city
              province
              country
              email
              taxId
              vatId
              registryId
              share
            }
          }
        }
      }
    `
  )

  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className={classNames("column", "is-two-quarters")}>
            <img src={logo} alt={title} width="307" height="159" />
          </div>
          <div
            className={classNames("column", "is-one-quarter", "company")}
            itemScope=""
            itemType="https://schema.org/Organization"
          >
            <h3 itemProp="name">{organization.company}</h3>
            <div>
              <address
                itemProp="address"
                itemScope=""
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress">{organization.address}</span>
                <br />
                <span itemProp="postalCode">{organization.zipCode}</span>{" "}
                <span itemProp="addressLocality">{organization.city}</span> (
                <span itemProp="addressRegion">{organization.province}</span>)
                <br />
                <span itemProp="addressCountry">{organization.country}</span>
              </address>
            </div>
            {organization.taxId && (
              <div>
                {t("Tax ID")} <span itemProp="taxID">{organization.taxId}</span>
              </div>
            )}
            {organization.vatId && (
              <div>
                {t("VAT ID")} <span itemProp="vatID">{organization.vatId}</span>
              </div>
            )}
            {organization.registryId && (
              <div>
                REA <span>{organization.registryId}</span>
              </div>
            )}
            {organization.share && (
              <div>
                Capitale Sociale <span>{organization.share}</span>
              </div>
            )}
            {organization.email && (
              <div>
                E-Mail{" "}
                <span itemProp="email">
                  <a href={`mailto:${organization.email}`}>
                    {organization.email}
                  </a>
                </span>
              </div>
            )}
            <div>
              <a
                href="https://www.iubenda.com/privacy-policy/13725670/legal"
                target="_new"
                tilte={t("Privacy Policy")}
              >
                {t("Privacy Policy")}
              </a>
            </div>
          </div>
          <div className={classNames("column", "one-quarter")}>
            <SocialFollow />
          </div>
        </div>
        <div>
          &copy; {new Date().getFullYear()}, {organization.company}
        </div>
      </div>
    </footer>
  )
}
