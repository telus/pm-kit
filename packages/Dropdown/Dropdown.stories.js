import React, { useState } from 'react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import Dropdown from './Dropdown'
export default {
  title: 'Design System|Dropdown',
  component: Dropdown,
  decorators: [withKnobs],
}

const cities = [
  { label: 'Toronto', value: '1' },
  { label: 'Ottawa', value: '2' },
  { label: 'Halifax', value: '3' },
  { label: 'Niafara Falls', value: '4' },
  { label: 'Montreal', value: '5' },
  { label: 'Quebec City', value: '6' },
  { label: 'Calgary', value: '7' },
]

export const Default = () => {
  const [city, setCity] = useState(cities[0])

  const onCitySelect = citySelected => {
    setCity(citySelected)
  }
  return <Dropdown label="Select a city" value={city} options={cities} onChange={onCitySelect} required={true} />
}

export const LargeLabel = () => {
  const [city, setCity] = useState(cities[0])

  const onCitySelect = citySelected => {
    setCity(citySelected)
  }
  return (
    <Dropdown
      label="Select a city"
      value={city}
      options={cities}
      onChange={onCitySelect}
      required={true}
      largeLabel={true}
    />
  )
}

export const Error = () => {
  const [errorState, setErrorState] = useState('error')
  const onCitySelect = citySelected => {
    setErrorState('success')
  }
  return (
    <Dropdown
      label="Select a city"
      placeholder="cities"
      options={cities}
      onChange={onCitySelect}
      required={true}
      big={true}
      feedback={errorState}
      error="City is required"
    />
  )
}

export const Playground = () => {
  return (
    <Dropdown
      label={text('Label', 'Testing')}
      required={select('Required', [true, false], false)}
      feedback={select('feedback', ['error', 'success'], 'success')}
      error={text('Error', 'This field is required')}
      options={cities}
      onChange={() => {}}
      placeholder={text('placeholder', 'Cities')}
      matchForm={select('match form', ['start', 'any'], 'start')}
      trim={select('trim', [true, false], true)}
      ignoreAccents={select('ignore accents', [true, false], true)}
      ignoreCase={select('ignore case', [true, false], true)}
      largeLabel={select('large label', [true, false], false)}
    />
  )
}

Playground.story = {
  name: 'playground',
  parameters: { docs: { page: null, disable: true } },
}
