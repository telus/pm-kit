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

const Link = ({ children, forwardedRef, link, target, ...rest }) => {
  return (
    <a css={linkStyle} href={link} target={target} rel="noopener noreferrer">
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
  link: PropTypes.string,
  /**
   * The external Link
   */
  target: PropTypes.oneOf(['_blank', '_self']),
}

LinkWithRef.defaultProps = {
  children: undefined,
  link: undefined,
  target: '_blank',
}

export default LinkWithRef
