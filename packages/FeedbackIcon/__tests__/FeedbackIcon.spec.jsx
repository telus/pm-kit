import React from 'react'
import { render } from 'enzyme'

import FeedbackIcon from '../FeedbackIcon'

describe('FeedbackIcon', () => {
  it('renders nothing when undefined', () => {
    const feedbackIcon = render(<FeedbackIcon state={undefined} />)
    expect(feedbackIcon).toMatchSnapshot()
  })

  it('renders checkmark when success', () => {
    const feedbackIcon = render(<FeedbackIcon state="success" />)
    expect(feedbackIcon).toMatchSnapshot()
  })

  it('renders error icon when error', () => {
    const feedbackIcon = render(<FeedbackIcon state="error" />)
    expect(feedbackIcon).toMatchSnapshot()
  })

  it('renders spinner when waiting', () => {
    const feedbackIcon = render(<FeedbackIcon state="waiting" />)
    expect(feedbackIcon).toMatchSnapshot()
  })
})
