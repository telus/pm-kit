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
   * The visual level of the heading. If `tag` is not specified, then `level` determines what HTML element to render.
   */
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']).isRequired,
  /**
   * The semantic level of the heading. Renders the specified HTML element, otherwise it matches `level`.
   */
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'div', 'span']),
  /**
   * The content. Can be text, other components, or HTML elements.
   */
  children: PropTypes.node.isRequired,
}

LinkWithRef.defaultProps = {
  tag: undefined,
  level: 'h1',
}

export default LinkWithRef
