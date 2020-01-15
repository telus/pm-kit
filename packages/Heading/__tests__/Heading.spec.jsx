import React from 'react'
import { render } from 'enzyme'

import Heading from '../Heading'

describe('Heading', () => {
  it('renders', () => {
    const heading = render(<Heading level="h1">Test</Heading>)

    expect(heading).toMatchSnapshot()
  })
})
