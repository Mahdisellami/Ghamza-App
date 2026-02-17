'use client'

import { useCurrency } from '@/contexts/CurrencyContext'

interface PriceProps {
  amount: number
  className?: string
}

export default function Price({ amount, className = '' }: PriceProps) {
  const { formatPrice } = useCurrency()

  return <span className={className}>{formatPrice(amount)}</span>
}
