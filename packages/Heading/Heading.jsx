import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'

const h1 = css`
  font-size: 3rem;
  font-weight: 500;
  line-height: 3rem;
  letter-spacing: -0.5px;
`

const h2 = css`
  font-size: 2rem;
  font-weight: 500;
  line-height: 3.25rem;
  letter-spacing: -0.5px;
`

const h3 = css`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.8rem;
  letter-spacing: -0.5px;
`
const h4 = css`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.35rem;
  letter-spacing: -0.5px;
`

const Heading = ({ level, tag = level, children, forwardedRef, ...rest }) => {
  let variantStyles

  switch (level) {
    case 'h2':
      variantStyles = h2
      break
    case 'h3':
      variantStyles = h3
      break
    case 'h4':
      variantStyles = h4
      break
    default:
      variantStyles = h1
      break
  }

  return jsx(tag || 'h1', { css: variantStyles, ref: forwardedRef, ...rest }, children)
}

Heading.propTypes = {
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

Heading.defaultProps = {
  tag: undefined,
  level: 'h1',
}

const HeadingWithRef = forwardRef((props, ref) => <Heading {...props} forwardedRef={ref} />)

export default HeadingWithRef
