import React from 'react'
import $COMPONENT$ from './$COMPONENT$.jsx'
import { version } from './package.json'

export default {
  title: '$COMPONENT$',
  component: $COMPONENT$,
  parameters: {
    componentSubtitle: `version ${version}`,
  },
}

export const Default = () => <$COMPONENT$ />
