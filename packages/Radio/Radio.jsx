import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import generateId from '../../shared/utils/generateId/generateId.js'
import { parkGreen, softSandBrown, lilyGreen, lightTan, greyBlue } from '@pm-kit/colours'
import { motion } from 'framer-motion'

const radio = css`
  opacity: 0;
  position: fixed;
  pointer-events: none;
  &:checked ~ label > div {
    background-color: initial;
  }
  &:checked ~ label > div > span {
    display: block;
  }
`
const radioFake = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  min-height: 17px;
  min-width: 17px;
  margin-top: -2px;
  outline: 0;
  line-height: 0;
  border-radius: 50%;
  border: 2px solid ${parkGreen};
  cursor: pointer;
  transition: border-color 0.1s linear, background-color 0.1s linear;
`
const radioInner = css`
  display: none;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${softSandBrown};
`

const labelStyle = css`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  background-position: right bottom;
  transition: all 0.4s ease;
  background-color: ${parkGreen};
  width: 100%;
  &:hover {
    background-color: ${lilyGreen};
  }
`

const labelNotSelected = css`
  background-color: ${lightTan};
`

const labelAnimation = css`
  background: linear-gradient(to right, ${parkGreen} 50%, #f4e8d9 50%);
  background-size: 200% 100%;
  background-position: left bottom;
  color: ${softSandBrown};
  opacity: 1;
  /* :hover {
    background: linear-gradient(to right, ${greyBlue} 50%, ${greyBlue} 50%);
  } */
`
const radioFakeUpdated = css`
  border: 2px solid ${softSandBrown};
`
const labelText = css`
  margin-left: 1rem;
  font-size: 1em;
  font-weight: 700;
`

export const Radio = ({
  checked,
  description,
  error,
  feedback,
  id,
  label,
  name,
  value,
  variant,
  forwardedRef,
  ...rest
}) => {
  const radioId = generateId(id, rest.name, label)
  const radioFakeStyle = [radioFake, radioFakeUpdated]
  const labelNotSelectedStyle = [labelStyle, labelNotSelected]
  const labelAnimationStyle = [labelStyle, labelAnimation]
  const radioVariant = {
    whileTap: {},
  }

  const labeVariant = {
    whileTap: {
      scale: 0.8,
    },
  }

  return (
    <motion.div whileTap="whileTap" variants={radioVariant}>
      <input
        // aria-describedby={feedback === 'error' ? getErrorId(name, value, id) : undefined}
        aria-invalid={feedback === 'error'}
        checked={checked}
        css={radio}
        data-testid="hidden-input"
        id={radioId.identity()}
        name={name}
        // ref={ref}
        type="radio"
        value={value}
        {...rest}
      />
      <label
        css={checked ? labelAnimationStyle : labelNotSelectedStyle}
        data-testid="checkbox-label"
        htmlFor={radioId.identity()}
      >
        <div css={checked ? radioFakeStyle : radioFake} data-testid="fake-input">
          <span css={radioInner} />
        </div>
        <motion.span variants={labeVariant} css={labelText}>
          {label}
        </motion.span>
      </label>
    </motion.div>
  )
}

Radio.propTypes = {
  /**
   * The label.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Associate this radio with a group. Set as the HTML name attribute.
   */
  name: PropTypes.string.isRequired,
  /**
   * Control the appearance of the component
   */
  variant: PropTypes.oneOf(['borderless', 'bordered']),
  /**
   * The value. Must be unique within the group.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  /**
   * Use `checked` for controlled radio. For uncontrolled radio, use React's built-in `defaultChecked` prop.
   * See examples below for more details.
   */
  checked: PropTypes.bool,
  /**
   * Description text below the radio.
   */
  description: PropTypes.string,
  /**
   * The id. Must be unique within the group. If no id is provided, one will be generated in the following format: `name_value`
   */
  id: PropTypes.string,
  /**
   * A feedback state.
   */
  feedback: PropTypes.oneOf(['error']),
  /**
   * An error message.
   */
  error: PropTypes.string,
}

Radio.defaultProps = {
  variant: 'borderless',
  description: undefined,
  feedback: undefined,
  error: undefined,
  checked: undefined,
  label: '',
  name: '',
  value: '',
  id: '1',
}

Radio.displayName = 'Radio'

const RadioWithRef = forwardRef((props, ref) => <Radio {...props} forwardedRef={ref} />)

export default RadioWithRef
