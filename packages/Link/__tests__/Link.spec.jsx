import React from 'react'
import { render } from 'enzyme'

import Link from '../Link'

describe('Link', () => {
  it('renders', () => {
    const link = render(<Link link="http://www.google.com">Google</Link>)

    expect(link).toMatchSnapshot()
  })
})
