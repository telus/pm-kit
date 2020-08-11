import React from 'react'
import { render } from 'enzyme'

import Link from '../Link'

describe('Link', () => {
  it('renders', () => {
    const link = render(<Link href="http://www.google.com">Google</Link>)
    expect(link).toMatchSnapshot()
  })

  it('load document in a new window', () => {
    const link = render(
      <Link href="http://www.google.com" target="_blank">
        Google
      </Link>
    )
    expect(link).toMatchSnapshot()
  })

  it('load document to immediate frameset parent in new tab', () => {
    const link = render(
      <Link href="http://www.google.com" target="_parent">
        Google
      </Link>
    )
    expect(link).toMatchSnapshot()
  })

  it('load document to full original window', () => {
    const link = render(
      <Link href="http://www.google.com" target="_top">
        Google
      </Link>
    )
    expect(link).toMatchSnapshot()
  })
})
