import React from "react"
import classnames from "classnames"

import Default from "./default"

import "../../../scss/components/section/content/_cook.scss"

export default function Cook({ content }) {
  return (
    <div className={classnames("columns", "cook")}>
      <div className={classnames("column", "is-half", "content")}>
        <Default content={content} />
      </div>
      <div className={classnames("column", "is-half", "graphic")}></div>
    </div>
  )
}
