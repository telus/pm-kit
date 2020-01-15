import React from 'react'
import { render } from 'enzyme'

import FeedbackIcon from '../FeedbackIcon'

describe('FeedbackIcon', () => {
  it('renders', () => {
    const feedbackIcon = render(<FeedbackIcon />)

    expect(feedbackIcon).toMatchSnapshot()
  })
})
