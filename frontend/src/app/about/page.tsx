import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Ghamza</h1>
          <p className="text-xl text-primary-100">Preserving Tunisian Heritage Through Authentic Craftsmanship</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Our Story */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Ghamza is a celebration of Tunisia's rich artisanal heritage. Our name, derived from the Arabic word
                meaning "wink" or "blink," represents the fleeting moments of beauty captured in each handcrafted piece.
              </p>
              <p>
                Founded with a passion for preserving traditional Tunisian crafts, we work directly with skilled
                artisans from renowned craft centers including Nabeul, Kairouan, Djerba, and the Saharan regions.
                Each product tells a story of generations-old techniques passed down through families of craftspeople.
              </p>
              <p>
                From the vibrant ceramics of Nabeul to the intricate textiles of Kairouan, from the delicate
                silver filigree work to the rustic olive wood creations, every item in our collection is a testament
                to Tunisia's diverse cultural tapestry.
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We are committed to supporting local artisans and preserving traditional Tunisian crafts for future
                generations. By connecting craftspeople directly with customers worldwide, we ensure fair compensation
                and sustainable livelihoods for our artisan partners.
              </p>
              <p>
                Every purchase supports:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Local artisan communities and their families</li>
                <li>The preservation of centuries-old craft techniques</li>
                <li>Sustainable and ethical production practices</li>
                <li>Cultural heritage conservation in Tunisia</li>
              </ul>
            </div>
          </section>

          {/* Our Crafts */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Crafts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-3">Ceramics & Pottery</h3>
                <p className="text-gray-600">
                  Hand-painted ceramics from Nabeul, featuring traditional patterns and vibrant colors that have
                  adorned Tunisian homes for centuries.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-3">Textiles</h3>
                <p className="text-gray-600">
                  Handwoven margoum rugs, traditional foutas, and embroidered textiles from Kairouan and beyond,
                  each piece a labor of love and skill.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-3">Jewelry</h3>
                <p className="text-gray-600">
                  Intricate silver filigree work and traditional designs including the protective Hand of Fatma,
                  crafted by master silversmiths.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-3">Home Decor</h3>
                <p className="text-gray-600">
                  From olive wood kitchenware to copper lanterns and decorative items that bring Tunisian warmth
                  into any home.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Authenticity</h3>
                <p className="text-gray-600 text-sm">100% handmade products using traditional techniques</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Supporting local artisans and their families</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
                <p className="text-gray-600 text-sm">Eco-friendly practices and ethical production</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
