import axios, { AxiosInstance, AxiosError } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage first (for email/password auth)
    let token = localStorage.getItem('access_token')

    // If not in localStorage, try to get from sessionStorage (for OAuth)
    if (!token && typeof window !== 'undefined') {
      token = sessionStorage.getItem('backend_token')
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('access_token')
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: async (data: {
    email: string
    password: string
    full_name: string
    phone?: string
    address?: string
    city?: string
    postal_code?: string
  }) => {
    const response = await apiClient.post('/users/register', data)
    return response.data
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post('/users/login', { email, password })
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token)
    }
    return response.data
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me')
    return response.data
  },

  logout: () => {
    localStorage.removeItem('access_token')
  },
}

// Products API
export const productsAPI = {
  getAll: async (params?: { skip?: number; limit?: number; category_id?: number }) => {
    const response = await apiClient.get('/products', { params })
    return response.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  },

  create: async (data: {
    name: string
    slug: string
    description?: string
    price: number
    stock: number
    category_id: number
    images?: string[]
  }) => {
    const response = await apiClient.post('/products', data)
    return response.data
  },

  update: async (
    id: number,
    data: Partial<{
      name: string
      slug: string
      description: string
      price: number
      stock: number
      category_id: number
      images: string[]
      is_active: boolean
    }>
  ) => {
    const response = await apiClient.put(`/products/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/products/${id}`)
  },
}

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await apiClient.get('/categories')
    return response.data
  },

  getByIdOrSlug: async (identifier: string | number) => {
    const response = await apiClient.get(`/categories/${identifier}`)
    return response.data
  },

  create: async (data: { name: string; slug: string; description?: string }) => {
    const response = await apiClient.post('/categories', data)
    return response.data
  },
}

// Orders API
export const ordersAPI = {
  getAll: async () => {
    const response = await apiClient.get('/orders')
    return response.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/orders/${id}`)
    return response.data
  },

  create: async (data: {
    items: Array<{ product_id: number; quantity: number }>
    shipping_address: string
    shipping_city: string
    shipping_postal_code: string
    phone: string
    notes?: string
  }) => {
    const response = await apiClient.post('/orders', data)
    return response.data
  },
}

// Cart API (placeholder for future implementation)
export const cartAPI = {
  getItems: async () => {
    // TODO: Implement cart endpoints in backend
    const response = await apiClient.get('/cart')
    return response.data
  },

  addItem: async (product_id: number, quantity: number = 1) => {
    const response = await apiClient.post('/cart', { product_id, quantity })
    return response.data
  },

  updateItem: async (product_id: number, quantity: number) => {
    const response = await apiClient.put(`/cart/${product_id}`, { quantity })
    return response.data
  },

  removeItem: async (product_id: number) => {
    await apiClient.delete(`/cart/${product_id}`)
  },

  clear: async () => {
    await apiClient.delete('/cart')
  },
}

export default apiClient
