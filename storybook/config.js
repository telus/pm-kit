import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import GlobalStyles from './GlobalStyles'

addDecorator(withA11y)
addDecorator(story => (
  <>
    <GlobalStyles />
    {story()}
  </>
))

// automatically import all files ending in *.stories.js
configure(
  [require.context('../stories', true, /\.stories\.js$/), require.context('../packages', true, /\.stories\.js$/)],
  module
)
