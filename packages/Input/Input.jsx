import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { red, parkGreen, greyBlue, white } from '@pm-kit/colours'
import checkmark from './svg/checkmark.svg'
import exclamation from './svg/exclamation.svg'
import generateId from './generateId.js'

const InputField = styled.input`
  width: 100%;
  padding: 0 1em;
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

const labelStyle = css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 0 0 0.5rem 0.2rem;
  font-size: 18px;
  color: ${parkGreen};
  & label {
    letter-spacing: 0.05px;
    font-weight: 500;
    margin-right: 0.5rem;
  }
  & span {
    letter-spacing: 0.05px;
    font-weight: 100;
    font-size: 14px;
  }
`
const feedbackError = css`
  font-weight: 500;
  color: ${red};
  & span {
    font-size: 14px;
    font-weight: 100;
    letter-spacing: 0.05px;
    margin: 0 0 0 1rem;
  }
`

/**
 * @version ./package.json
 */

const Input = forwardRef(
  (
    { variant, disabled, id, name, value, label, required, small, feedback, error, feedbackicon, hideLabel, ...rest },
    ref
  ) => {
    const inputId = generateId(label).identity()
    const renderLabel = (label, required) => {
      const labelText = `${label}${required ? true && '*' : ''}`
      return (
        <label htmlFor={inputId}>
          {small && <span>{labelText}</span>}
          {!small && labelText}
        </label>
      )
    }

    const renderFeedback = errorMessage => (
      <div css={feedbackError}>{small ? <span>{`(${errorMessage})`}</span> : `(${errorMessage})`}</div>
    )

    const renderFeedbackIcon = feedback => {
      return (
        <FeedbackIcon feedback={feedback}>
          <img src={feedback === 'error' ? exclamation : checkmark} alt={feedback} />
        </FeedbackIcon>
      )
    }

    return (
      <div style={{ width: '50%' }}>
        {!hideLabel && (
          <div css={labelStyle}>
            {label && renderLabel(label, required)}
            {feedback === 'error' && error && renderFeedback(error)}
          </div>
        )}
        <div style={{ position: 'relative' }}>
          {feedbackicon && feedback !== undefined && renderFeedbackIcon(feedback)}
          <InputField
            aria-invalid={feedback === 'error'}
            aria-label={hideLabel ? label : null}
            feedback={feedback}
            disabled={disabled}
            id={inputId}
            name={name}
            {...rest}
          />
        </div>
      </div>
    )
  }
)

Input.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  feedback: PropTypes.oneOf(['success', 'error']),
  hideLabel: PropTypes.bool,
  error: PropTypes.string,
  feedbackicon: PropTypes.bool,
  name: PropTypes.string,
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

export default Input
