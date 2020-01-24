import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { red, parkGreen, greyBlue } from '@pm-kit/colours'
import generateId from '../../shared/utils/generateId/generateId.js'
import FeedbackIcon from '@pm-kit/feedback-icon'
import { size, weight } from '@pm-kit/typography'

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

const inputFieldWithError = css`
  border-color: ${red};
`

const wrapper = css`
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

export const Input = ({
  disabled,
  id,
  name,
  value,
  label,
  required,
  largeLabel,
  feedback,
  error,
  feedbackicon,
  hideLabel,
  forwardedRef,
  ...rest
}) => {
  const inputId = generateId(id, rest.name, label)
  const labelContainerStyle = [labelContainer]
  const inputStyle = [inputField]
  if (largeLabel) {
    labelContainerStyle.push(largeLabelContainer)
  }

  if (feedback === 'error') {
    inputStyle.push(inputFieldWithError)
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

  return (
    <div>
      {!hideLabel && (
        <div css={labelContainerStyle}>
          {label && renderLabel(label, required, disabled)}
          {feedback === 'error' && error && renderFeedback(error)}
        </div>
      )}
      <div css={wrapper}>
        <input
          css={inputStyle}
          ref={forwardedRef}
          aria-invalid={feedback === 'error'}
          aria-label={hideLabel ? label : null}
          feedback={feedback}
          disabled={disabled}
          id={inputId.identity()}
          name={name}
          {...rest}
        />
        {feedbackicon && feedback && (
          <div css={feedbackIconWrapper}>
            <FeedbackIcon
              state={feedback === 'error' ? 'failed' : feedback === 'success' ? 'passed' : 'waiting'}
              size="24px"
            />
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
   * Use `value` for controlled Inputs. For uncontrolled Inputs, use React's built-in `defaultValue` prop.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Controls the size of label.
   */
  largeLabel: PropTypes.bool,
}

Input.defaultProps = {
  required: false,
  disabled: false,
  feedback: undefined,
  hideLabel: false,
  error: undefined,
  feedbackicon: false,
  name: undefined,
  value: undefined,
  largeLabel: false,
}

const InputWithRef = forwardRef((props, ref) => <Input {...props} forwardedRef={ref} />)

export default InputWithRef
