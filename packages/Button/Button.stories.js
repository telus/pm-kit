import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import Button from './Button.jsx'

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
}

export const Primary = () => <Button onClick={action('clicked')}>Primary Button</Button>

export const Secondary = () => (
  <Button variant="secondary" onClick={action('clicked')}>
    Secondary Button
  </Button>
)

export const Inverted = () => (
  <Button variant="inverted" onClick={action('clicked')}>
    Inverted Button
  </Button>
)

export const Disabled = () => (
  <Button disabled onClick={action('clicked')}>
    Disabled Button
  </Button>
)

export const Playground = () => (
  <Button
    variant={select('Variant', ['primary', 'secondary', 'inverted'])}
    disabled={boolean('Disabled', false)}
    onClick={action('clicked')}
  >
    {text('Label', 'Testing')}
  </Button>
)

Playground.story = {
  name: 'playground',
}
