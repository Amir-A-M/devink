'use client'

import { createContext, useCallback, useEffect, useState } from 'react'

interface ThemeContextValue {
  isDarkMode: boolean
  toggleDarkMode: () => void
  themeDir: 'rtl' | 'ltr'
  setThemeDir: (value: 'rtl' | 'ltr') => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [themeDir, setThemeDir] = useState<'rtl' | 'ltr'>('ltr')

  // themeMode
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

  // themeDir
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.getAttribute('dir') === 'rtl' ? setThemeDir('rtl') : setThemeDir('ltr')
    }
  }, [])

  // Update themeDir when it changes
  // This ensures that the document's direction is set correctly
  // when the themeDir state changes.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', themeDir)
    }
  }, [themeDir])

  // toggleDarkMode
  // This function toggles the dark mode state and updates the localStorage
  // and the HTML class accordingly
  // Driven by the class actually on <html>, not by the stored string: on a first
  // visit nothing is stored, and keying off `=== 'light-mode'` made the first
  // click a no-op.
  const toggleDarkMode = useCallback((): void => {
    const root = document.documentElement
    const next = !root.classList.contains('dark')

    root.classList.toggle('dark', next)
    setIsDarkMode(next)
    localStorage.setItem('theme', next ? 'dark-mode' : 'light-mode')
  }, [])

  //
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        themeDir,
        setThemeDir,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
