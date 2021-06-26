import React from 'react';

import Hero from '../ui/hero';
import Section from '../ui/section';
import Entry from './menu/entry';
import Renderer from '../../mdx/renderer';

import '../../scss/templates/_menu.scss';

export default function Menu({ content: { name, sections } }) {
  return (
    <article className="food-menu" itemProp="menu" itemScope="" itemType="https://schema.org/Menu">
      <Hero title={name} />
      {sections.map((section) => (
        <Section
          title={section.title}
          key={section.id}
          itemProp="hasMenuSection"
          itemScope=""
          itemType="https://schema.org/MenuSection"
        >
          {section.description && <Renderer>{section.description}</Renderer>}
          {section.entries.map((entry) => <Entry key={entry.id} entry={entry} />)}
          {section.notes && <div className="notes">{section.notes}</div>}
        </Section>
      ))}
    </article>
  );
}
