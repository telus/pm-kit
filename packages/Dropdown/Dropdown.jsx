import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Select, { components, createFilter } from 'react-select'
import { motion, AnimatePresence } from 'framer-motion'
import { size, weight } from '@pm-kit/typography'
import { parkGreen, red, lightTan, white } from '@pm-kit/colours'
import FeedbackIcon from '@pm-kit/feedback-icon'
import generateId from '../../shared/utils/generateId/generateId.js'
import failPath from '../../shared/svg/error.svg'

const dropdownWrapper = css`
  width: 100%;
`

const basicLabel = css`
  display: block;
  margin: 0 0 0.2rem 1rem;
  letter-spacing: 0.05px;
  font-size: ${size.bodySmall};
  font-weight: ${weight.normal};
`
const feedbackIconImg = css`
  width: 14px;
  height: 14px;
  margin: 2px 4px 0px 24px;
  align-self: center;
`
const selectStyle = css`
  &: focus-within {
    outline: none;
    background-color: ${white};
    box-shadow: 0 0 6px 2px #056f78;
    border-radius: 8px;
  }
`
const largeLabelStyle = css`
  margin: 0 0 0.5rem 0.2rem;
  font-size: ${size.bodyLarge};
  font-weight: ${weight.bold};
`
const errorFeedback = css`
  margin-left: 0.5rem;
  font-weight: ${weight.normal};
  color: ${red};
  & span {
    color: ${red};
  }
  &: focus-within {
    background-color: ${white};
    outline: none;
    box-shadow: 0 0 8px 1px rgba(194, 53, 43, 0.7);
    border: solid 2px #c2352b;
  }
`
const menuStyling = css`
  margin-top: 4px;
`
const menuList = css`
  overflow: hidden;
`

const placeholder = css`
  color: ${parkGreen};
  font-size: 16px;
`

const dropdownAnimate = {
  hide: {
    height: 0,
    transition: { height: { type: 'tween', duration: 0.2 } },
  },
  show: {
    height: 'auto',
    transition: { height: { type: 'tween', duration: 0.2 } },
  },
}

export const Dropdown = ({
  error,
  feedback,
  id,
  label,
  labelType,
  labelledby,
  onChange,
  options,
  required,
  type,
  value,
  loadingState,
  placeholder,
  ignoreCase,
  ignoreAccents,
  trim,
  matchFrom,
  searchMaxLength,
  styles,
  forwardedRef,
  ...rest
}) => {
  const customDropdownStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: '10px 17px',
      borderBottom: '1px dotted #DDD',
      backgroundColor: state.isFocused ? `${lightTan}` : 'inherit',
      color: `${parkGreen}`,
      fontWeight: state.isSelected ? `${weight.bold}` : `${weight.normal}`,
      fontSize: '1rem',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: `${lightTan}`,
      },
    }),
    control: () => ({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minWidth: '100%',
      height: '48px',
      padding: '0 0 0 7px',
      fontSize: '18px',
      borderRadius: '8px',
      border: `1px solid`,
      borderColor: `${feedback === 'error' ? red : 'initial'}`,
      backgroundColor: `${white}`,
      color: `${parkGreen}`,
      cursor: 'pointer',
    }),
    singleValue: () => ({
      color: `${parkGreen}`,
      marginLeft: '2px',
      marginRight: '2px',
      position: 'absolute',
      top: '50%',
      webkitTransform: 'translateY(-50%)',
      msTransform: 'translateY(-50%)',
      transform: 'translateY(-50%)',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '-webkit-fill-available',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      visibility: 'hidden',
    }),
    dropdownIndicator: (provided) => ({ ...provided, color: `${parkGreen}` }),
    clearIndicator: () => ({
      display: 'none',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: `${parkGreen}`,
    }),
  }

  const selectId = generateId(id, label)
  const filterConfig = {
    ignoreCase,
    ignoreAccents,
    trim,
    matchFrom,
  }
  const labelStyleArr = [basicLabel]
  const selectStyleArr = [selectStyle]
  const dropdownWrapperArr = [dropdownWrapper]
  const feedbackIconImgWrapper = [feedbackIconImg]

  if (feedback === 'error') {
    selectStyleArr.push(errorFeedback)
  }

  if (feedback === 'error') {
    selectStyleArr.push(errorFeedback)
  }

  if (labelType === 'large') {
    labelStyleArr.push(largeLabelStyle)
  }

  if (styles) {
    if (styles.dropdownStyle) {
      dropdownWrapperArr.push(styles.dropdownStyle)
    }
    if (styles.labelStyle) {
      labelStyleArr.push(styles.labelStyle)
    }
  }

  const Input = (props) => {
    return <components.Input {...props} maxLength={searchMaxLength} />
  }

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {loadingState !== 'success' && <FeedbackIcon state={loadingState} />}
      </components.DropdownIndicator>
    )
  }

  return (
    <div css={dropdownWrapperArr}>
      {labelType !== 'hidden' && (
        <div aria-live="assertive" aria-relevant="additions removals" id="errorIdDropDown">
          <label css={labelStyleArr} htmlFor={selectId.identity()}>
            {label}
            {required && '*'}
            {feedback === 'error' && (
              <span css={errorFeedback}>
                <img src={failPath} css={feedbackIconImgWrapper} alt="" /> {error}
              </span>
            )}
          </label>
        </div>
      )}
      <div css={selectStyleArr}>
        <Select
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          id={selectId.identity()}
          type={type}
          styles={customDropdownStyles}
          isClearable={true}
          clearIndicator={false}
          components={{ Menu, Option, SelectContainer, Placeholder, Input, DropdownIndicator }}
          filterOption={createFilter(filterConfig)}
          blurInputOnSelect={false}
          ref={forwardedRef}
          aria-labelledby={labelledby}
          {...rest}
        />
      </div>
    </div>
  )
}

