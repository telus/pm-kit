import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import generateId from '../../shared/utils/generateId/generateId.js'
import {
  parkGreen,
  softSandBrown,
  lilyGreen,
  lightTan,
  midnightGreen,
  forestFog,
  seafoam,
  birch,
} from '@pm-kit/colours'
import { motion } from 'framer-motion'

// Default Radio Button
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
  &:focus ~ label {
    box-shadow: 0 0 6px 2px #056f78;
  }
`
const basicRadioFake = css`
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

const radioFakeSelected = css`
  border: 2px solid ${softSandBrown};
`

const radioInner = css`
  display: none;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${softSandBrown};
`

const basicLabel = css`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  background-position: right bottom;
  background-color: ${parkGreen};
  width: 100%;

}
`

const labelNotSelected = css`
  &:hover {
    background-color: ${lilyGreen};
  }
  background-color: ${lightTan};
`

const labelSelected = css`
  &:hover {
    background-color: ${midnightGreen};
  }
  background-color: ${parkGreen};
  color: ${softSandBrown};
`

const labelText = css`
  margin-left: 1rem;
  font-size: 1em;
  font-weight: 700;
`

// Alternative Radio Button
const basicRadioFakeAlt = css`
  ${basicRadioFake}
  border: 2px solid ${parkGreen};
`

const basicLabelAlt = css`
  ${basicLabel}
  background-color: ${parkGreen};
`

const labelNotSelectedAlt = css`
  &:hover {
    background-color: ${birch};
  }
  background-color: ${forestFog};
`
const labelSelectedAlt = css`
  :hover {
    background-color: ${lilyGreen};
  }
  background-color: ${seafoam};
  color: ${parkGreen};
`
const radioFakeSelectedAlt = css`
  border: 2px solid ${parkGreen};
`
const radioInnerAlt = css`
  ${radioInner}
  background-color: ${parkGreen};
`

// Disabled Radio Button
const labelNotSelectedAltDisabled = css`
  ${labelNotSelectedAlt}
  opacity: 0.5;
  :hover {
    background-color: ${forestFog};
  }
  cursor: not-allowed;
`
const radioFakeSelectedAltDisabled = css`
  ${basicRadioFakeAlt}
  cursor: not-allowed;
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
  type,
  forwardedRef,
  onChange,
  disabled,
  keyboardAccessibility,
  ...rest
}) => {
  const radioId = generateId(id, rest.name, label)
  const radioFakeStyle = [basicRadioFake]
  const labelStyle = [basicLabel, labelNotSelected]
  const radioFakeStyleAlt = [basicRadioFakeAlt]
  const labelStyleAlt = [basicLabelAlt, labelNotSelectedAlt]

  if (checked) {
    if (type === 'alternative') {
      labelStyleAlt.push(labelSelectedAlt)
      radioFakeStyleAlt.push(radioFakeSelectedAlt)
    } else {
      labelStyle.push(labelSelected)
      radioFakeStyle.push(radioFakeSelected)
    }
  } else if (disabled) {
    labelStyleAlt.push(labelNotSelectedAltDisabled)
    radioFakeStyleAlt.push(radioFakeSelectedAltDisabled)
  }

  const labelVariant = {
    whileTap: {
      scale: 0.96,
    },
  }

  return (
    <motion.div>
      <input
        checked={checked}
        css={radio}
        data-testid="hidden-input"
        id={radioId.identity()}
        name={name}
        type="radio"
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />

      <motion.label
        css={type === 'alternative' ? labelStyleAlt : labelStyle}
        data-testid="checkbox-label"
        htmlFor={radioId.identity()}
        variants={disabled ? '' : labelVariant}
        transition={disabled ? '' : { duration: 0.6 }}
      >
        <div css={type === 'alternative' ? radioFakeStyleAlt : radioFakeStyle} data-testid="fake-input">
          <span css={type === 'alternative' ? radioInnerAlt : radioInner} />
        </div>
        <span css={labelText}>{label}</span>
      </motion.label>
    </motion.div>
  )
}

const RadioWithRef = forwardRef((props, ref) => <Radio {...props} forwardedRef={ref} />)

RadioWithRef.propTypes = {
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
   * Control the type of the component
   */
  type: PropTypes.oneOf(['default', 'alternative']),
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
   * Disabled state.
   */
  disabled: PropTypes.bool,
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
  onChange: PropTypes.func,
  keyboardAccessibility: PropTypes.func,
}

RadioWithRef.defaultProps = {
  variant: 'borderless',
  type: 'default',
  disabled: false,
  description: undefined,
  feedback: undefined,
  error: undefined,
  checked: undefined,
  label: '',
  id: undefined,
  onChange: undefined,
  keyboardAccessibility: undefined,
}

Radio.displayName = 'Radio'

export default RadioWithRef
