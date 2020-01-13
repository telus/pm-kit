import React from 'react'
import { render } from 'enzyme'

import Paragraph from '../Paragraph'

describe('Paragraph', () => {
  it('renders', () => {
    const paragraph = render(<Paragraph />)

    expect(paragraph).toMatchSnapshot()
  })
})
