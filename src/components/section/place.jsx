import React from 'react';

import Section from '../ui/section';
import Renderer from '../../mdx/renderer';

export default function Place({ content: { title, notes, coordinates: { latitude, longitude } } }) {
  return (
    <article className="place">
      <Section title={title}>
        <div>
          <Renderer>{notes}</Renderer>
        </div>
      </Section>
    </article>
  );
}
