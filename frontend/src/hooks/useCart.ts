'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useCartStore } from '@/stores/cartStore'
import { useBackendCartStore } from '@/stores/backendCartStore'

/**
 * Unified cart hook that automatically switches between
 * backend cart (for authenticated users) and local cart (for guests)
 */
export function useCart() {
  const { data: session, status } = useSession()
  const localCart = useCartStore()
  const backendCart = useBackendCartStore()

  const isAuthenticated = status === 'authenticated' && !!session

  // Fetch backend cart when user logs in
  useEffect(() => {
    if (isAuthenticated && session?.backendToken) {
      backendCart.fetchCart()
    }
  }, [isAuthenticated, session?.backendToken, backendCart])

  // Return the appropriate cart based on auth status
  if (isAuthenticated) {
    return {
      items: backendCart.items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0] || '/placeholder-product.jpg',
        stock: item.product.stock,
      })),
      addItem: async (item: any) => {
        await backendCart.addToCart(item.id, item.quantity || 1)
      },
      removeItem: async (id: number) => {
        await backendCart.removeItem(id)
      },
      updateQuantity: async (id: number, quantity: number) => {
        await backendCart.updateQuantity(id, quantity)
      },
      clearCart: async () => {
        await backendCart.clearCart()
      },
      getTotalItems: backendCart.getTotalItems,
      getTotalPrice: backendCart.getTotalPrice,
      loading: backendCart.loading,
      error: backendCart.error,
      isBackendCart: true,
    }
  }

  // Guest cart (local storage)
  return {
    items: localCart.items,
    addItem: localCart.addItem,
    removeItem: localCart.removeItem,
    updateQuantity: localCart.updateQuantity,
    clearCart: localCart.clearCart,
    getTotalItems: localCart.getTotalItems,
    getTotalPrice: localCart.getTotalPrice,
    loading: false,
    error: null,
    isBackendCart: false,
  }
}
