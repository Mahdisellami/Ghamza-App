import { getApiUrl } from '@/lib/api'
import CategoryPageContent from '@/components/CategoryPageContent'

async function getCategory(slug: string) {
  try {
    const res = await fetch(`${getApiUrl()}/api/categories/${slug}`, {
      cache: 'no-store'
    })
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Failed to fetch category:', error)
    return null
  }
}

async function getCategoryProducts(categoryId: number) {
  try {
    const res = await fetch(`${getApiUrl()}/api/products/?category_id=${categoryId}`, {
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

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, categories] = await Promise.all([
    getCategory(params.slug),
    getCategories()
  ])

  const products = category ? await getCategoryProducts(category.id) : []

  return <CategoryPageContent category={category} categories={categories} products={products} currentSlug={params.slug} />
}
