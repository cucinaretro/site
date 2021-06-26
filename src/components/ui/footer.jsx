import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import classnames from 'classnames';
import { SocialFollow } from '@pittica/gatsby-plugin-seo';

import logo from '../../images/footer/logo.svg';
import top from '../../images/footer/top.svg';

import '../../scss/components/ui/_footer.scss';

export default function Footer() {
  const { site: { siteMetadata: { organization } } } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
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
  );

  return (
    <div className="footer-container">
      <div className="top">
        <img src={top} alt="Cucina Retrò" width="1024" height="40" />
      </div>
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className={classnames('column', 'is-two-quarters')}>
              <img src={logo} alt="Cucina Retrò" width="307" height="159" />
            </div>
            <div
              className={classnames('column', 'is-one-quarter', 'company')}
              itemScope=""
              itemType="https://schema.org/Organization"
            >
              <h3 itemProp="name">{organization.company}</h3>
              <div>
                <address itemProp="address" itemScope="" itemType="https://schema.org/PostalAddress">
                  <span itemProp="streetAddress">{organization.address}</span>
                  <br />
                  <span itemProp="postalCode">{organization.zipCode}</span>{' '}
                  <span itemProp="addressLocality">{organization.city}</span> (<span itemProp="addressRegion">{organization.province}</span>)<br />
                  <span itemProp="addressCountry">{organization.country}</span>
                </address>
              </div>
              {organization.taxId && (
                <div>
                  Codice Fiscale <span itemProp="taxID">{organization.taxId}</span>
                </div>
              )}
              {organization.vatId && (
                <div>
                  Partita IVA <span itemProp="vatID">{organization.vatId}</span>
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
                  E-Mail{' '}
                  <span itemProp="email">
                    <a href={`mailto:${organization.email}`}>{organization.email}</a>
                  </span>
                </div>
              )}
            </div>
            <SocialFollow className={classnames('column', 'one-quarter')} />
          </div>
          <div>
            &copy; {new Date().getFullYear()}, {organization.company}
          </div>
        </div>
      </footer>
    </div>
  );
}
