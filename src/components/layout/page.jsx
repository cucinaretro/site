import React from "react"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Footer from "../ui/footer"
import Main from "../ui/main"
import TopMenu from "../ui/top-menu"

export default function Page({
  title,
  description,
  navigationStart,
  navigationEnd,
  phone,
  location,
  children,
}) {
  return (
    <div>
      <Seo title={title} description={description} path={location.pathname} />
      <TopMenu
        title={title}
        start={navigationStart}
        end={navigationEnd}
        location={location}
        phone={phone}
      />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}
