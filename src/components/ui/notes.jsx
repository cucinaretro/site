import React from "react"
import PropTypes from "prop-types"
import { useI18next } from "gatsby-plugin-react-i18next"

import Section from "./section"

export default function Notes({ vegan, notInFullBoard }) {
  const { t } = useI18next()

  if (vegan || notInFullBoard) {
    return (
      <Section title={t("Notes")}>
        {vegan && (
          <div className="icon-text">
            <span className="icon">
              <i className="icon-cucinaretro-vegetarian" />
            </span>
            <span>{t("Vegan")}</span>
          </div>
        )}
        {notInFullBoard && (
          <div className="icon-text">
            <span className="icon">
              <i className="icon-cucinaretro-denied" />
            </span>
            <span>
              {t("Dishes not included in the Columbia Hotel's board menu")}
            </span>
          </div>
        )}
      </Section>
    )
  } else {
    return null
  }
}

Notes.propTypes = {
  vegan: PropTypes.bool,
  notInFullBoard: PropTypes.bool,
}

Notes.defaultProps = {
  vegan: false,
  notInFullBoard: false,
}
