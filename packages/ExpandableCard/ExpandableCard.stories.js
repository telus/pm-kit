import React from 'react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
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

const selectOptions = {
  selectedText: 'Card Selected',
  unSlectedText: 'Select Card',
}

const placeholderHTML = (
  <p style={{ border: '1px solid' }}>
    CUSTOM
    <br /> CONTENT
  </p>
)

const detailsHtml = <p> SAMPLE DETAIL</p>

export const Primary = () => {
  return <ExpandableCard title="Default Title" subtitle="Default Subtitle" />
}

export const Selectable = () => {
  return <ExpandableCard title="Default Title" subtitle="Default Subtitle" isSelectable={selectOptions} />
}

export const ToggleSelect = () => {
  return <ExpandableCard title="Default Title" subtitle="Default Subtitle" isSelectable={selectOptions} toggle />
}

export const Expandable = () => {
  return (
    <ExpandableCard title="Default Title" subtitle="Default Subtitle" isSelectable={selectOptions}>
      {detailsHtml}
    </ExpandableCard>
  )
}

export const Placeholder = () => {
  return (
    <ExpandableCard
      placeholder={placeholderHTML}
      title="Default Title"
      subtitle="Default Subtitle"
      isSelectable={selectOptions}
    >
      {detailsHtml}
    </ExpandableCard>
  )
}

export const Playground = () => (
  <ExpandableCard
    title={text('Title', 'Default Title')}
    subtitle={text('Subtitle', 'Default Subtitle')}
    isSelectable={{
      selectedText: text('Selected Text', 'Card Selected'),
      unSlectedText: text('Unselceted Text', 'Select Card'),
    }}
    toggle={boolean('Toggle Select', false)}
    children={select('Details', [undefined, 'Detail'])}
    placeholder={select('Placeholder', [undefined, 'Placeholder'])}
  />
)

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
