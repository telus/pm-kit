import React from 'react'
import { render } from 'enzyme'

import Radio from '../Radio'

describe('Radio', () => {
  it('renders', () => {
    const radio = render(<Radio label="Testing" name="Test" value={true} />)

    expect(radio).toMatchSnapshot()
  })
})
