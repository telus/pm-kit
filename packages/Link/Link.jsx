import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { parkGreen } from '@pm-kit/colours'

const linkStyle = css`
  color: ${parkGreen};
  &::hover {
    color: ${parkGreen};
  }
`

const Link = ({ children, forwardedRef, href, target, ...rest }) => {
  return (
    <a css={linkStyle} href={href} target={target}>
      {children}
    </a>
  )
}

const LinkWithRef = forwardRef((props, ref) => <Link {...props} forwardedRef={ref} />)

LinkWithRef.propTypes = {
  /**
   * The content. Can be text, other components, or HTML elements.
   */
  children: PropTypes.string.isRequired,
  /**
   * The external Link
   */
  href: PropTypes.string.isRequired,
  /**
   * The external Link
   */
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
}

LinkWithRef.defaultProps = {
  children: undefined,
  href: undefined,
  target: '_self',
}

export default LinkWithRef
