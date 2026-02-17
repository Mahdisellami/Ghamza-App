'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCartStore } from '@/stores/cartStore'
import CurrencySelector from './CurrencySelector'
import LanguageSelector from './LanguageSelector'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSession, signOut } from 'next-auth/react'
import { useBackendAuth } from '@/hooks/useBackendAuth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const { t } = useLanguage()
  const { data: session, status } = useSession()

  // Sync backend token to sessionStorage
  useBackendAuth()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-16">
              <Image
                src="/gamza-logo.png"
                alt="Gamza Tounsia Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-primary-600 hidden sm:block">Gamza Tounsia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.home')}
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.products')}
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.categories')}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Cart & User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
            <CurrencySelector />
            <Link href="/cart" className="relative p-2">
              <svg className="w-6 h-6 text-gray-700 hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            </Link>

            {status === 'loading' ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('nav.orders')}
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        signOut({ callbackUrl: '/' })
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                  {t('nav.login')}
                </Link>
                <Link href="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition">
                  {t('nav.signup')}
                </Link>
              </>
            )}
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
