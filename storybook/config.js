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

configure(
  [require.context('./docs', false, /\.stories\.mdx$/), require.context('../packages', true, /\.stories\.(js|mdx)$/)],
  module
)
