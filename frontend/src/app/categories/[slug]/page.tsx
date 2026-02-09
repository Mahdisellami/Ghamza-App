import Link from 'next/link'
import Image from 'next/image'

async function getCategory(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${slug}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/?category_id=${categoryId}`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`, {
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

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Category Not Found</h1>
          </div>
        </section>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    )
  }

  const products = await getCategoryProducts(category.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-xl text-primary-100">{category.description}</p>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className="block py-2 px-3 rounded hover:bg-primary-50 hover:text-primary-600 transition"
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className={`block py-2 px-3 rounded transition ${
                        cat.slug === params.slug
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {products.length > 0 ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600">{products.length} products found</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product: any) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                    >
                      <div className="aspect-square bg-gray-200 relative overflow-hidden">
                        <Image
                          src={product.images[0] || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-300"
                        />
                        {product.stock <= 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary-600">${product.price}</span>
                          {product.stock > 0 && (
                            <span className="text-xs text-gray-500">{product.stock} in stock</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h2>
                <p className="text-gray-500 mb-6">Check back soon for new items in this category!</p>
                <Link
                  href="/products"
                  className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  View All Products
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
