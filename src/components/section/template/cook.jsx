import React from "react"
import classnames from "classnames"

import Content from "../content"

import "../../../scss/components/section/template/_cook.scss"

export default function Cook({ content }) {
  return (
    <div className={classnames("columns", "cook")}>
      <div className={classnames("column", "is-half", "content")}>
        <Content content={content} />
      </div>
      <div className={classnames("column", "is-half", "graphic")}></div>
    </div>
  )
}
