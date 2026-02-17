import { getApiUrl } from '@/lib/api'
import ProductsPageContent from '@/components/ProductsPageContent'

async function getProducts() {
  try {
    const res = await fetch(`${getApiUrl()}/api/products/`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${getApiUrl()}/api/categories/`, {
      cache: 'no-store'
    })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return <ProductsPageContent products={products} categories={categories} />
}
