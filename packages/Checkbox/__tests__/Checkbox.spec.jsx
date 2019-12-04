import React from 'react'
import { render } from 'enzyme'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  it('renders', () => {
    const checkbox = render(<Checkbox labelName="Testing" name="Test" value={true} />)

    expect(checkbox).toMatchSnapshot()
  })
})
