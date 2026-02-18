'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import Price from '@/components/Price'

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

  // Fetch orders from backend
  const [orders, setOrders] = React.useState<any[]>([])
  const [ordersLoading, setOrdersLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        const { ordersAPI } = await import('@/services/api')
        const data = await ordersAPI.getAll()
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setOrdersLoading(false)
      }
    }

    if (session?.user) {
      fetchOrders()
    }
  }, [session])

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
        {ordersLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('common.loading')}</p>
            </div>
          </div>
        ) : orders.length === 0 ? (
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
            <div className="space-y-6">
              {orders.map((order: any) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">{order.order_items?.length || 0} items</p>
                        <p className="text-sm text-gray-600">
                          {order.shipping_city}, {order.shipping_postal_code}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total</p>
                        <Price amount={order.total} className="text-xl font-bold text-primary-600" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
