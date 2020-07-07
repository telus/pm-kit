import React, { useRef, useState } from 'react'
import { withKnobs, text, select, boolean, object } from '@storybook/addon-knobs'

// functional components
import Input, {
  AUTO_COMPLETE_OPTIONS,
  FEED_BACK_OPTIONS,
  INPUT_MODE_OPTIONS,
  LABEL_TYPE_OPTIONS,
  TYPE_OPTIONS,
} from './Input.jsx'

import { version } from './package.json'

export default {
  title: 'Design System|Input',
  component: Input,
  parameters: {
    componentSubtitle: `version ${version}`,
  },
  decorators: [withKnobs],
}

export const Default = () => <Input placeholder="Placeholder" label="Label" />

export const Disabled = () => <Input disabled={true} label="Label" placeholder="Disabled" />

export const Error = () => <Input error="(error)" feedback="error" label="Label" placeholder="Placeholder" />

export const ErrorWithIcon = () => (
  <Input error="(error)" feedback="error" feedbackicon label="Label" placeholder="Placeholder" />
)

export const LargeLabel = () => <Input label="Label" labelType="large" placeholder="Placeholder" />

export const NoLabel = () => <Input label="Label" labelType="hidden" placeholder="Placeholder" />

export const Password = () => {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState('')
  const inputValueChange = e => {
    setInputValue(e.target.value)
  }
  return (
    <Input
      label="Label"
      onChange={inputValueChange}
      placeholder="Placeholder"
      ref={inputRef}
      type="password"
      value={inputValue}
    />
  )
}

export const Playground = () => {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState('')
  const inputValueChange = e => {
    setInputValue(e.target.value)
  }
  return (
    <Input
      autoComplete={select('Auto Complete', AUTO_COMPLETE_OPTIONS)}
      disabled={boolean('Disable Input', false)}
      disableUnmasking={boolean('Disable unmasking Password', false)}
      error={text('Error Message', 'Error')}
      feedback={select('Feedback', FEED_BACK_OPTIONS)}
      feedbackicon={boolean('Feedback Icon', false)}
      inputMode={select('Input mode', INPUT_MODE_OPTIONS, undefined)}
      label={text('Label', 'Label')}
      labelType={select('Label Type', LABEL_TYPE_OPTIONS, 'small')}
      onChange={inputValueChange}
      placeholder={text('Placeholder', 'Placeholder')}
      ref={inputRef}
      required={boolean('Required Input', false)}
      styles={object('Styles', {
        containerStyle: {},
        eyeButtonStyle: {},
        feedbackIconStyle: {},
        inputStyle: {},
        inputAndFeedbackWrapperStyle: {},
        labelStyle: {},
      })}
      type={select('Type', TYPE_OPTIONS)}
      value={inputValue}
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
