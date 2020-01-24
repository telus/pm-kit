import React, { useState } from 'react'
import { withKnobs, text, select, boolean, object } from '@storybook/addon-knobs'
import Card from './Card'
import { version } from './package.json'

export default {
  title: 'Design System|Card',
  component: Card,
  parameters: {
    componentSubtitle: `version ${version}`,
  },
  decorators: [withKnobs],
}

const placeholderHTML = <p style={{ border: '1px solid', height: '50px', width: '50px' }}></p>

const detailsHtml = <p> This Card can Expand but cannot be Selected</p>

export const Primary = () => {
  return <Card title="Default Title" subtitle="Default Subtitle" />
}

export const Selectable = () => {
  const [selectCard, setSelectedCard] = useState(false)
  const id = 1
  return (
    <Card
      title="Default Title"
      subtitle="Default Subtitle"
      selectable={{ selectedText: 'Selected', unSelectedText: 'Select' }}
      onClick={() => setSelectedCard(id)}
      isSelected={selectCard === id}
    />
  )
}

export const Expandable = () => {
  return (
    <Card title="Default Title" subtitle="Default Subtitle" isExpandable={true}>
      {detailsHtml}
    </Card>
  )
}

export const NotExpandable = () => {
  return (
    <Card title="Default Title" subtitle="Default Subtitle" isExpandable={false}>
      {detailsHtml}
    </Card>
  )
}

export const WithPlaceholder = () => {
  const [selectCard, setSelectedCard] = useState()
  const id = 1
  return (
    <Card
      placeholder={placeholderHTML}
      title="Default Title"
      subtitle="Default Subtitle"
      selectable={{ selectedText: 'Selected', unSelectedText: 'Select' }}
      isSelected={selectCard === id}
      onClick={() => setSelectedCard(id)}
      isExpandable={true}
    >
      <p>Default Details</p>
    </Card>
  )
}

export const MultipleCards = () => {
  const [selectCard, setSelectedCard] = useState()
  const idCard1 = 1
  const idCard2 = 2
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div style={{ width: '40%' }}>
        <Card
          title="Card 1"
          selectable={{ selectedText: 'Selected', unSelectedText: 'Select' }}
          isSelected={selectCard === idCard1}
          onClick={() => setSelectedCard(idCard1)}
          isExpandable={true}
        >
          <p>Card 1</p>
        </Card>
      </div>
      <div style={{ width: '40%' }}>
        <Card
          title="Card 2"
          selectable={{ selectedText: 'Selected', unSelectedText: 'Select' }}
          isSelected={selectCard === idCard2}
          onClick={() => setSelectedCard(idCard2)}
          isExpandable={true}
        >
          <p>Card 2</p>
        </Card>
      </div>
    </div>
  )
}

export const Playground = () => {
  const [selectCard, setSelectedCard] = useState()
  const id = 1
  return (
    <Card
      title={text('Title', 'Title')}
      subtitle={text('Subtitle', 'Subtitle')}
      placeholder={select('Placeholder', [undefined, 'Placeholder'])}
      onClick={() => setSelectedCard(id)}
      isSelected={selectCard === id}
      selectable={object('Selected Text', { unSelectedText: 'Select', selectedText: 'Selected' })}
      isExpandable={boolean('Expandable', true)}
    >
      {text('Edit Details', 'Edit Details')}
    </Card>
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
