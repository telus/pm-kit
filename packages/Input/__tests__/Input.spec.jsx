import React from 'react'
import { render, mount } from 'enzyme'

import Input from '../Input'

describe('Input', () => {
  it('renders', () => {
    const input = render(<Input label="Label" />)

    expect(input).toMatchSnapshot()
  })

  const defaultProps = {
    label: 'test',
  }

  const doMount = (overrides = {}) => {
    const input = mount(<Input {...defaultProps} {...overrides} />)

    const findInputElement = () => input.find('input')

    return {
      input,
      label: input.find('label'),
      findInputElement,
    }
  }

  it('supports different input types', () => {
    const inputOfTypeNumber = doMount({ type: 'number' }).findInputElement
    expect(inputOfTypeNumber()).toHaveProp('inputMode', 'decimal')
  })
})
