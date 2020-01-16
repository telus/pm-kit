import React, { useState } from 'react'
import Radio from './Radio'
import { css } from '@emotion/core'

export default {
  title: 'Design System|Radio',
  component: Radio,
}

export const Default = () => {
  const [clicked, setClicked] = useState('en')

  const handleSelectOption = en_ => {
    setClicked(en_)
  }

  const radioButtonContainer = css`
    margin-top: 10px;
  `

  return (
    <>
      <Radio
        checked={clicked === 'en'}
        label="English"
        name="prefLang1"
        onChange={() => {
          handleSelectOption('en')
        }}
        value={false}
      />
      <div css={radioButtonContainer}>
        <Radio
          id="2"
          checked={clicked === 'fr'}
          label="French"
          name="prefLang2"
          onChange={() => {
            handleSelectOption('fr')
          }}
          value={true}
        />
      </div>
    </>
  )
}
