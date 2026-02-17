'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Currency = 'EUR' | 'USD' | 'TND'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (price: number) => number
  formatPrice: (price: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Exchange rates (base: EUR)
const EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.09,  // 1 EUR = 1.09 USD (approximate)
  TND: 3.35,  // 1 EUR = 3.35 TND (approximate)
}

const CURRENCY_SYMBOLS = {
  EUR: '€',
  USD: '$',
  TND: 'DT',
}

// Detect currency based on user's location
const detectCurrencyFromLocation = async (): Promise<Currency> => {
  try {
    // Try to get timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Tunisia timezones
    if (timezone === 'Africa/Tunis') {
      return 'TND'
    }

    // US timezones
    if (timezone.startsWith('America/')) {
      return 'USD'
    }

    // Try IP-based geolocation as fallback
    const response = await fetch('https://ipapi.co/json/')
    if (response.ok) {
      const data = await response.json()
      const countryCode = data.country_code

      if (countryCode === 'TN') return 'TND'
      if (countryCode === 'US') return 'USD'

      // European countries use EUR
      const europeanCountries = ['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES']
      if (europeanCountries.includes(countryCode)) return 'EUR'
    }
  } catch (error) {
    console.log('Could not detect location, using default currency')
  }

  // Default to EUR
  return 'EUR'
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('EUR')
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize currency from localStorage or detect from location
  useEffect(() => {
    const initializeCurrency = async () => {
      // First, check localStorage for saved preference
      const savedCurrency = localStorage.getItem('currency') as Currency | null

      if (savedCurrency && ['EUR', 'USD', 'TND'].includes(savedCurrency)) {
        setCurrencyState(savedCurrency)
      } else {
        // Detect based on location
        const detectedCurrency = await detectCurrencyFromLocation()
        setCurrencyState(detectedCurrency)
        localStorage.setItem('currency', detectedCurrency)
      }

      setIsInitialized(true)
    }

    initializeCurrency()
  }, [])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  const convertPrice = (price: number): number => {
    // Prices are stored in EUR in the database
    return price * EXCHANGE_RATES[currency]
  }

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price)
    const symbol = CURRENCY_SYMBOLS[currency]

    // Format based on currency
    if (currency === 'TND') {
      return `${convertedPrice.toFixed(2)} ${symbol}`
    } else if (currency === 'USD') {
      return `${symbol}${convertedPrice.toFixed(2)}`
    } else {
      // EUR
      return `${convertedPrice.toFixed(2)}${symbol}`
    }
  }

  // Don't render children until currency is initialized to avoid flash of wrong currency
  if (!isInitialized) {
    return null
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
