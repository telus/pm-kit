import React from 'react'
import { render } from 'enzyme'

import Card from '../Card'

describe('Card', () => {
  it('renders', () => {
    const card = render(<Card title="title" subtitle="subtitle" />)

    expect(card).toMatchSnapshot()
  })
})
