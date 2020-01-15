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
  line-height: 3.25em;
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

const disabledStyle = css`
  opacity: 0.5;
`

const Heading = ({ level, tag = level, children, disabled, forwardedRef, ...rest }) => {
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

  const styles = [variantStyles]
  if (disabled) {
    styles.push(disabledStyle)
  }

  return jsx(tag || 'h1', { css: styles, ref: forwardedRef, ...rest }, children)
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
  /**
   * The content. Can be text, other components, or HTML elements.
   */
  disabled: PropTypes.bool,
}

Heading.defaultProps = {
  tag: undefined,
  level: 'h1',
}

const HeadingWithRef = forwardRef((props, ref) => <Heading {...props} forwardedRef={ref} />)

export default HeadingWithRef
