import React, { forwardRef, useState } from 'react'

import { css } from '@emotion/core'
import PropTypes from 'prop-types'

// pm-kit
import FeedbackIcon from '@pm-kit/feedback-icon'
import { red, parkGreen, greyBlue } from '@pm-kit/colours'
import { size, weight } from '@pm-kit/typography'

// functional components
import generateId from '../../shared/utils/generateId/generateId.js'

// images
import hide from '../../shared/png/hide/hide.png'
import show from '../../shared/png/show/show.png'

export const AUTO_COMPLETE_OPTIONS = [
  'off',
  'on',
  'name',
  'honorific-prefix',
  'given-name',
  'additional-name',
  'family-name',
  'honorific-suffix',
  'nickname',
  'email',
  'username',
  'new-password',
  'current-password',
  'one-time-code',
  'organization-title',
  'organization',
  'street-address',
  'address-line1',
  'address-line2',
  'address-line3',
  'address-level4',
  'address-level3',
  'address-level2',
  'address-level1',
  'country',
  'country-name',
  'postal-code',
  'cc-name',
  'cc-given-name',
  'cc-additional-name',
  'cc-family-name',
  'cc-number',
  'cc-exp',
  'cc-exp-month',
  'cc-exp-year',
  'cc-csc',
  'cc-type',
  'transaction-currency',
  'transaction-amount',
  'language',
  'bday',
  'bday-day',
  'bday-month',
  'bday-year',
  'sex',
  'tel',
  'tel-country-code',
  'tel-national',
  'tel-area-code',
  'tel-local',
  'tel-local-prefix',
  'tel-local-suffix',
  'tel-extension',
  'impp',
  'url',
  'photo',
]

export const FEED_BACK_OPTIONS = ['success', 'error', 'waiting']

export const INPUT_MODE_OPTIONS = ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']

export const LABEL_TYPE_OPTIONS = ['large', 'small', 'hidden']

export const TYPE_OPTIONS = ['text', 'number', 'password', 'email', 'search', 'tel', 'url']

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
  font-size: ${size.bodySmall};
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
  autoComplete,
  disabled,
  disableUnmasking,
  error,
  feedback,
  feedbackicon,
  forwardedRef,
  id,
  inputMode,
  label,
  labelType,
  name,
  onChange,
  required,
  styles,
  type,
  value,
  ...rest
}) => {
  const [display, setDisplay] = useState(false)
  const inputId = generateId(id, name, label)

  const containerArr = [inputWrapper]
  const eyeButtonArr = [eyeButton]
  const feedbackIconWrapperArr = [feedbackIconWrapper]
  const inputAndFeedbackWrapperArr = [inputAndFeedbackWrapper]
  const inputFieldArr = [inputField]
  const labelContainerArr = [labelContainer]
  const passwordInputWrapperArr = [passwordInputWrapper]

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
    eyeButtonArr.push(styles.eyeButtonStyle)
    feedbackIconWrapperArr.push(styles.feedbackIconStyle)
    inputAndFeedbackWrapperArr.push(styles.inputAndFeedbackWrapperStyle)
    labelContainerArr.push(styles.labelStyle)
    if (type === 'password') {
      passwordInputWrapperArr.push(styles.inputStyle)
    } else {
      inputFieldArr.push(styles.inputStyle)
    }
  }

  /**
   * this is a workaround for a bug in chrome that moves
   * the cursor into a wrong position if prepended with a space
   */
  const handleKeyDown = e => {
    if (type === 'email' && e.key === ' ') {
      e.preventDefault()
    }
  }

  const renderAutoComplete = (type, autoComplete) => {
    if (!autoComplete && (type === 'email' || type === 'url')) {
      return type
    }
    return autoComplete
  }

  const renderInputMode = (type, inputMode) => {
    if (inputMode) {
      return inputMode
    }
    if (type === 'number') {
      return 'decimal'
    }
    if (type === 'password') {
      return 'text'
    }
    return type
  }

  const renderLabel = (label, required, disabled) => {
    const labelText = `${label}${required ? true && '*' : ''}`
    return (
      <label css={disabled ? isDisabled : null} htmlFor={inputId.identity()}>
        {labelText}
      </label>
    )
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
          {feedback === 'error' && error && <span css={feedbackError}>{error}</span>}
        </div>
      )}
      <div css={inputAndFeedbackWrapperArr}>
        {type === 'password' ? (
          <div css={passwordInputWrapperArr}>
            <input
              aria-invalid={feedback}
              aria-label={label}
              autoComplete={renderAutoComplete(type, autoComplete)}
              css={passwordInput}
              disabled={disabled}
              id={inputId.identity()}
              inputMode={renderInputMode(type, inputMode)}
              name={name}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              ref={forwardedRef}
              type={!disableUnmasking && display ? 'text' : 'password'}
              value={value}
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
            aria-invalid={feedback === 'error'}
            aria-label={label}
            autoComplete={renderAutoComplete(type, autoComplete)}
            css={inputFieldArr}
            disabled={disabled}
            feedback={feedback}
            id={inputId.identity()}
            inputMode={renderInputMode(type, inputMode)}
            name={name}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            ref={forwardedRef}
            type={type}
            value={value}
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

Input.propTypes = {
  /**
   * Provides suggestion for user's input.
   */
  autoComplete: PropTypes.oneOf(AUTO_COMPLETE_OPTIONS),
  /**
   * Specifies if the Input field should be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Controls whether the option of unmask password be given or not.
   */
  disableUnmasking: PropTypes.bool,
  /**
   * An error message. Should be limited to text and links. See usage criteria for more details.
   */
  error: PropTypes.string,
  /**
   * A feedback state.
   */
  feedback: PropTypes.oneOf(FEED_BACK_OPTIONS),
  /**
   * Control whether to dispaly feedback-icon or not.
   */
  feedbackicon: PropTypes.bool,
  /**
   * Overrides the mobile keyboard specified by input's type attribute.
   */
  inputMode: PropTypes.oneOf(INPUT_MODE_OPTIONS),
  /**
   * The label.
   */
  label: PropTypes.string.isRequired,
  /**
   * The type of label to display.
   */
  labelType: PropTypes.oneOf(LABEL_TYPE_OPTIONS),
  /**
   * The name.
   */
  name: PropTypes.string,
  /**
   * A callback function to handle changes. For input with `value`, onChange is required.
   */
  onChange: PropTypes.func,
  /**
   * Specifies if Input is a required field.
   */
  required: PropTypes.bool,
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
  /**
   * The HTML5 type of the input field.
   */
  type: PropTypes.oneOf(TYPE_OPTIONS),
  /**
   * Use `value` for controlled Inputs. For uncontrolled Inputs, use React's built-in `defaultValue` prop.
   * For input of type `password`, value is required.
   */
  value: PropTypes.string,
}

Input.defaultProps = {
  autoComplete: undefined,
  disabled: false,
  disableUnmasking: false,
  error: undefined,
  feedback: undefined,
  feedbackicon: false,
  forwardedRef: undefined,
  inputMode: undefined,
  labelType: 'small',
  name: undefined,
  onChange: () => {},
  required: false,
  styles: {},
  type: 'text',
}

const InputWithRef = forwardRef((props, ref) => <Input {...props} forwardedRef={ref} />)

export default InputWithRef
