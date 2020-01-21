import React, { useState } from 'react'
import Radio from './Radio'
import { css } from '@emotion/core'

export default {
  title: 'Design System|Radio',
  component: Radio,
}

export const Default = () => {
  const [clicked, setClicked] = useState('en')

  const handleSelectOption = e => {
    setClicked(e.target.value)
  }

  const radioButtonContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 105px;
  `

  return (
    <div css={radioButtonContainer}>
      <Radio checked={clicked === 'en'} label="English" name="prefLang" onChange={handleSelectOption} value="en" />
      <Radio checked={clicked === 'fr'} label="French" name="prefLang" onChange={handleSelectOption} value="fr" />
    </div>
  )
}
