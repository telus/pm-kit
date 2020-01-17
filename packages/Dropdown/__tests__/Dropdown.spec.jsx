import React from 'react'
import { render } from 'enzyme'

import Dropdown from '../Dropdown'

describe('Dropdown', () => {
  it('renders', () => {
    const dropdown = render(<Dropdown />)

    expect(dropdown).toMatchSnapshot()
  })
})
