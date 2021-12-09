import React from "react"
import { useI18next, Link } from "gatsby-plugin-react-i18next"
import { formatLocale } from "@pittica/gatsby-plugin-utils"

import "../../scss/components/ui/_locales-menu.scss"

export default function LocalesMenu() {
  const { languages, language, originalPath, t } = useI18next()

  if (languages && languages.length > 1) {
    return (
      <div className="locales-menu">
        <span>{t("Change Language")}:</span>
        <ul>
          {languages.map((lng, i) => {
            if (lng !== language) {
              const lc = formatLocale(lng)

              return (
                <li key={`locales-${i}`}>
                  <Link to={originalPath} language={lng}>
                    {t(lc.language)}
                  </Link>
                </li>
              )
            } else {
              return null
            }
          })}
        </ul>
      </div>
    )
  } else {
    return null
  }
}
