import React, { useState } from 'react'
import Checkbox from './Checkbox'
import { withKnobs, select } from '@storybook/addon-knobs'

export default {
  title: 'Design System|Checkbox',
  component: Checkbox,
  decorators: [withKnobs],
}

export const Default = () => {
  const [checked, setChecked] = useState(true)

  const updateCheck = () => {
    setChecked(!checked)
    return checked
  }
  return (
    <Checkbox
      label="Testing"
      name="Test"
      value={true}
      onChange={updateCheck}
      checked={checked}
      feedback="success"
      error="This field is required"
    />
  )
}

export const CheckboxWithError = () => {
  const [checked, setChecked] = useState(false)

  const updateCheck = () => {
    setChecked(!checked)
    return checked
  }
  return (
    <Checkbox
      label="Testing"
      name="Test"
      value={true}
      onChange={updateCheck}
      checked={checked}
      //   feedback={checked ? 'success' : 'error'}
      feedback="error"
      error="This field is required"
    />
  )
}

export const Playground = () => {
  const [checked, setChecked] = useState(false)

  const updateCheck = () => {
    setChecked(!checked)
    return checked
  }

  return (
    <Checkbox
      label="Testing"
      name="Test"
      value={true}
      onChange={updateCheck}
      checked={checked}
      feedback={select('feedback', ['error', 'success'])}
      error="This field is required"
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
