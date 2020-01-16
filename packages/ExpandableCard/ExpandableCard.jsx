import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { motion, AnimatePresence } from 'framer-motion'
import { offWhite, parkGreen, lilyGreen } from '@pm-kit/colours'
import { weight } from '@pm-kit/typography'
import downArrow from '../../shared/svg/arrow-show.svg'
import upArrow from '../../shared/svg/arrow-hide.svg'
import checkmark from '../../shared/png/Checkmark/verified@3x.png'
import oval from '../../shared/png/EmptyOval/oval@3x.png'
import Paragraph from '@pm-kit/paragraph'

const card = css`
  width: 50%;
  display: flex;
  flex-direction: column;
  background-color: ${offWhite};
  border-width: 3px;
  border-radius: 12px;
  border-style: solid;
  overflow: hidden;
  position: relative;
  border-color: ${parkGreen};
  flex-basis: '40%';
  flex-grow: '1';
  margin-bottom: '32px';
  &:hover {
    box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.25);
  }
`

const selectedCard = css`
  background-color: ${lilyGreen};
  box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.25);
`

const titleStyle = css`
  color: ${parkGreen};
  font-weight: ${weight.bold};
  padding-left: 8px;
  width: 100%;
`

const paddingLeft = css`
  padding-left: 8px;
`

const line = css`
  border-style: solid;
  border-color: ${parkGreen};
  border-bottom-width: 1px;
  margin-left: 35px;
  margin-right: 35px;
`

const detailsBar = css`
  display: flex;
  flex-direction: row;
  font-weight: ${weight.bold};
  justify-content: space-between;
  text-decoration: underline;
  padding: 16px 23px 23px 23px;
  cursor: pointer;
`

const cardRowContainer = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 24px;
  margin-top: 8px;
`

const selectOptionContainer = css`
  padding: 23px 23px 0px 23px;
  cursor: pointer;
`

const cardDetails = css`
  color: ${parkGreen};
  padding: 0px 23px 0px 23px;
  overflow: hidden;
`

const detailSection = css`
  padding-top: 16px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  & > ul {
    list-style: disc;
    list-style-position: inside;
  }
  & > ul > li > span {
    margin-left: -12px;
  }
`

const selectOption = css`
  display: flex;
  flex-direction: row-reverse;
  font-weight: ${weight.bold};
`

const planSelected = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const cardSelectedText = css`
  padding-right: 5px;
`
const cardNotSelectedText = css`
  text-decoration: underline;
  padding-right: 8px;
`
const cardContainerDetails = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const planVariant = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { y: { type: 'spring', damping: 100, velocity: 500 }, opacity: { duration: 0.8 } },
  },
}

const ExpandableCard = ({ anchor, title, subtitle, details, selectedText, unSlectedText }) => {
  const [openCard, setOpenCard] = useState(false)
  const [selectCard, setSelectCard] = useState(false)

  const styles = [card]

  if (selectCard) {
    styles.push(selectedCard)
  }

  const toggleSelectCard = () => {
    if (!selectCard) {
      setSelectCard(!selectCard)
    }
  }

  const toggleOpenCard = () => {
    setOpenCard(!openCard)
  }

  let arrowImage = downArrow

  if (openCard) {
    arrowImage = upArrow
  } else {
    arrowImage = downArrow
  }

  return (
    <motion.div css={styles} variants={planVariant}>
      <div css={cardContainerDetails}>
        <div css={selectOptionContainer} onClick={toggleSelectCard}>
          <div css={selectOption}>
            {selectCard && (
              <div css={planSelected}>
                <p css={cardSelectedText}>{selectedText}</p>
                <img src={checkmark} height="18px" width="18px" alt="selected" />
              </div>
            )}
            {!selectCard && (
              <div css={planSelected}>
                <p css={cardNotSelectedText}>{unSlectedText}</p>
                <img src={oval} height="18px" width="18px" alt="unselected" />
              </div>
            )}
          </div>
          <div css={cardRowContainer}>
            {anchor && <Paragraph>{anchor}</Paragraph>}
            <div>
              <p css={titleStyle}>{title}</p>
              <p css={paddingLeft}>{subtitle}</p>
            </div>
          </div>
        </div>

        <div css={line}></div>
        <AnimatePresence>
          {openCard && details && (
            <motion.div
              css={cardDetails}
              onClick={toggleOpenCard}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: '0px' }}
            >
              <div css={detailSection}>
                <ul>
                  {details.map((detail, index) => {
                    return (
                      <li key={index}>
                        <span>{detail}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div css={detailsBar} onClick={toggleOpenCard}>
          {openCard && <Paragraph>Collapse</Paragraph>}
          {!openCard && <Paragraph>Details</Paragraph>}
          <img src={arrowImage} alt="arrow" />
        </div>
      </div>
    </motion.div>
  )
}

ExpandableCard.propTypes = {
  anchor: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  details: PropTypes.array,
  selectedText: PropTypes.string.isRequired,
  unSlectedText: PropTypes.string.isRequired,
}

ExpandableCard.defaultProps = {
  anchor: undefined,
  details: undefined,
}

export default ExpandableCard
