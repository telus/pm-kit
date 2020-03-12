const BREAKPOINTS = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 320,
}

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys = ['xs', 'sm', 'md', 'lg', 'xl']

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints = {}) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm[.
    unit = 'px',
    step = 5,
    ...other
  } = breakpoints

  function min(key) {
    const value = typeof BREAKPOINTS[key] === 'number' ? BREAKPOINTS[key] : key
    return `@media (min-width:${value}${unit})`
  }

  function max(key) {
    const endIndex = keys.indexOf(key) + 1
    const upperbound = BREAKPOINTS[keys[endIndex]]

    if (endIndex === keys.length) {
      // xl down applies to all sizes
      return min('xs')
    }

    const value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key
    return `@media (max-width:${value - step / 100}${unit})`
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end) + 1

    if (endIndex === keys.length) {
      return min(start)
    }

    return (
      `@media (min-width:${BREAKPOINTS[start]}${unit}) and ` +
      `(max-width:${BREAKPOINTS[keys[endIndex]] - step / 100}${unit})`
    )
  }

  function at(key) {
    return between(key, key)
  }

  function orientation(display, queryType, sizes) {
    let sizeQuery = ''
    if (queryType === 'between') {
      sizeQuery = between(sizes[0], sizes[1])
    } else if (queryType === 'min') {
      sizeQuery = min(sizes)
    } else if (queryType === 'max') {
      sizeQuery = max(sizes)
    } else if (queryType === 'at') {
      sizeQuery = at(sizes)
    }
    return `${sizeQuery} and (orientation: ${display})`
  }

  function width(key) {
    return BREAKPOINTS[key]
  }

  function height(key) {
    if (key === 'sm') {
      return `@media (min-width:${BREAKPOINTS.xl}${unit}) and ` + `(max-height:630${unit})`
    }

    return null
  }

  return {
    keys,
    min,
    max,
    between,
    at,
    width,
    height,
    orientation,
    ...other,
  }
}
