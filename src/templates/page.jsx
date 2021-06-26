import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Switcher from '../components/section/switcher';

export default function PageTemplate({ data: { page: { title, contents, localeObject } }, location }) {
  return (
    <Layout title={title} location={location} locale={localeObject}>
      {contents && contents.map((content) => <Switcher key={content.id} content={content} />)}
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!, $locale: GraphCMS_Locale!) {
    page: graphCmsPage(slug: { eq: $slug }, locale: { eq: $locale }, stage: { eq: PUBLISHED }) {
      title
      locale
      localeObject {
        language
        culture
        path
      }
      contents {
        ... on GraphCMS_Content {
          id
          remoteTypeName
          title
          subtitle
          content {
            html
          }
        }
        ... on GraphCMS_Place {
          id
          remoteTypeName
          title
          notes {
            markdownNode {
              childMdx {
                body
              }
            }
          }
          coordinates {
            latitude
            longitude
          }
        }
        ... on GraphCMS_Menu {
          id
          remoteTypeName
          name
          sections {
            id
            title
            description {
              markdownNode {
                childMdx {
                  body
                }
              }
            }
            entries {
              id
              name
              prices {
                notes
                price
                id
              }
              vegan
            }
            notes
          }
        }
        ... on GraphCMS_Gallery {
          id
          remoteTypeName
        }
      }
    }
  }
`;
