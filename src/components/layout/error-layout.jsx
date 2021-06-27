import React from "react"
import Layout from "./layout"
import Hero from "../ui/hero"

export default function ErrorLayout({ location, title, code }) {
  return (
    <Layout location={location} title={title}>
      <Hero title={code} subtitle={title} />
    </Layout>
  )
}
