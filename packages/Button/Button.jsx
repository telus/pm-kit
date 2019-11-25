import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { parkGreen, lightTan, lilyGreen } from '@pm-kit/colours'

const base = css`
  display: block;
  height: 48px;
  width: auto;
  padding: 0 32px;
  border: 0;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  &:disabled {
    cursor: not-allowed;
  }
`

const primary = css`
  color: white;
  background-color: ${parkGreen};
  &:hover {
    background-color: ${lilyGreen};
    color: ${parkGreen};
  }
  &:active {
    background-color: ${lilyGreen};
  }
`

const secondary = css`
  color: ${parkGreen};
  background-color: ${lightTan};
  &:hover {
    background-color: ${lilyGreen};
    color: ${parkGreen};
  }
  &:active {
    background-color: ${lightTan};
  }
`

const inverted = css`
  color: ${parkGreen};
  background-color: transparent;
  border: 2px solid ${parkGreen};
  &:hover {
    background-color: ${lightTan};
  }
  &:active {
    background-color: ${lightTan};
  }
`

const disabledStyle = css`
  background-color: ${parkGreen};
  color: white;
  opacity: 0.5;
`

const fullWidth = css`
  width: 100%;
`

const Button = forwardRef(({ children, type, variant, wide, disabled, ...rest }, ref) => {
  let variantStyles
  switch (variant) {
    case 'secondary':
      variantStyles = secondary
      break
    case 'inverted':
      variantStyles = inverted
      break
    case 'disabled':
      variantStyles = disabledStyle
      break
    default:
      variantStyles = primary
      break
  }

  const styles = [base, variantStyles]
  if (wide) {
    styles.push(fullWidth)
  }

  return (
    <button css={styles} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  )
})

Button.propTypes = {
  /**
   * The HTML button type.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * The style.
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'inverted', 'disabled']),
  /**
   * The label. It can include the `A11yContent` component or strings.
   */
  wide: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  wide: false,
}

export default Button
