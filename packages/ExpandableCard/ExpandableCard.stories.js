import React from 'react'
import { withKnobs, text, array } from '@storybook/addon-knobs'
import ExpandableCard from './ExpandableCard'
import { version } from './package.json'

export default {
  title: 'Design System|ExpandableCard',
  component: ExpandableCard,
  parameters: {
    componentSubtitle: `version ${version}`,
  },
  decorators: [withKnobs],
}
var details = ['Detail 1', 'Detail 2', 'Detail 3', 'Detail 4']

export const Primary = () => {
  return (
    <ExpandableCard
      details={details}
      title="Default Title"
      subtitle="Default Subtitle"
      selectedText="Card Selected"
      unSlectedText="Select Card"
    />
  )
}

export const Playground = () => (
  <ExpandableCard
    title={text('Title', 'Default Title')}
    subtitle={text('Subtitle', 'Default Subtitle')}
    selectedText={text('Selected Text', 'Card Selected')}
    unSlectedText={text('Unselceted Text', 'Select Card')}
    details={array('Details', ['Detail 1'], ',')}
  />
)

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
