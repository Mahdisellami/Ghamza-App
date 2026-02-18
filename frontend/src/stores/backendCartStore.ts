import { create } from 'zustand'
import { cartAPI } from '@/services/api'

export interface BackendCartItem {
  id: number
  product_id: number
  quantity: number
  product: {
    id: number
    name: string
    slug: string
    price: number
    images: string[]
    stock: number
  }
}

interface BackendCartStore {
  items: BackendCartItem[]
  loading: boolean
  error: string | null

  // Actions
  fetchCart: () => Promise<void>
  addToCart: (productId: number, quantity?: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  removeItem: (productId: number) => Promise<void>
  clearCart: () => Promise<void>

  // Getters
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useBackendCartStore = create<BackendCartStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    try {
      set({ loading: true, error: null })
      const data = await cartAPI.getItems()
      set({ items: data, loading: false })
    } catch (error: any) {
      console.error('Failed to fetch cart:', error)
      set({
        error: error.response?.data?.detail || 'Failed to fetch cart',
        loading: false
      })
    }
  },

  addToCart: async (productId: number, quantity: number = 1) => {
    try {
      set({ loading: true, error: null })
      await cartAPI.addItem(productId, quantity)
      // Refresh cart after adding
      await get().fetchCart()
    } catch (error: any) {
      console.error('Failed to add to cart:', error)
      set({
        error: error.response?.data?.detail || 'Failed to add item',
        loading: false
      })
      throw error
    }
  },

  updateQuantity: async (productId: number, quantity: number) => {
    try {
      set({ loading: true, error: null })
      if (quantity <= 0) {
        await get().removeItem(productId)
      } else {
        await cartAPI.updateItem(productId, quantity)
        await get().fetchCart()
      }
    } catch (error: any) {
      console.error('Failed to update quantity:', error)
      set({
        error: error.response?.data?.detail || 'Failed to update quantity',
        loading: false
      })
    }
  },

  removeItem: async (productId: number) => {
    try {
      set({ loading: true, error: null })
      await cartAPI.removeItem(productId)
      await get().fetchCart()
    } catch (error: any) {
      console.error('Failed to remove item:', error)
      set({
        error: error.response?.data?.detail || 'Failed to remove item',
        loading: false
      })
    }
  },

  clearCart: async () => {
    try {
      set({ loading: true, error: null })
      await cartAPI.clear()
      set({ items: [], loading: false })
    } catch (error: any) {
      console.error('Failed to clear cart:', error)
      set({
        error: error.response?.data?.detail || 'Failed to clear cart',
        loading: false
      })
    }
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    )
  },
}))
