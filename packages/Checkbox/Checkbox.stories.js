import React, { useState } from 'react'
import Checkbox from './Checkbox'
import { select, text, object } from '@storybook/addon-knobs'

// export default {
//   title: 'Design System|Checkbox',
//   component: Checkbox,
//   decorators: [withKnobs],
// }

export const Default = () => {
  const [checked, setChecked] = useState(true)

  const updateCheck = () => {
    setChecked(!checked)
  }
  return (
    <Checkbox
      label="Testing"
      name="Test"
      value={true}
      onChange={updateCheck}
      checked={checked}
      error="This field is required"
    />
  )
}

export const CheckboxWithError = () => {
  const [checked, setChecked] = useState(false)

  const updateCheck = () => {
    setChecked(!checked)
  }
  return (
    <Checkbox
      label="Testing"
      name="Test"
      value={true}
      onChange={updateCheck}
      checked={checked}
      feedback={checked ? undefined : 'error'}
      error="This field is required"
    />
  )
}

export const Playground = () => {
  const [checked, setChecked] = useState(false)

  const updateCheck = () => {
    setChecked(!checked)
  }

  return (
    <Checkbox
      label={text('Label', 'Testing')}
      name="Test"
      value={true}
      onChange={updateCheck}
      checked={checked}
      feedback={select('Feedback', [undefined, 'error'])}
      error={text('Error', 'This field is required')}
      styles={object('Styles', {
        errorStyle: {},
        checkBoxStyle: {},
        labelStyle: {},
      })}
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
