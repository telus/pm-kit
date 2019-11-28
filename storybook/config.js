import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'
import { withA11y } from '@storybook/addon-a11y'
import GlobalStyles from './GlobalStyles'

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
})
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
