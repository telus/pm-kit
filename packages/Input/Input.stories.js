import React from 'react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import Input from './Input.jsx'
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

export const LargeLabel = () => <Input placeholder="Placeholder" label="Label" largeLabel={true} />

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
    feedback={select('Feedback', [undefined, 'success', 'error', 'waiting'])}
    largeLabel={boolean('large Label', false)}
    feedbackicon={boolean('Feedback Icon', false)}
    required={boolean('Required Input', false)}
    disabled={boolean('Disable Input', false)}
    hideLabel={boolean('Hide Label', false)}
  />
)

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
