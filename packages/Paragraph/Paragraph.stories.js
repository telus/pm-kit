import React from 'react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import { css } from '@emotion/core'
import Paragraph from './Paragraph.jsx'

export default {
  title: 'Design System|Paragraph',
  component: Paragraph,
  decorators: [withKnobs],
}

export const Default = () => <Paragraph>Test</Paragraph>

export const h1 = () => (
  <Paragraph size="3rem" weight="500">
    Test
  </Paragraph>
)

export const Playground = () => {
  const cssStyle = css`
    padding-top: 20px;
    font-weight: 500;
  `
  return (
    <Paragraph
      children={text('Label', 'Testing')}
      position={select('Position', ['left', 'center', 'right', 'justify'])}
      size={select('Size', ['18px', '24px', '14px'])}
      weight={select('weight', ['300', '500'])}
      decoration={select('decoration', ['underline', 'none'])}
      cssStyle={cssStyle}
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
