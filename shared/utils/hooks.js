import { useState, useEffect } from 'react'
import mediaQuery from 'css-mediaquery'
import { useTheme } from '../styles/themeContext'

const ssrEstimateWidth = deviceType => {
  if (process.env.BROWSER) {
    return window.innerWidth
  }
  if (deviceType === 'phone') {
    return 400
  }
  if (deviceType === 'tablet') {
    return 768
  }
  return 1200
}

let hydrationCompleted = false

export function useMedia(queries, values = [true], defaultValue = false) {
  const themeContext = useTheme()
  const cleanedQueries = queries.map(q => q.replace('@media ', ''))

  const [value, setValue] = useState(() => {
    let matchList
    if (hydrationCompleted) {
      matchList = cleanedQueries.map(q => window.matchMedia(q).matches)
    } else {
      const options = { width: ssrEstimateWidth(themeContext.device) }
      matchList = cleanedQueries.map(q => mediaQuery.match(q, options))
    }
    const index = matchList.findIndex(mql => mql)
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  })

  useEffect(() => {
    hydrationCompleted = true

    const mediaQueryLists = cleanedQueries.map(q => window.matchMedia(q))

    const handler = () => {
      const index = mediaQueryLists.findIndex(mql => mql.matches)
      setValue(typeof values[index] !== 'undefined' ? values[index] : defaultValue)
    }
    handler()

    mediaQueryLists.forEach(mql => mql.addListener(handler))
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler))
  }, [])
  return value
}
