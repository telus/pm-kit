import React from 'react'
import { render } from 'enzyme'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  it('renders', () => {
    const checkbox = render(<Checkbox label="Testing" name="Test" value={true} />)

    expect(checkbox).toMatchSnapshot()
  })
})
