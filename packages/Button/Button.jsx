import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

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
  background-color: '#034045';
`

const secondary = css`
  background-color: red;
`

const inverted = css`
  background-color: red;
`

const disabledStyle = css`
  background-color: red;
`

const fullWidth = css`
  width: 100%;
`

// const useStyles = createUseStyles({
//   button: {
//     display: 'block',
//     height: '48px',
//     padding: '0 32px',
//     border: 0,
//     borderRadius: '8px',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     textDecoration: 'none',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s, color 0.2s',
//     '&:disabled': {
//       cursor: 'not-allowed',
//     },
//   },
//   buttonWidth: {
//     // width: props => (props.wide ? '100%' : 'auto'),
//     width: ({ wide }) => wide && '100%',
//   },
//   buttonPrimary: {
//     composes: '$button',
//     backgroundColor: theme.color.greenDark,
//     color: theme.color.brown,
//     '&:hover': {
//       backgroundColor: theme.color.greenLight,
//       color: theme.color.greenDark,
//     },
//     '&:active': {
//       backgroundColor: theme.color.greenLight,
//     },
//   },
//   buttonSecondary: {
//     composes: '$button',
//     backgroundColor: theme.color.greenDarkFaded,
//     color: theme.color.greenDark,
//     '&:hover': {
//       backgroundColor: theme.color.greenLight,
//       color: theme.color.greenDark,
//     },
//     '&:active': {
//       backgroundColor: theme.color.greenDarkFaded,
//     },
//   },
//   buttonInverted: {
//     composes: '$button',
//     backgroundColor: 'transparent',
//     color: theme.color.greenDark,
//     border: `2px solid ${theme.color.greenDark}`,
//     '&:hover': {
//       backgroundColor: theme.color.greenDarkFaded,
//     },
//     '&:active': {
//       backgroundColor: theme.color.greenDarkFaded,
//     },
//   },
//   buttonDisabled: {
//     composes: '$button',
//     backgroundColor: theme.color.greenDark,
//     color: theme.color.brown,
//     opacity: '0.5',
//   },
// })

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
