'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCartStore } from '@/stores/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-16">
              <svg viewBox="0 0 100 140" className="w-full h-full">
                {/* Oval background */}
                <ellipse cx="50" cy="70" rx="45" ry="65" fill="#F5E6D3" stroke="#8B4513" strokeWidth="2"/>
                {/* Hand of Fatma */}
                <g transform="translate(50, 50)">
                  {/* Palm */}
                  <rect x="-12" y="0" width="24" height="30" fill="#DA4229" rx="3"/>
                  {/* Fingers */}
                  <rect x="-18" y="-15" width="8" height="20" fill="#DA4229" rx="3"/>
                  <rect x="-8" y="-20" width="7" height="25" fill="#DA4229" rx="3"/>
                  <rect x="1" y="-20" width="7" height="25" fill="#DA4229" rx="3"/>
                  <rect x="10" y="-15" width="8" height="20" fill="#DA4229" rx="3"/>
                  {/* Eye */}
                  <ellipse cx="0" cy="15" rx="10" ry="8" fill="#4A7C59"/>
                  <circle cx="0" cy="15" r="4" fill="#1a1a1a"/>
                  <circle cx="1" cy="14" r="1.5" fill="white"/>
                </g>
                {/* Text */}
                <text x="50" y="115" fontFamily="serif" fontSize="14" fontWeight="bold" fill="#DA4229" textAnchor="middle">Gamza</text>
                <text x="50" y="130" fontFamily="serif" fontSize="14" fontWeight="bold" fill="#DA4229" textAnchor="middle">Tounsia</text>
              </svg>
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary-600 hidden sm:block">Gamza Tounsia</span>
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
