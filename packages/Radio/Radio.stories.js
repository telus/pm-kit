import React, { useState } from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import Radio from './Radio'

export default {
  title: 'Design System|Radio',
  component: Radio,
  decorators: [withKnobs],
}

export const Default = () => {
  const [clicked, setClicked] = useState('en')

  const handleSelectOption = en_ => {
    setClicked(en_)
  }

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
    </>
  )
}

export const Playground = () => {
  const [clicked, setClicked] = useState('en')

  const handleSelectOption = en_ => {
    setClicked(en_)
  }

  return (
    <>
      <Radio
        id="1"
        checked={clicked === 'fr'}
        label={text('Label', 'Testing Radio 1')}
        name="prefLang1"
        onChange={() => {
          handleSelectOption('fr')
        }}
        value={true}
      />
      <Radio
        id="2"
        checked={clicked === 'en'}
        label={text('Label', 'Testing Radio 2')}
        name="prefLang2"
        onChange={() => {
          handleSelectOption('en')
        }}
        value={true}
      />
    </>
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
