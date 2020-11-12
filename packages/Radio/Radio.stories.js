import React, { useState } from 'react'
import Radio from './Radio'
import { css } from '@emotion/core'
import { Input } from '../Input/Input'
// export default {
//   title: 'Design System|Radio',
//   component: Radio,
// }

export const Default = () => {
  const [clicked, setClicked] = useState('en')

  const handleSelectOption = (e) => {
    setClicked(e.target.value)
  }
  const inputValueChange = (e) => {
    setInputValue(e.target.value)
  }
  const [inputValue, setInputValue] = useState('')

  const radioButtonContainer = css`
    display: flex;
    flex-direction: column;

    > * :not(last-child) {
      margin-bottom: 10px;
    }
  `

  return (
    <div css={radioButtonContainer}>
      <Radio checked={clicked === 'en'} label="English" name="prefLang" value="en" onChange={handleSelectOption} />
      <Radio checked={clicked === 'fr'} label="French" name="prefLang" value="fr" onChange={handleSelectOption} />
      <Input
        placeholder="Placeholder"
        label="Label"
        type="password"
        value={inputValue}
        onChange={inputValueChange}
        alt="password"
      />
    </div>
  )
}

export const Alternative = () => {
  const [clickedAlt, setClickedAlt] = useState('yes')

  const handleSelectOptionAlt = (e) => {
    setClickedAlt(e.target.value)
  }

  const radioButtonContainerAlt = css`
    display: flex;
    flex-direction: column;

    > * :not(last-child) {
      margin-bottom: 10px;
    }
  `

  return (
    <div css={radioButtonContainerAlt}>
      <Radio
        checked={clickedAlt === 'yes'}
        label="Yes"
        name="bool"
        onChange={handleSelectOptionAlt}
        value="yes"
        type="alternative"
      />
      <Radio
        checked={clickedAlt === 'no'}
        label="No"
        name="alternative"
        onChange={handleSelectOptionAlt}
        value="no"
        type="alternative"
      />
    </div>
  )
}

export const Disabled = () => {
  const [clickedAltDisabled, setClickedAltDisabled] = useState()

  const handleSelectOptionAltDisabled = (e) => {
    setClickedAltDisabled(e.target.value)
  }

  const radioButtonContainerAltDisabled = css`
    display: flex;
    flex-direction: column;

    > * :not(last-child) {
      margin-bottom: 10px;
    }
  `

  return (
    <div css={radioButtonContainerAltDisabled}>
      <Radio
        checked={clickedAltDisabled === 'disabled'}
        label="Disabled"
        name="disabled"
        onChange={handleSelectOptionAltDisabled}
        value="disabled"
        type="alternative"
        disabled
      />
    </div>
  )
}
