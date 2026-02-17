'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'de' | 'en' | 'fr' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Detect language based on browser settings
const detectLanguageFromBrowser = (): Language => {
  if (typeof window === 'undefined') return 'de'

  const browserLang = navigator.language.toLowerCase().split('-')[0]

  // Map browser language to supported languages
  if (browserLang === 'de') return 'de'
  if (browserLang === 'ar') return 'ar'
  if (browserLang === 'fr') return 'fr'
  if (browserLang === 'en') return 'en'

  // Default to German
  return 'de'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de')
  const [isInitialized, setIsInitialized] = useState(false)
  const [translations, setTranslations] = useState<Record<string, string>>({})

  // Initialize language from localStorage or detect from browser
  useEffect(() => {
    const initializeLanguage = async () => {
      // Check localStorage for saved preference
      const savedLanguage = localStorage.getItem('language') as Language | null

      let lang: Language
      if (savedLanguage && ['de', 'en', 'fr', 'ar'].includes(savedLanguage)) {
        lang = savedLanguage
      } else {
        // Detect based on browser
        lang = detectLanguageFromBrowser()
        localStorage.setItem('language', lang)
      }

      setLanguageState(lang)

      // Load translations
      try {
        const translationsModule = await import(`@/translations/${lang}.json`)
        setTranslations(translationsModule.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
      }

      setIsInitialized(true)
    }

    initializeLanguage()
  }, [])

  // Load translations when language changes
  useEffect(() => {
    if (!isInitialized) return

    const loadTranslations = async () => {
      try {
        const translationsModule = await import(`@/translations/${language}.json`)
        setTranslations(translationsModule.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
      }
    }

    loadTranslations()
  }, [language, isInitialized])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('language', newLanguage)

    // Update HTML lang and dir attributes
    document.documentElement.lang = newLanguage
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
  }

  const t = (key: string): string => {
    return translations[key] || key
  }

  const isRTL = language === 'ar'

  // Set initial dir attribute
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.lang = language
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    }
  }, [language, isRTL, isInitialized])

  // Don't render children until language is initialized
  if (!isInitialized) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
