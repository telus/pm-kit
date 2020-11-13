import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { parkGreen, lightTan, lilyGreen, white, softSandBrown } from '@pm-kit/colours'
const base = css`
  display: block;
  height: 48px;
  width: auto;
  min-width: 140px;
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
  color: ${white};
  background-color: ${parkGreen};
  &:hover {
    background-color: ${lilyGreen};
    color: ${parkGreen};
  }
  &:focus {
    box-shadow: 0 0 6px 2px #056f78;
    outline: none;
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
  &:focus {
    box-shadow: 0 0 6px 2px #056f78;
    outline: none;
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
  &:focus {
    box-shadow: 0 0 6px 2px #056f78;
    outline: none;
  }
  &:active {
    background-color: ${lightTan};
  }
`
const alternative = css`
  color: ${white};
  background-color: ${parkGreen};
  &:hover {
    background-color: ${softSandBrown};
    color: ${parkGreen};
  }
  &:focus {
    box-shadow: 0 0 6px 2px #056f78;
    outline: none;
  }
  &:active {
    background-color: ${softSandBrown};
  }
`
const disabledStyle = css`
  opacity: 0.5;
`
const fullWidth = css`
  width: 100%;
`
export const Button = ({ children, type, variant, wide, disabled, forwardedRef, ...rest }) => {
  let variantStyles
  switch (variant) {
    case 'secondary':
      variantStyles = secondary
      break
    case 'inverted':
      variantStyles = inverted
      break
    case 'alternative':
      variantStyles = alternative
      break
    default:
      variantStyles = primary
      break
  }
  const styles = [base, variantStyles]
  if (wide) {
    styles.push(fullWidth)
  }
  if (disabled) {
    styles.push(disabledStyle)
  }
  return (
    <button ref={forwardedRef} css={styles} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
const ButtonWithRef = forwardRef((props, ref) => <Button {...props} forwardedRef={ref} />)
ButtonWithRef.propTypes = {
  /**
   * The HTML button type.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * The style.
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'inverted', 'alternative']),
  /**
   * The label. It can include the `A11yContent` component or strings.
   */
  wide: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
}
ButtonWithRef.defaultProps = {
  type: 'button',
  variant: 'primary',
  wide: false,
}
export default ButtonWithRef
