import React from "react"
import classNames from "classnames"

import Default from "./default"

import "../../../scss/components/section/content/_cook.scss"

export default function Cook({ content }) {
  return (
    <div className={classNames("columns", "cook")}>
      <div className={classNames("column", "is-half", "content")}>
        <Default content={content} />
      </div>
      <div className={classNames("column", "is-half", "graphic")}></div>
    </div>
  )
}
