'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ordersAPI } from '@/services/api'
import Link from 'next/link'
import Image from 'next/image'
import Price from '@/components/Price'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const { t } = useLanguage()

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const isSuccess = searchParams.get('success') === 'true'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await ordersAPI.getById(Number(params.id))
        setOrder(data)
      } catch (error) {
        console.error('Failed to fetch order:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user && params.id) {
      fetchOrder()
    }
  }, [session, params.id])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
          <Link href="/orders" className="text-primary-600 hover:text-primary-700 font-semibold">
            View all orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          {isSuccess && (
            <div className="mb-6 bg-white text-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
                  <p className="text-gray-600">Thank you for your order. We'll send you a confirmation email shortly.</p>
                </div>
              </div>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-2">Order #{order.id}</h1>
          <p className="text-xl text-primary-100">
            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-lg font-semibold ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.product?.images?.[0] || '/placeholder-product.jpg'}
                        alt={item.product?.name || 'Product'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product?.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <Price amount={item.price} className="text-sm text-gray-600" />
                        <Price amount={item.price * item.quantity} className="font-semibold text-gray-900" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Address:</span> {order.shipping_address}</p>
                <p><span className="font-semibold">City:</span> {order.shipping_city}</p>
                <p><span className="font-semibold">Postal Code:</span> {order.shipping_postal_code}</p>
                <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                {order.notes && (
                  <p className="pt-2 border-t mt-4">
                    <span className="font-semibold">Notes:</span> {order.notes}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <Price amount={order.total} className="text-gray-600" />
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.shipping')}</span>
                  <span className="text-green-600">{t('cart.free_shipping')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.tax')}</span>
                  <span>Included</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>{t('cart.total')}</span>
                  <Price amount={order.total} className="text-primary-600 font-bold text-lg" />
                </div>
              </div>

              <Link
                href="/orders"
                className="w-full block text-center border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                View All Orders
              </Link>

              <Link
                href="/products"
                className="w-full block text-center mt-3 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
