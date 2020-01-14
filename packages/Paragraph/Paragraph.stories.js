import React from 'react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import Paragraph from './Paragraph.jsx'
import * as colors from '../colours/colours'
import { size, weight } from '../typography/typography'
export default {
  title: 'Design System|Paragraph',
  component: Paragraph,
  decorators: [withKnobs],
}

export const Default = () => <Paragraph>Test</Paragraph>

export const Playground = () => {
  return (
    <Paragraph
      children={text('Label', '')}
      position={select('Position', ['left', 'center', 'right', 'justify'], 'left')}
      size={select(
        'Size',
        [size.bodySmall, size.bodyMedium, size.bodyLarge, size.h1, size.h2, size.h3, size.h4],
        size.bodySmall
      )}
      color={select(
        'colors',
        [
          colors.greyBlue,
          colors.parkGreen,
          colors.lilyGreen,
          colors.softSandBrown,
          colors.lightTan,
          colors.offWhite,
          colors.white,
          colors.red,
        ],
        colors.parkGreen
      )}
      decoration={select('decoration', ['underline', 'none'], 'none')}
      weight={select('Weight', [weight.normal, weight.bold], weight.normal)}
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
