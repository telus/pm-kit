import React from 'react'
import { shallow } from 'enzyme'

import Dropdown from '../Dropdown'

describe('Dropdown', () => {
  it('renders default dropdown', () => {
    const dropdown = shallow(<Dropdown label="testing" onChange={() => {}} />)
    expect(dropdown).toMatchSnapshot()
  })
})
