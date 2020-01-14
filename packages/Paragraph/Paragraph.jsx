import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { size as fontSize, weight as fontWeight } from '@pm-kit/typography'
import * as colors from '@pm-kit/colours'

const Paragraph = ({ children, position, size, weight, color, decoration, forwardedRef, ...rest }) => {
  const paragraph = css`
    text-align: ${position};
    width: 100%;
    text-decoration: ${decoration};
    font-size: ${size};
    font-weight: ${weight};
    color: ${color};
  `

  return (
    <p css={paragraph} {...rest}>
      {children}
    </p>
  )
}

Paragraph.propTypes = {
  /**
   * The position of text
   */
  position: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  color: PropTypes.string,
  /**
   * The decoration of text. Example: add an underline below text.
   */
  decoration: PropTypes.string,
  /**
   * The font-weight of text. Example: bold.
   */

  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The text size.
   */
  size: PropTypes.string,
  /**
   * The text.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

Paragraph.defaultProps = {
  position: 'left',
  color: colors.parkGreen,
  decoration: 'none',
  weight: fontWeight.normal,
  size: fontSize.bodyMedium,
  children: '',
}

const ParagraphWithRef = forwardRef((props, ref) => <Paragraph {...props} forwardedRef={ref} />)

export default ParagraphWithRef
