import React from 'react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import Input from './Input.jsx'

export default {
  title: 'Input',
  decorators: [withKnobs],
}

export const Default = () => <Input placeholder="Placeholder" label="Label" />

export const SmallLabel = () => <Input placeholder="Placeholder" label="Label" small />

export const Error = () => <Input placeholder="Placeholder" label="Label" feedback="error" error="error" />

export const ErrorWithIcon = () => (
  <Input placeholder="Placeholder" label="Label" feedback="error" error="error" feedbackicon />
)

export const Disabled = () => <Input disabled={true} placeholder="Disabled" label="Label" />

export const Playground = () => (
  <Input
    label={text('Label', 'Label')}
    placeholder={text('Placeholder', 'Placeholder')}
    error={text('Error Message', 'Error')}
    feedback={select('Feedback', ['success', 'error'])}
    small={boolean('Small Label', false)}
    feedbackicon={boolean('Feedback Icon', false)}
    required={boolean('Required Input', false)}
    disabled={boolean('Disable Input', false)}
    hideLabel={boolean('Hide Label', false)}
  />
)

Playground.story = {
  name: 'playground',
}
