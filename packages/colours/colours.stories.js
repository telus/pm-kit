import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import * as colours from './colours.js'
import { version } from './package.json'

const list = css`
  display: flex;
  flex-wrap: wrap;
`

const listItem = css`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

const ColourBox = styled.div`
  height: 100px;
  width: 100px;
  background: ${({ colour }) => colour};
  border: 1px solid ${({ colour }) => (colour === colours.softSandBrown ? '#000' : colour)};
  border-radius: 8px;
`

export default {
  title: 'Design System|Colours',
  parameters: {
    componentSubtitle: `version ${version}`,
  },
}

export const Default = () => {
  const colourNames = Object.keys(colours)
  return (
    <div css={list}>
      {colourNames.map(name => (
        <div css={listItem}>
          <ColourBox colour={colours[name]} />
          <p>{name}</p>
        </div>
      ))}
    </div>
  )
}
