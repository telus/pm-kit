import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { parkGreen, red } from '@pm-kit/colours'
import Paragraph from '@pm-kit/paragraph'
import { size, weight } from '@pm-kit/typography'

import { motion, AnimatePresence } from 'framer-motion'

import generateId from '../../shared/utils/generateId/generateId.js'

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
  ${fakeCheckbox};
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

const styledLabel = css`
  display: flex;
`

const labelText = css`
  margin-left: 12px;
`

const checkVariants = {
  hidden: { scale: 0 },
  show: { scale: 0.6 },
  transition: {
    duration: 0.5,
  },
}

export const Checkbox = ({
  error,
  feedback,
  label,
  name,
  value,
  id,
  onChange,
  checked,
  styles,
  forwardedRef,
  ...rest
}) => {
  const inputId = generateId(id, rest.name, label)
  const checkboxContainer = [fakeCheckbox]
  const labelContainer = [labelText]

  if (checked) {
    checkboxContainer.push(checkedFakeCheckbox)
  }
  if (styles) {
    checkboxContainer.push(styles.checkBoxStyle)
    labelContainer.push(styles.labelStyle)
  }

  return (
    <AnimatePresence>
      <div {...rest}>
        {feedback === 'error' && error && (
          <Paragraph size={size.bodySmall} color={red} css={styles && styles.errorStyle}>{`(${error})`}</Paragraph>
        )}
        <input
          css={hiddenInput}
          type="checkbox"
          value={value}
          id={inputId.identity()}
          name={name}
          onChange={onChange}
          checked={checked}
          ref={forwardedRef}
        />
        <label css={styledLabel} htmlFor={inputId.identity()}>
          <div css={container}>
            <span css={checkboxContainer}>
              <motion.span
                css={fakeCheckboxInner}
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

            <Paragraph css={labelContainer} weight={weight.bold} size={size.bodyLarge}>
              {label}
            </Paragraph>
          </div>
        </label>
      </div>
    </AnimatePresence>
  )
}

Checkbox.propTypes = {
  /**
   * The error message.
   */
  error: PropTypes.string,
  /**
   * The status flag. When "error" is passed in the check box shows error message.
   */
  feedback: PropTypes.oneOf(['error']),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  /**
   * Customizes the checkbox according to your needs.
   * Accepts an object of styles in the structure below.
   * {
   *  errorStyle:{},
   *  checkBoxStyle: {}
   *  labelStyle:{},
   * }
   */
  styles: PropTypes.object,
}

Checkbox.defaultProps = {
  id: undefined,
  error: undefined,
  feedback: undefined,
  onChange: undefined,
  checked: undefined,
  label: '',
  name: '',
  value: true,
  styles: {},
}

const CheckboxWithRef = forwardRef((props, ref) => <Checkbox {...props} forwardedRef={ref} />)

export default CheckboxWithRef
