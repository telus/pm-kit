import React from 'react'
import { render, shallow } from 'enzyme'

import Button from '../Button'

describe('Button', () => {
  const doShallow = (overrides = {}) => {
    const button = shallow(<Button {...overrides}>Submit</Button>)

    return button
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders', () => {
    const button = render(<Button>Submit</Button>)

    expect(button).toMatchSnapshot()
  })

  it('has one of the HTML button types', () => {
    let button = doShallow()
    expect(button).toHaveProp('type', 'button')

    button = doShallow({ type: 'reset' })
    expect(button).toHaveProp('type', 'reset')
  })
})
