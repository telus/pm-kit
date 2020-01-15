import React from 'react'
import { render } from 'enzyme'

import Heading from '../Heading'

describe('Heading', () => {
  it('renders', () => {
    const heading = render(<Heading />)

    expect(heading).toMatchSnapshot()
  })
})
