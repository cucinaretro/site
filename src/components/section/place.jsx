import React from "react"
import classNames from "classnames"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon, Point } from "leaflet"
import { MarkdownRenderer } from "@pittica/gatsby-plugin-mdx-shortcodes"

import Section from "../ui/section"

import marker from "../../images/map/marker.svg"

import "../../scss/components/section/_place.scss"

export default function Place({
  content: {
    title,
    notes,
    coordinates: { latitude, longitude },
  },
}) {
  return (
    <article className="place">
      <div className="columns">
        <div className={classNames("column", "is-half")}>
          <Section title={title} />
        </div>
        <div className={classNames("column", "is-half", "content")}>
          <Section>
            <MarkdownRenderer>{notes}</MarkdownRenderer>
          </Section>
        </div>
      </div>
      {typeof window !== "undefined" && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[latitude, longitude]}
            icon={
              new Icon({
                iconUrl: marker,
                iconRetinaUrl: marker,
                iconAnchor: new Point(25, 35),
                popupAnchor: new Point(-15, -25),
                iconSize: new Point(25, 35),
              })
            }
          >
            <Popup>
              <a
                href={`https://maps.google.com/?q=${latitude},${longitude}`}
                target="_new"
              >
                <MarkdownRenderer>{notes}</MarkdownRenderer>
              </a>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </article>
  )
}
