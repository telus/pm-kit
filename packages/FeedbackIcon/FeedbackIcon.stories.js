import React from 'react'
import FeedbackIcon from './FeedbackIcon'
import { css } from '@emotion/core'
import { withKnobs, select } from '@storybook/addon-knobs'

export default {
  title: 'Design System|FeedbackIcon',
  component: FeedbackIcon,
  decorators: [withKnobs],
}

export const Default = () => {
  const container = css`
    width: 44px;
    height: 44px;
  `
  return (
    <div css={container}>
      <FeedbackIcon />
    </div>
  )
}

export const Playground = () => {
  return <FeedbackIcon size={select('FeedbackIcon', ['100%', '24px', '34px', '44px'], '100%')} />
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
