import React from 'react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import Link from './Link.jsx'
import { version } from './package.json'

// export default {
//   title: 'Design System|Link',
//   component: Link,
//   parameters: {
//     componentSubtitle: `version ${version}`,
//   },
//   decorators: [withKnobs],
// }

export const Link1 = () => <Link link="http://www.google.com">Go To Google</Link>
