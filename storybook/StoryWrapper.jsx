import React from 'react'
import { css } from '@emotion/core'

const wrapper = css`
  margin: 20px 40px;
`

export default function StoryWrapper({ children }) {
  return <div css={wrapper}>{children}</div>
}
