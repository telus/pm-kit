import React from 'react'
import { css } from '@emotion/core'
import { parkGreen } from '@pm-kit/colours'
import PropTypes from 'prop-types'
import { successPath, failPath } from '../../shared/svg/index'

const FeedbackIcon = ({ state, size }) => {
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
    animation: 1s linear infinite spinner;
    animation-delay: var(--spinner-delay);
    height: 100%;
    width: 100%;
  `

  const imageStyles = css`
    width: ${size};
    height: ${size};
  `

  return (
    <div css={imageStyles}>
      {state !== 'disabled' && (
        <>
          {state === 'waiting' && <div css={loader}></div>}
          {state === 'success' && <img src={successPath} alt="success" />}
          {state === 'error' && <img src={failPath} alt="error" />}
        </>
      )}
    </div>
  )
}

FeedbackIcon.propTypes = {
  /**
   * The icon you want to render.
   */
  state: PropTypes.oneOf(['waiting', 'success', 'error', 'disabled']),
  /**
   * The height and width of feedback-icon.
   */
  size: PropTypes.string,
}

FeedbackIcon.defaultProps = {
  state: 'disabled',
  size: '1.125rem',
}

export default FeedbackIcon
