import React from 'react'
import { css } from '@emotion/core'
import { parkGreen } from '@pm-kit/colours'
import PropTypes from 'prop-types'
// import { successPath, failPath } from '../../shared/svg/index'

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
    width: ${size};
    height: ${size};
    animation: 1s linear infinite spinner;
    animation-delay: var(--spinner-delay);
  `

  const imageStyles = css`
    width: ${size};
    height: ${size};
  `

  return (
    <>
      {state !== 'disabled' && (
        <>
          {state === 'waiting' && <div css={loader}></div>}
          {/* {state === 'passed' && <img css={imageStyles} src={successPath} alt="success" />}
          {state === 'failed' && <img css={imageStyles} src={failPath} alt="fail" />} */}
        </>
      )}
    </>
  )
}

FeedbackIcon.propTypes = {
  state: PropTypes.oneOf(['waiting', 'passed', 'failed', 'disabled']),
  /**
   * The height and width of feedback-icon.
   */
  size: PropTypes.string,
}

FeedbackIcon.defaultProps = {
  state: 'disabled',
  size: '1rem',
}

export default FeedbackIcon
