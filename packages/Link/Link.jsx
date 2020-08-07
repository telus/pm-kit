import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { size, weight } from '@pm-kit/typography'
import { parkGreen } from '@pm-kit/colours'

const linkStyle = css`
  font-size: ${size.bodySmall};
  color: ${parkGreen};
  &::hover {
    color: ${parkGreen};
    font-size: ${size.bodyMedium};
  }
`

const Link = ({ children, forwardedRef, link, ...rest }) => {
  let variantStyles

  return (
    <>
      <a css={linkStyle} href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </>
  )
}

const LinkWithRef = forwardRef((props, ref) => <Link {...props} forwardedRef={ref} />)

LinkWithRef.propTypes = {
  /**
   * The content. Can be text, other components, or HTML elements.
   */
  children: PropTypes.node.isRequired,
  /**
   * The external Link
   */
  link: PropTypes.string,
}

LinkWithRef.defaultProps = {
  children: undefined,
  link: undefined,
}

export default LinkWithRef
