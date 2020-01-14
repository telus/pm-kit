import React from 'react'
import { css } from '@emotion/core'
import { parkGreen } from '@pm-kit/colours'
import PropTypes from 'prop-types'

const Spinner = ({ size }) => {
  const loader = css`
    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }
    border: 3px solid ${parkGreen};
    border-radius: 50%;
    border-right-color: transparent;
    display: inline-block;
    width: ${size};
    height: ${size};
    animation: 1s linear infinite spinner;
    animation-delay: var(--spinner-delay);
  `

  return <div css={loader}></div>
}

Spinner.propTypes = {
  /**
   * The height and width of spinner.
   */
  size: PropTypes.string,
}

Spinner.defaultProps = {
  size: '100%',
}

export default Spinner
