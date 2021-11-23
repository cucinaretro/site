import React from "react"

import "../../scss/components/ui/_page-content.scss"

export default function PageContent({ children }) {
  return <article className="page-content">{children}</article>
}
