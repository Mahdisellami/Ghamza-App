'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'
import Link from 'next/link'

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  // Mock orders data - in real app, fetch from backend
  const orders = []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{t('orders.title')}</h1>
          <p className="text-xl text-primary-100">{t('orders.subtitle')}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {orders.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('orders.no_orders')}</h2>
            <p className="text-gray-600 mb-8">{t('orders.no_orders_desc')}</p>
            <Link
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              {t('orders.start_shopping')}
            </Link>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Orders list will go here when implemented */}
            <div className="space-y-6">
              {orders.map((order: any) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  {/* Order card content */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
