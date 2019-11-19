import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from './Button.jsx'

export default {
  title: 'Button',
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
  <Button variant="disabled" disabled onClick={action('clicked')}>
    Disabled Button
  </Button>
)
