import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import GlobalStyles from './GlobalStyles'

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
