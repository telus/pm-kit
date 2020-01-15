import React from 'react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import Heading from './Heading.jsx'
import { version } from './package.json'

export default {
  title: 'Design System|Heading',
  component: Heading,
  parameters: {
    componentSubtitle: `version ${version}`,
  },
  decorators: [withKnobs],
}

export const Heading1 = () => (
  <Heading tag="h1" level="h1">
    Heading 1
  </Heading>
)

export const Heading2 = () => (
  <Heading level="h2" tag="h2">
    Heading 2
  </Heading>
)

export const Heading3 = () => (
  <Heading level="h3" tag="h3">
    Heading 3
  </Heading>
)

export const Heading4 = () => (
  <Heading level="h4" tag="h4">
    Heading 4
  </Heading>
)

export const Playground = () => (
  <Heading
    level={select('Level', ['h1', 'h2', 'h3', 'h4'])}
    tag={select('Tag', [undefined, 'h1', 'h2', 'h3', 'h4', 'div', 'span'])}
    children={text('Text', 'Edit Text')}
  />
)

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
