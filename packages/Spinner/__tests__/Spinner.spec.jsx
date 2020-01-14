import React from 'react'
import { render } from 'enzyme'

import Spinner from '../Spinner'

describe('Spinner', () => {
  it('renders', () => {
    const spinner = render(<Spinner />)

    expect(spinner).toMatchSnapshot()
  })
})
