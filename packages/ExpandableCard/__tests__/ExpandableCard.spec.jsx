import React from 'react'
import { render } from 'enzyme'

import ExpandableCard from '../ExpandableCard'

describe('ExpandableCard', () => {
  it('renders', () => {
    const expandableCard = render(<ExpandableCard />)

    expect(expandableCard).toMatchSnapshot()
  })
})
