import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { red, parkGreen, greyBlue, white } from '@pm-kit/colours'
import checkmark from '../../shared/svg/checkmark.svg'
import exclamation from '../../shared/svg/exclamation.svg'
import generateId from '../../shared/utils/generateId/generateId.js'

const InputField = styled.input`
  width: 100%;
  padding: 0 16px;
  font-size: 18px;
  border: 1px solid ${({ feedback }) => (feedback === 'error' ? red : parkGreen)};
  border-radius: 8px;
  height: 48px;
  color: ${parkGreen};
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &::placeholder {
    color: ${greyBlue};
    font-size: 16px;
  }
`

const FeedbackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 8px;
  right: -50px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${({ feedback }) => (feedback === 'error' ? red : parkGreen)};
  background-color: ${({ feedback }) => (feedback === 'error' ? red : white)};
`

const labelContainer = css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 0 0 0.5rem 0.2rem;
  color: ${parkGreen};
  font-size: 18px;
  font-weight: 500;
  & label {
    margin-right: 0.5rem;
  }
`

const smallLabelContainer = css`
  ${labelContainer}
  font-size: 14px;
  font-weight: 300;
  margin-left: 16px;
`

const feedbackError = css`
  color: ${red};
  font-weight: 300;
`

export const Input = ({
  variant,
  disabled,
  id,
  name,
  value,
  label,
  required,
  small,
  feedback,
  error,
  feedbackicon,
  hideLabel,
  forwardedRef,
  ...rest
}) => {
  const inputId = generateId(id, rest.name, label)
  const renderLabel = (label, required, disabled) => {
    const labelText = `${label}${required ? true && '*' : ''}`
    return disabled ? (
      <label style={{ opacity: 0.5 }} htmlFor={inputId.identity()}>
        {labelText}
      </label>
    ) : (
      <label htmlFor={inputId.identity()}>{labelText}</label>
    )
  }

  const renderFeedback = errorMessage => <span css={feedbackError}>{`(${errorMessage})`}</span>

  const renderFeedbackIcon = feedback => {
    return (
      <FeedbackIcon feedback={feedback}>
        <img src={feedback === 'error' ? exclamation : checkmark} alt={feedback} />
      </FeedbackIcon>
    )
  }

  return (
    <div>
      {!hideLabel && (
        <div css={small ? smallLabelContainer : labelContainer}>
          {label && renderLabel(label, required, disabled)}
          {feedback === 'error' && error && renderFeedback(error)}
        </div>
      )}
      <div style={{ position: 'relative' }}>
        {feedbackicon && feedback !== undefined && renderFeedbackIcon(feedback)}
        <InputField
          ref={forwardedRef}
          aria-invalid={feedback === 'error'}
          aria-label={hideLabel ? label : null}
          feedback={feedback}
          disabled={disabled}
          id={inputId.identity()}
          name={name}
          {...rest}
        />
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
  feedback: PropTypes.oneOf(['success', 'error']),
  /**
   * Specifies if the label of Input field should be hidden.
   */
  hideLabel: PropTypes.bool,
  /**
   * An error message. Should be limited to text and links. See usage criteria for more details.
   */
  error: PropTypes.string,
  /**
   * A success or error image to correspond with feedback.
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
}

const InputWithRef = forwardRef((props, ref) => <Input {...props} forwardedRef={ref} />)

export default InputWithRef
