'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import ProductGrid from './ProductGrid'

interface CategoryPageContentProps {
  category: any | null
  categories: any[]
  products: any[]
  currentSlug: string
}

export default function CategoryPageContent({ category, categories, products, currentSlug }: CategoryPageContentProps) {
  const { t } = useLanguage()

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{t('categories.not_found')}</h1>
          </div>
        </section>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-8">{t('categories.not_found_desc')}</p>
          <Link
            href="/products"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            {t('products.view_all')}
          </Link>
        </div>
      </div>
    )
  }

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
              <h2 className="text-lg font-semibold mb-4 text-gray-900">{t('nav.categories')}</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className="block py-2 px-3 rounded hover:bg-primary-50 hover:text-primary-600 transition"
                  >
                    {t('products.all_products')}
                  </Link>
                </li>
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className={`block py-2 px-3 rounded transition ${
                        cat.slug === currentSlug
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
                  <p className="text-gray-600">{products.length} {t('products.products_found')}</p>
                </div>

                <ProductGrid products={products} />
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">{t('products.no_products')}</h2>
                <p className="text-gray-500 mb-6">{t('categories.check_back')}</p>
                <Link
                  href="/products"
                  className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                >
                  {t('products.view_all')}
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
