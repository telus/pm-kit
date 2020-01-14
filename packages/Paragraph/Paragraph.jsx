import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { size as fontSize, weight as fontWeight } from '@pm-kit/typography'
import * as colors from '@pm-kit/colours'

const Paragraph = forwardRef(({ children, position, size, weight, color, decoration, cssStyle }, ref) => {
  const paragraph = css`
    text-align: ${position};
    width: 100%;
    text-decoration: ${decoration};
    font-size: ${size};
    font-weight: ${weight};
    color: ${color};
  `

  const styles = [paragraph]
  if (cssStyle) {
    styles.push(cssStyle)
  }
  return <p css={styles}>{children}</p>
})

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

  weight: PropTypes.string,
  /**
   * The text size.
   */
  size: PropTypes.string,
  /**
   * The text.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Css class.
   */
  cssStyle: PropTypes.object,
}

Paragraph.defaultProps = {
  position: 'left',
  color: colors.parkGreen,
  decoration: 'none',
  fontWeight: fontWeight.normal,
  fontSize: fontSize.bodyMedium,
  cssStyle: undefined,
  children: '',
}

export default Paragraph