const Menu = ({ children, ...props }) => {
  return (
    <components.Menu {...props} css={menuStyling}>
      <motion.div variants={dropdownAnimate} css={menuList} initial="hide" animate="show" exit="hide">
        {children}
      </motion.div>
    </components.Menu>
  )
}

const Option = ({ children, ...props }) => {
  return <components.Option {...props}>{children}</components.Option>
}

const SelectContainer = ({ children, ...props }) => {
  /**
   * Small bug fix that removes the Menu element completley from the DOM when container is out of focus.
   * This is dependent on ReactSelect and AnimatePresence
   */

  //Initially all children including Control and MenuPlacer
  const nonMenuChildren = [...children]
  const menuChildIndex = children.findIndex((child) => {
    if (child && child.type.name === 'MenuPlacer') {
      return true
    }
    return false
  })

  //Separates MenuPlacer from the rest of the container Children
  let menuChild = null
  if (menuChildIndex >= 0) {
    menuChild = nonMenuChildren.splice(menuChildIndex, 1)
  }

  //Renders all children but only applies Animation to the MenuPlacer
  return (
    <components.SelectContainer {...props}>
      {nonMenuChildren}
      <AnimatePresence>{menuChild}</AnimatePresence>
    </components.SelectContainer>
  )
}

const Placeholder = (props) => {
  return <components.Placeholder css={placeholder} {...props} />
}

const DropdownWithRef = forwardRef((props, ref) => <Dropdown {...props} forwardedRef={ref} />)

DropdownWithRef.propTypes = {
  /**
   * An error message. Should be limited to text and links. See usage criteria for more details.
   */
  error: PropTypes.node,
  /**
   * A feedback state.
   */
  feedback: PropTypes.oneOf(['success', 'error']),
  /**
   * A unique id.
   */
  id: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.string.isRequired,
  /**
   * A function called on picking one of the options.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Dropdown options data
   */
  options: PropTypes.array,
  required: PropTypes.bool,
  /**
   * The HTML5 type of the input field.
   */
  type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'search', 'tel', 'url']),
  /**
   * Use `value` for controlled Inputs. For uncontrolled Inputs, use React's built-in `defaultValue` prop.
   * See examples below for more details.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  /**
   * The order of search. 'start' searches options that begin with your search input and
   * 'any' searches options that contain your search input.
   */
  matchFrom: PropTypes.oneOf(['any', 'start']),
  /**
   * Trim your search input.
   */
  trim: PropTypes.bool,
  /**
   * Ignore accents.
   */
  ignoreAccents: PropTypes.bool,
  /**
   * Ignore Case of your search
   */
  ignoreCase: PropTypes.bool,
  /**
   * Displays large label if true is passed. Otherwise, displays regular sized label.
   */
  labelType: PropTypes.oneOf(['large', 'small', 'hidden']),
  /**
   * Maximum characters you can enter to search for a dropdown input.
   */
  searchMaxLength: PropTypes.number,
  /**
   * Customizes the input according to your needs.
   * Accepts an object of styles in the structure below.
   * {
   *  dropdownStyle:{},
   *  labelStyle:{},
   * }
   */
  styles: PropTypes.object,
  /**
   * Replaces chevron with a feedback icon based on loading state of options.
   */
  loadingState: PropTypes.oneOf(['waiting', 'success', 'error']),
  labelledby: PropTypes.string,
}

DropdownWithRef.defaultProps = {
  error: undefined,
  feedback: undefined,
  id: undefined,
  options: [],
  required: false,
  type: 'text',
  value: undefined,
  matchFrom: 'start',
  trim: true,
  ignoreAccents: true,
  ignoreCase: true,
  labelType: 'small',
  searchMaxLength: 100,
  styles: {},
  loadingState: 'success',
  labelledby: '',
}

export default DropdownWithRef
