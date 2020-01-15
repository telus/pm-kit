import React, { useState } from 'react'
// import { withKnobs, text, select } from '@storybook/addon-knobs'
import Radio from './Radio'
// import { size, weight } from '../typography/typography'

export default {
  title: 'Design System|Radio',
  component: Radio,
  //   decorators: [withKnobs],
}

export const Default = () => {
  const [clicked, setClicked] = useState('en')

  const handleSelectOption = en_ => {
    setClicked(en_)
  }

  return (
    <>
      <Radio
        checked={clicked === 'en'}
        label="English"
        name="prefLang"
        onChange={() => {
          handleSelectOption('en')
        }}
        value={false}
      />
      <Radio
        id="2"
        checked={clicked === 'fr'}
        label="French"
        name="prefLang"
        onChange={() => {
          handleSelectOption('fr')
        }}
        value={true}
      />
    </>
  )
}

// export const Playground = () => {
//   return (
//     <Paragraph
//       children={text('Label', 'Testing')}
//       position={select('Position', ['left', 'center', 'right', 'justify'], 'left')}
//       size={select(
//         'Size',
//         [size.bodySmall, size.bodyMedium, size.bodyLarge, size.h1, size.h2, size.h3, size.h4],
//         size.bodyLarge
//       )}
//       color={select(
//         'colors',
//         [
//           colors.greyBlue,
//           colors.parkGreen,
//           colors.lilyGreen,
//           colors.softSandBrown,
//           colors.lightTan,
//           colors.offWhite,
//           colors.white,
//           colors.red,
//         ],
//         colors.parkGreen
//       )}
//       decoration={select('decoration', ['underline', 'none'], 'none')}
//       weight={select('Weight', [weight.normal, weight.bold], weight.normal)}
//     />
//   )
// }

// Playground.story = {
//   name: 'playground',
//   parameters: { docs: { page: null, disable: true } },
// }
