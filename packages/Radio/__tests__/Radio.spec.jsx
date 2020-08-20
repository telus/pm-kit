import React from 'react'
import { shallow } from 'enzyme'

import Radio from '../Radio'

describe('Radio', () => {
  it('renders', () => {
    const radio = shallow(<Radio label="Testing" name="Test" value={true} />)

    expect(radio).toMatchSnapshot()
  })
})
