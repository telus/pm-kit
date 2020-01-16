import React from 'react'
import { render } from 'enzyme'

import FeedbackIcon from '../FeedbackIcon'

describe('FeedbackIcon', () => {
  it('renders nothing when disabled', () => {
    const feedbackIcon = render(<FeedbackIcon state="disabled" />)
    expect(feedbackIcon).toMatchSnapshot()
  })

  it('renders checkmark when passed', () => {
    const feedbackIcon = render(<FeedbackIcon state="passed" />)
    expect(feedbackIcon).toMatchSnapshot()
  })

  it('renders error icon when failed', () => {
    const feedbackIcon = render(<FeedbackIcon state="failed" />)
    expect(feedbackIcon).toMatchSnapshot()
  })

  it('renders spinner when waiting', () => {
    const feedbackIcon = render(<FeedbackIcon state="waiting" />)
    expect(feedbackIcon).toMatchSnapshot()
  })
})
