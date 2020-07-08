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
  type,
  disableUnmasking,
  styles,
  forwardedRef,
  ...rest
}) => {
  const [display, setDisplay] = useState(false)
  const inputId = generateId(id, name, label)

  const containerArr = [inputWrapper]
  const labelContainerArr = [labelContainer]
  const inputAndFeedbackWrapperArr = [inputAndFeedbackWrapper]
  const inputFieldArr = [inputField]
  const passwordInputWrapperArr = [passwordInputWrapper]
  const eyeButtonArr = [eyeButton]
  const feedbackIconWrapperArr = [feedbackIconWrapper]

  if (labelType === 'large') {
    labelContainerArr.push(largeLabelContainer)
  }

  if (feedback === 'error') {
    if (type === 'password') {
      passwordInputWrapperArr.push(inputFieldWithError)
    } else {
      inputFieldArr.push(inputFieldWithError)
    }
  }

  if (styles) {
    containerArr.push(styles.containerStyle)
    labelContainerArr.push(styles.labelStyle)
    inputAndFeedbackWrapperArr.push(styles.inputAndFeedbackWrapperStyle)
    eyeButtonArr.push(styles.eyeButtonStyle)
    feedbackIconWrapperArr.push(styles.feedbackIconStyle)
    if (type === 'password') {
      passwordInputWrapperArr.push(styles.inputStyle)
    } else {
      inputFieldArr.push(styles.inputStyle)
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
    <div css={containerArr}>
      {labelType !== 'hidden' && (
        <div css={labelContainerArr}>
          {label && renderLabel(label, required, disabled)}
          {feedback === 'error' && error && renderFeedback(error)}
        </div>
      )}
      <div css={inputAndFeedbackWrapperArr}>
        {type === 'password' ? (
          <div css={passwordInputWrapperArr}>
            <input
              aria-invalid={feedback}
              aria-label={label}
              css={passwordInput}
              id={inputId.identity()}
              name={name}
              onKeyDown={handleKeyDown}
              type={!disableUnmasking && display ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              disabled={disabled}
              ref={forwardedRef}
              {...rest}
            />
            {!disableUnmasking && (
              <button css={eyeButtonArr} onClick={showPassword}>
                <img css={eyeImage} src={display ? hide : show} alt="show password" />
              </button>
            )}
          </div>
        ) : (
          <input
            css={inputFieldArr}
            aria-invalid={feedback === 'error'}
            aria-label={label}
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
          <div css={feedbackIconWrapperArr}>
            <FeedbackIcon state={!feedback ? 'disabled' : feedback} size="24px" />
          </div>
        )}
      </div>
    </div>
  )
}

const InputWithRef = forwardRef((props, ref) => <Input {...props} forwardedRef={ref} />)

InputWithRef.propTypes = {
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
   * The type of label to display.
   */
  labelType: PropTypes.oneOf(['large', 'small', 'hidden']),
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
  /**
   * Controls whether the option of unmask password be given or not.
   */
  disableUnmasking: PropTypes.bool,
  /**
   * Customizes the input according to your needs.
   * Accepts an object of styles in the structure below.
   * {
   *  containerStyle:{},
   *  inputStyle: {}
   *  labelStyle:{},
   *  inputAndFeedbackWrapperStyle: {},
   *  eyeButtonStyle: {},
   *  feedbackIconStyle: {},
   * }
   */
  styles: PropTypes.object,
}

InputWithRef.defaultProps = {
  required: false,
  disabled: false,
  feedback: undefined,
  error: undefined,
  feedbackicon: false,
  name: undefined,
  labelType: 'small',
  type: 'text',
  forwardedRef: undefined,
  disableUnmasking: false,
  styles: {},
}

export default InputWithRef
