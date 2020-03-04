import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { red, parkGreen, greyBlue } from '@pm-kit/colours'
import generateId from '../../shared/utils/generateId/generateId.js'
import FeedbackIcon from '@pm-kit/feedback-icon'
import { size, weight } from '@pm-kit/typography'
import show from '../../shared/png/show/show.png'
import hide from '../../shared/png/hide/hide.png'

const inputWrapper = css`
  width: 100%;
`

const passwordInputWrapper = css`
  display: flex;
  border: solid 1px ${parkGreen};
  border-radius: 8px;
  background-color: white;
  width: 100%;
  justify-content: space-around;
`

const inputField = css`
  width: 100%;
  padding: 0 16px;
  font-size: ${size.bodyLarge};
  border: 1px solid ${parkGreen};
  border-radius: 8px;
  height: 48px;
  color: ${parkGreen};
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &::placeholder {
    color: ${greyBlue};
    font-size: ${size.bodyMedium};
  }
`

const passwordInput = css`
  ${inputField};
  padding: 0;
  border: none;
  height: 46px;
  margin-left: 16px;
  &:focus {
    outline: none;
  }
`

const inputFieldWithError = css`
  border-color: ${red};
`

const inputAndFeedbackWrapper = css`
  position: relative;
`

const feedbackIconWrapper = css`
  position: absolute;
  left: calc(100% + 24px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
`

const labelContainer = css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  color: ${parkGreen};
  font-size: ${size.bodySmall};
  font-weight: ${weight.normal};
  margin: 0 0 0.5rem 16px;
  & label {
    margin-right: 0.5rem;
  }
`

const largeLabelContainer = css`
  ${labelContainer}
  font-size: ${size.bodyLarge};
  font-weight: ${weight.bold};
  margin: 0 0 0.5rem 0.2rem;
`

const mobileLabelContainer = css`
  ${labelContainer}
  font-size: ${size.bodyMedium};
`

const isDisabled = css`
  opacity: 0.5;
`
const feedbackError = css`
  color: ${red};
  font-weight: ${weight.normal};
`

const eyeButton = css`
  border: none;
  background: none;
  display: flex;
  justify-content: space-around;
  margin-right: 5px;
  &:focus {
    outline: none;
  }
`

const eyeImage = css`
  width: 32px;
  height: 22px;
  align-self: center;
`

export const Input = ({
  disabled,
  id,
  name,
  value,
  onChange,
  label,
  required,
  labelType,
  feedback,
  error,
  feedbackicon,
  hideLabel,
  type,
  forwardedRef,
  ...rest
}) => {
  const [display, setDisplay] = useState(false)
  const inputId = generateId(id, name, label)
  const labelContainerStyle = [labelContainer]
  const inputStyle = [inputField]
  const passwordInputStyle = [passwordInputWrapper]

  if (labelType === 'large') {
    labelContainerStyle.push(largeLabelContainer)
  }
  if (labelType === 'mobile') {
    labelContainerStyle.push(mobileLabelContainer)
  }

  if (feedback === 'error') {
    if (type === 'password') {
      passwordInputStyle.push(inputFieldWithError)
    } else {
      inputStyle.push(inputFieldWithError)
    }
  }
  const renderLabel = (label, required, disabled) => {
    const labelText = `${label}${required ? true && '*' : ''}`
    return (
      <label css={disabled ? isDisabled : null} htmlFor={inputId.identity()}>
        {labelText}
      </label>
    )
  }

  const renderFeedback = errorMessage => <span css={feedbackError}>{`(${errorMessage})`}</span>

  /**
   * this is a workaround for a bug in chrome that moves
   * the cursor into a wrong position if prepended with a space
   */
  const handleKeyDown = e => {
    if (type === 'email' && e.key === ' ') {
      e.preventDefault()
    }
  }

  const showPassword = () => {
    if (!value || value === '') {
      setDisplay(false)
    } else {
      setDisplay(!display)
    }
  }

  return (
    <div css={inputWrapper}>
      {!hideLabel && (
        <div css={labelContainerStyle}>
          {label && renderLabel(label, required, disabled)}
          {feedback === 'error' && error && renderFeedback(error)}
        </div>
      )}
      <div css={inputAndFeedbackWrapper}>
        {type === 'password' ? (
          <div css={passwordInputStyle}>
            <input
              aria-invalid={feedback}
              aria-label={hideLabel ? label : null}
              css={passwordInput}
              id={inputId.identity()}
              name={name}
              onKeyDown={handleKeyDown}
              type={display ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              disabled={disabled}
              ref={forwardedRef}
              {...rest}
            />
            <button css={eyeButton} onClick={showPassword}>
              <img css={eyeImage} src={display ? hide : show} alt="show password" />
            </button>
          </div>
        ) : (
          <input
            css={inputStyle}
            aria-invalid={feedback === 'error'}
            aria-label={hideLabel ? label : null}
            feedback={feedback}
            disabled={disabled}
            id={inputId.identity()}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            ref={forwardedRef}
            {...rest}
          />
        )}
        {feedbackicon && feedback && (
          <div css={feedbackIconWrapper}>
            <FeedbackIcon state={!feedback ? 'disabled' : feedback} size="24px" />
          </div>
        )}
      </div>
    </div>
  )
}

Input.propTypes = {
  /**
   * The label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Specifies if Input is a required field.
   */
  required: PropTypes.bool,
  /**
   * Specifies if the Input field should be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * A feedback state.
   */
  feedback: PropTypes.oneOf(['success', 'error', 'waiting']),
  /**
   * Specifies if the label of Input field should be hidden.
   */
  hideLabel: PropTypes.bool,
  /**
   * An error message. Should be limited to text and links. See usage criteria for more details.
   */
  error: PropTypes.string,
  /**
   * Control whether to dispaly feedback-icon or not.
   */
  feedbackicon: PropTypes.bool,
  /**
   * The name.
   */
  name: PropTypes.string,
  /**
   * The type of label.
   */
  largeType: PropTypes.oneOf(['large', 'mobile', 'small']),
  /**
   * Use `value` for controlled Inputs. For uncontrolled Inputs, use React's built-in `defaultValue` prop.
   * For input of type `password`, value is required.
   */
  value: PropTypes.string,
  /**
   * A callback function to handle changes. For input with `value`, onChange is required.
   */
  onChange: PropTypes.func,
  /**
   * The HTML5 type of the input field.
   */
  type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'search', 'tel', 'url']),
}

Input.defaultProps = {
  required: false,
  disabled: false,
  feedback: undefined,
  hideLabel: false,
  error: undefined,
  feedbackicon: false,
  name: undefined,
  labelType: 'small',
  type: 'text',
  forwardedRef: undefined,
}

const InputWithRef = forwardRef((props, ref) => <Input {...props} forwardedRef={ref} />)

export default InputWithRef
