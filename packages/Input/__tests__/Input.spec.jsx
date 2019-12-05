import React from 'react'
import { render } from 'enzyme'

import Input from '../Input'

describe('Input', () => {
  it('renders', () => {
    const input = render(<Input label="Label" />)

    expect(input).toMatchSnapshot()
  })
})
