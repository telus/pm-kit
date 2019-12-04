import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { parkGreen, red } from '../colours/colours'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * @version ./package.json
 */

const container = css`
  display: flex;
  align-items: center;
  width: 100% !important;

  height: 100% !important;

  left: 0 !important;

  top: 0 !important;
`

const fakeCheckbox = css`
  height: 15px;
  width: 15px;
  min-height: 20px;
  min-width: 20px;
  outline: 0;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 0.125rem;
  border: 2px solid ${parkGreen};
  border-radius: 6px;
`

const checkedFakeCheckbox = css`
  height: 15px;
  width: 15px;
  min-height: 20px;
  min-width: 20px;
  outline: 0;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 0.125rem;
  border: 2px solid ${parkGreen};
  border-radius: 6px;
  background-color: ${parkGreen};
`

const fakeCheckboxInner = css`
  & > svg {
    & path {
      stroke: white;
    }
  }
`

const hiddenInput = css`
  position: fixed;
  opacity: 0;
  pointer-events: none;
`

const image = css`
  height: 15px;
  width: 15px;
`

const feedbackError = css`
  font-weight: 500;
  color: ${red};
`
const styledLabel = css`
  display: flex;
`

const labelText = css`
  font-weight: bold;
  margin-left: 12px;
`

const label_ = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 52px;
  font-size: 14px;
  & label {
    letter-spacing: 0.05px;
    margin-right: 0.5rem;
  }
`

const checkVariants = {
  hidden: { scale: 0 },
  show: { scale: 0.6 },
  transition: {
    duration: 0.5,
  },
}

export const Checkbox = (
  { error, feedback, label, name, value, id, onChange, checked, forwardedRef, ...rest },
  ref
) => {
  const styles = {
    labelStyles: label_,
    hiddenInputStyles: hiddenInput,
    styledLabelStyles: styledLabel,
    containerStyles: container,
    fakeCheckboxStyles: fakeCheckbox,
    checkedFakeCheckboxStyles: checkedFakeCheckbox,
    fakeCheckboxInnerStyles: fakeCheckboxInner,
    labelTextStyles: labelText,
    feedbackErrorStyles: feedbackError,
    imageStyles: image,
  }
  //   const inputId = id || getGeneratedId(name, value)
  const renderFeedback = errorMessage => <span css={styles.feedbackErrorStyles}>{`(${errorMessage})`}</span>
  return (
    <AnimatePresence>
      <div {...rest}>
        <div css={styles.labelStyles}>{feedback === 'error' && error && renderFeedback(error)}</div>
        <input
          css={styles.hiddenInputStyles}
          type="checkbox"
          value={value}
          id={1}
          name={name}
          onChange={onChange}
          checked={checked}
          ref={forwardedRef}
        />
        <label css={styles.styledLabelStyles} htmlFor={1}>
          <div css={styles.containerStyles}>
            <span css={checked ? styles.checkedFakeCheckboxStyles : styles.fakeCheckboxStyles}>
              <motion.span
                css={styles.fakeCheckboxInnerStyles}
                variants={checkVariants}
                animate={checked ? 'show' : 'hidden'}
                exit={{ opacity: 0 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17">
                  <path
                    fill="none"
                    fillRule="evenodd"
                    stroke="#034045"
                    strokeWidth="4"
                    d="M18.031 1.866L7.154 13.442l-5.37-5.944"
                  />
                </svg>
              </motion.span>
            </span>

            <span css={styles.labelTextStyles}>{label}</span>
          </div>
        </label>
      </div>
    </AnimatePresence>
  )
}

Checkbox.propTypes = {
  error: PropTypes.string,
  feedback: PropTypes.oneOf(['success', 'error']),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
}

Checkbox.defaultProps = {
  id: undefined,
  error: undefined,
  feedback: undefined,
  onChange: undefined,
  checked: undefined,
  label: '',
  name: '',
  value: '',
}

const CheckboxWithRef = forwardRef((props, ref) => <Checkbox {...props} forwardedRef={ref} />)

export default CheckboxWithRef
