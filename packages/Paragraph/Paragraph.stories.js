import React from 'react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import { css } from '@emotion/core'
import Paragraph from './Paragraph.jsx'
import * as colors from '../colours/colours'
import { size, weight } from '../typography/typography'
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
      size={select('Size', [size.bodySmall, size.bodyMedium, size.bodyLarge, size.h1, size.h2, size.h3, size.h4])}
      weight={select('weight', [weight.bold, weight.normal])}
      color={select('colors', [
        colors.greyBlue,
        colors.parkGreen,
        colors.lilyGreen,
        colors.softSandBrown,
        colors.lightTan,
        colors.offWhite,
        colors.white,
        colors.red,
      ])}
      decoration={select('decoration', ['underline', 'none'])}
      cssStyle={cssStyle}
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
