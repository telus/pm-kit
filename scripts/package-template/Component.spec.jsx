import React from 'react'
import { render } from 'enzyme'

import $COMPONENT$ from '../$COMPONENT$'

describe('$COMPONENT$', () => {
  it('renders', () => {
    const $COMPONENT_CAMEL$ = render(<$COMPONENT$ />)

    expect($COMPONENT_CAMEL$).toMatchSnapshot()
  })
})
