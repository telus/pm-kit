import React from 'react'
import { render } from 'enzyme'

import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  it('renders', () => {
    const checkbox = render(<Checkbox />)

    expect(checkbox).toMatchSnapshot()
  })
})
