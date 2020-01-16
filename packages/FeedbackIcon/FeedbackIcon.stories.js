import React from 'react'
import FeedbackIcon from './FeedbackIcon'
import { withKnobs, select, text } from '@storybook/addon-knobs'

export default {
  title: 'Design System|FeedbackIcon',
  component: FeedbackIcon,
  decorators: [withKnobs],
}

export const passed = () => <FeedbackIcon state="passed" />

export const failed = () => <FeedbackIcon state="failed" />

export const waiting = () => <FeedbackIcon state="waiting" />

export const disabled = () => <FeedbackIcon state="disabled" />

export const Playground = () => {
  return (
    <FeedbackIcon
      state={select('state', ['passed', 'failed', 'waiting', 'disabled'], 'disabled')}
      size={text('size', '1.125rem')}
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
