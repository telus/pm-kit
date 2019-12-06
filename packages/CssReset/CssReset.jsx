import React from 'react'
import { Global, css } from '@emotion/core'
import CerebriSans from './fonts/Cerebri-Sans-Book.woff'
import CerebriSansBold from './fonts/Cerebri-Sans-Bold.woff'

const global = css`
  @font-face {
    font-family: Cerebri-Sans;
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(${CerebriSans}) format('woff');
  }

  @font-face {
    font-family: Cerebri-Sans;
    font-style: bold;
    font-weight: 500;
    font-display: swap;
    src: url(${CerebriSansBold}) format('woff');
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    border: 0;
    font: inherit;
    font-size: 100%;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  html {
    font-size: 100%;
    font-weight: 300;
    font-family: 'Cerebri-Sans', 'Arial', 'sans-serif';
    font-kerning: normal;
  }

  body: {
    line-height: 1.5;
    font-family: 'Cerebri-Sans', 'Arial', 'sans-serif';
    font-weight: 300;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  main {
    display: block;
  }

  * {
    background-repeat: no-repeat;
    box-sizing: border-box;

    -moz-osx-font-smoothing: grayscale;

    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    font: inherit;

    &::before,
    &::after {
      box-sizing: border-box;
    }
  }
`

export default function CssReset() {
  return <Global styles={global} />
}
