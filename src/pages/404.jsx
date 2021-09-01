import React from "react"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Footer from "../components/ui/footer"
import Hero from "../components/ui/hero"
import Main from "../components/ui/main"
import TopMenu from "../components/ui/top-menu"

export default function NotFoundPage({ children, location, locale }) {
  return (
    <div>
      <Seo title="404" description="Not Found" path={location.pathname} />
      <TopMenu title="404" location={location} locale={locale} />
      <Main>
        <Hero title="404" subtitle="Not Found" />
        {children}
      </Main>
      <Footer />
    </div>
  )
}
