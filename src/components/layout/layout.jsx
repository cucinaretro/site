import React from 'react';
import { Seo } from '@pittica/gatsby-plugin-seo';

import Navbar from '../nav/navbar';
import Footer from '../ui/footer';
import Main from '../ui/main';

export default function Layout({ children, location, title, description, locale }) {
  return (
    <div>
      <Seo title={title} description={description} path={location.pathname} />
      <Navbar title={title} location={location} locale={locale} />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
