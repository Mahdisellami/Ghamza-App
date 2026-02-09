import Link from 'next/link'
import Image from 'next/image'

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
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

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Products</h1>
          <p className="text-xl text-primary-100">Discover our complete collection of handcrafted Tunisian products</p>
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
              {categories.map((category: any) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="block py-2 px-3 rounded hover:bg-primary-50 hover:text-primary-600 transition"
                  >
                    {category.name}
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
                <select className="border border-gray-300 rounded-md px-4 py-2">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
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
            <div className="text-center py-12">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h2>
              <p className="text-gray-500">Check back soon for new items!</p>
            </div>
          )}
        </main>
      </div>
      </div>
    </div>
  )
}
