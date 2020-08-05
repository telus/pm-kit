import React from 'react'
import FeedbackIcon from './FeedbackIcon'
import { select, text } from '@storybook/addon-knobs'

// export default {
//   title: 'Design System|FeedbackIcon',
//   component: FeedbackIcon,
//   decorators: [withKnobs],
// }

export const success = () => <FeedbackIcon state="success" />

export const error = () => <FeedbackIcon state="error" />

export const waiting = () => <FeedbackIcon state="waiting" />

export const disabled = () => <FeedbackIcon state="disabled" />

export const Playground = () => {
  return (
    <FeedbackIcon
      state={select('state', ['success', 'error', 'waiting', 'disabled'], 'disabled')}
      size={text('size', '1.125rem')}
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
