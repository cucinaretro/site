import React from "react"
import classNames from "classnames"

import Renderer from "../../../mdx/renderer"

import "../../../scss/components/section/menu/_entry.scss"

export default function Entry({ entry: { name, description, vegan, prices } }) {
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
          </h6>
          {description && (
            <div itemProp="description" className="description">
              <Renderer>{description}</Renderer>
            </div>
          )}
        </div>
        <div
          className={classNames("column")}
          itemProp="offers"
          itemScope=""
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="EUR" />
          {prices.length > 0 &&
            prices.map(({ id, price, notes }) => {
              const value = parseFloat(price)

              return (
                <div className={classNames("columns", "is-mobile")} key={id}>
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
                      content={value.toFixed(2)}
                    >
                      € {value.toFixed(2)}
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
