import React from "react"
import classNames from "classnames"

import "../../../scss/components/section/menu/_entry.scss"

export default function Entry({
  entry: { name, description, vegan, notInFullBoard, prices },
}) {
  if (name) {
    return (
      <div
        className={classNames("columns", "menu-entry")}
        itemProp="hasMenuItem"
        itemScope=""
        itemType="http://schema.org/MenuItem"
      >
        <div className={classNames("column")}>
          <h6 itemProp="name" className={classNames("title", "is-6")}>
            {name}
            {vegan && (
              <span className="icon">
                <link
                  itemProp="suitableForDiet"
                  href="https://schema.org/VegetarianDiet"
                />
                <i className="icon-cucinaretro-vegetarian" />
              </span>
            )}
            {notInFullBoard && (
              <span className="icon">
                <i className="icon-cucinaretro-denied" />
              </span>
            )}
          </h6>
          {description && (
            <div
              itemProp="description"
              className="description"
              dangerouslySetInnerHTML={{ __html: description.html }}
            />
          )}
        </div>
        <div
          className={classNames("column")}
          itemProp="offers"
          itemScope=""
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="EUR" />
          {prices &&
            prices.length > 0 &&
            prices.map(({ price, notes, formattedPrice }, i) => {
              const value = parseFloat(price)

              return (
                <div
                  className={classNames("columns", "is-mobile")}
                  key={`menu-entry-price-${i}`}
                >
                  {notes && (
                    <div
                      className={classNames(
                        "column",
                        "is-9",
                        "price-notes",
                        "has-text-right"
                      )}
                      itemProp="disambiguatingDescription"
                    >
                      {notes}
                    </div>
                  )}
                  {value > 0 && (
                    <div
                      className={classNames("column", "price", "is-3", {
                        "is-offset-9": !notes,
                      })}
                      itemProp="price"
                      content={formattedPrice}
                    >
                      € {formattedPrice}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  return null
}
