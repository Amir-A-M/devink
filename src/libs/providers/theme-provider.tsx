'use client'

import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

interface ThemeContextValue {
  isDarkMode: boolean
  toggleDarkMode: () => void
  themeDir: 'ltr' | 'rtl'
  setThemeDir: (value: 'ltr' | 'rtl') => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

ThemeContext.displayName = 'ThemeContext'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [themeDir, setThemeDir] = useState<'ltr' | 'rtl'>('ltr')

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark-mode') {
      setIsDarkMode(true)
      const root = document.querySelector('html')
      if (root && !root.classList.contains('dark')) {
        root.classList.add('dark')
      }
    } else {
      setIsDarkMode(false)
      const root = document.querySelector('html')
      if (root) {
        root.classList.remove('dark')
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setThemeDir(document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', themeDir)
    }
  }, [themeDir])

  const toggleDarkMode = useCallback((): void => {
    const root = document.documentElement
    const next = !root.classList.contains('dark')

    root.classList.toggle('dark', next)
    setIsDarkMode(next)
    localStorage.setItem('theme', next ? 'dark-mode' : 'light-mode')
  }, [])
  const ThemeContextValue = useMemo(
    () => ({ isDarkMode, toggleDarkMode, themeDir, setThemeDir }),
    [isDarkMode, toggleDarkMode, themeDir]
  )

  return <ThemeContext value={ThemeContextValue}>{children}</ThemeContext>
}
