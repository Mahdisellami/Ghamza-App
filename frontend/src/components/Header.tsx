'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/stores/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-primary-600">Ghamza</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600 transition">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition">
              Contact
            </Link>
          </div>

          {/* Cart & User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <svg className="w-6 h-6 text-gray-700 hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-primary-600">
              Login
            </Link>
            <Link href="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/products" className="block text-gray-700 hover:text-primary-600 transition">
              Products
            </Link>
            <Link href="/categories" className="block text-gray-700 hover:text-primary-600 transition">
              Categories
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-primary-600 transition">
              About
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-primary-600 transition">
              Contact
            </Link>
            <Link href="/cart" className="block text-gray-700 hover:text-primary-600 transition">
              Cart ({getTotalItems()})
            </Link>
            <Link href="/login" className="block text-gray-700 hover:text-primary-600 transition">
              Login
            </Link>
            <Link href="/register" className="block bg-primary-600 text-white px-4 py-2 rounded-md text-center hover:bg-primary-700 transition">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
