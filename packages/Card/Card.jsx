import React, { useState, useEffect } from 'react'
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
  width: 100%;
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

const selectOptionContainerNoCurser = css`
  padding: 23px 23px 0px 23px;
  cursor: default;
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

const Card = ({ expandable, placeholder, title, subtitle, children, onClick, isSelected, styles, selectable }) => {
  const [openCard, setOpenCard] = useState(false)

  const cardStyles = [card]

  const detailsBarStyles = [detailsBar]
  const selectOptionContainerStyles = [selectOptionContainer]

  if (!selectable) {
    selectOptionContainerStyles.push(selectOptionContainerNoCurser)
  }

  if (isSelected) {
    cardStyles.push(selectedCard)
  }

  const onCardClick = () => {
    onClick()
  }

  const toggleOpenCard = () => {
    setOpenCard(!openCard)
  }

  useEffect(() => {
    if (!expandable) {
      setOpenCard(true)
    }
  }, [expandable])

  let arrowImage = downArrow

  if (openCard) {
    arrowImage = upArrow
  } else {
    arrowImage = downArrow
  }

  if (styles) {
    if (styles.detailsBarStylingOverride) {
      detailsBarStyles.push(styles.detailsBarStylingOverride)
    }
    if (styles.selectOptionContainerStylingOverride) {
      selectOptionContainerStyles.push(styles.selectOptionContainerStylingOverride)
    }
  }

  return (
    <motion.div css={cardStyles} variants={planVariant}>
      <div css={cardContainerDetails}>
        <div css={selectOptionContainerStyles} onClick={selectable ? onCardClick : undefined}>
          {selectable && (
            <div css={selectOption}>
              {isSelected && (
                <div css={planSelected}>
                  <Paragraph
                    weight={weight.bold}
                    css={cardSelectedText}
                    size={styles && styles.fontSizeSmallOverride ? styles.fontSizeSmallOverride : ''}
                  >
                    {selectable.selectedText}
                  </Paragraph>
                  <img src={checkmark} height="18px" width="18px" alt="selected" />
                </div>
              )}
              {!isSelected && (
                <div css={planSelected}>
                  <Paragraph
                    weight={weight.bold}
                    css={cardNotSelectedText}
                    size={styles && styles.fontSizeSmallOverride ? styles.fontSizeSmallOverride : ''}
                  >
                    {selectable.unSelectedText}
                  </Paragraph>
                  <img src={oval} height="18px" width="18px" alt="unselected" />
                </div>
              )}
            </div>
          )}

          <div css={cardRowContainer}>
            <div>{placeholder && placeholder}</div>
            <div>
              <Paragraph
                css={titleStyle}
                size={styles && styles.fontSizeLargeOverride ? styles.fontSizeLargeOverride : ''}
              >
                {title}
              </Paragraph>
              <p css={paddingLeft}>{subtitle}</p>
            </div>
          </div>
        </div>
        {children && (
          <>
            <div css={line}></div>
            <AnimatePresence>
              {openCard && (
                <motion.div
                  css={cardDetails}
                  onClick={expandable ? toggleOpenCard : undefined}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: '0px' }}
                >
                  <div css={detailSection}>{children}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        {expandable && (
          <div css={detailsBarStyles} onClick={toggleOpenCard}>
            {openCard && (
              <Paragraph
                weight={weight.bold}
                size={styles && styles.fontSizeSmallOverride ? styles.fontSizeSmallOverride : 'inherit'}
              >
                {expandable.collapse}
              </Paragraph>
            )}
            {!openCard && (
              <Paragraph
                weight={weight.bold}
                size={styles && styles.fontSizeSmallOverride ? styles.fontSizeSmallOverride : 'inherit'}
              >
                {expandable.details}
              </Paragraph>
            )}
            <img src={arrowImage} alt="arrow" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

Card.propTypes = {
  /**
   * The title of the Card.
   */
  title: PropTypes.string,
  /**
   * The subtitle of the Card.
   */
  subtitle: PropTypes.string,
  /**
   * Any HTML element that you want to be rendered
   */
  placeholder: PropTypes.node,
  /**
   * The Details of the Card. Having children of any type renders an expandable details row.
   * With the contents of the child supplied to it.
   */
  children: PropTypes.node,
  /**
   * This is a fuction that is passed into the component that executes when the component is clicked.
   */
  onClick: PropTypes.func,
  /**
   * A boolean that if true renders the selected state of the card. If false renders the default state.
   */
  isSelected: PropTypes.bool,
  /**
   * Contains an object with the selected and unselected text in the top right of the Card.
   * This allows the card to be selectable.
   */
  selectable: PropTypes.PropTypes.exact({
    selectedText: PropTypes.string.isRequired,
    unSelectedText: PropTypes.string.isRequired,
  }),
  /**
   * Contains an object with the details and collapse text to be shown in the the details bar of the Card.
   * This allows the card to be expandable.
   */
  expandable: PropTypes.exact({
    details: PropTypes.string.isRequired,
    collapse: PropTypes.string.isRequired,
  }),
  /**
   * Customizes the Card according to your needs.
   * Accepts an object of styles in the structure below.
   * {
   *  selectOptionContainerStylingOverride: {},
   *  detailsBarStylingOverride: {},
   *  fontSizeSmallOverride: "",
   *  fontSizeLargeOverride: "",
   * }
   * */
  styles: PropTypes.object,
}

Card.defaultProps = {
  title: undefined,
  subtitle: undefined,
  placeholder: undefined,
  children: undefined,
  onClick: undefined,
  isSelected: undefined,
  selectable: undefined,
  expandable: undefined,
}

export default Card
