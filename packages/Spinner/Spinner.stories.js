import React from 'react'
import Spinner from './Spinner'
import { css } from '@emotion/core'
import { withKnobs, select } from '@storybook/addon-knobs'

export default {
  title: 'Design System|Spinner',
  component: Spinner,
  decorators: [withKnobs],
}

export const Default = () => {
  const container = css`
    width: 44px;
    height: 44px;
  `
  return (
    <div css={container}>
      <Spinner />
    </div>
  )
}

export const Playground = () => {
  return <Spinner size={select('spinner', ['100%', '24px', '34px', '44px'], '100%')} />
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
