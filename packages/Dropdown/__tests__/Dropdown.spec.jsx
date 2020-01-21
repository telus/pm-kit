import React from 'react'
import { render } from 'enzyme'

import Dropdown from '../Dropdown'

describe('Dropdown', () => {
  it('renders default dropdown', () => {
    const dropdown = render(<Dropdown label="testing" onChange={() => {}} />)
    expect(dropdown).toMatchSnapshot()
  })
})
