import React, { useState } from 'react'
import Spinner from './Spinner'
import { css } from '@emotion/core'

// import { withKnobs, select, text } from '@storybook/addon-knobs'

export default {
  title: 'Design System|Spinner',
  component: Spinner,
  //   decorators: [withKnobs],
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
