import React, { useState } from 'react'
import Checkbox from './Checkbox'

export default {
  title: 'Checkbox',
}

export const Default = () => {
  const [checked, setChecked] = useState(true)

  const updateCheck = () => {
    setChecked(!checked)
    return checked
  }
  return <Checkbox label="Testing" name="Test" value={true} onChange={updateCheck} checked={checked} />
}
