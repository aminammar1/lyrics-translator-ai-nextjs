'use client'
import React, { useState } from 'react'
import logo from '../public/logo.png'
import Image from 'next/image'
import { italiana } from '@/app/layout'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Music, Menu, X, Search } from 'lucide-react'
import SignupSignIn from './SignupSignIn'
import { useSearch } from '@/hooks/useApi'
import FastResults from './FastResults'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, userId, signOut } = useAuth()
  const [openAuth, setOpenAuth] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const { loading, results, searchQuick } = useSearch()

  const toggleOpenAuth = () => setOpenAuth(prev => !prev)
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
  const toggleSearch = () => {
    setSearchExpanded(prev => !prev)
    if (!searchExpanded) {
      setSearchQuery('')
      setShowResults(false)
    }
  }

  const handleSearchChange = async (value: string) => {
    setSearchQuery(value)
    if (value.trim() === '') {
      setShowResults(false)
      return
    }
    const data = await searchQuick(value)
    setShowResults(data.length > 0 || loading)
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchExpanded(false)
      setSearchQuery('')
      setShowResults(false)
    }
  }

  const closeSearch = () => {
    setSearchExpanded(false)
    setSearchQuery('')
    setShowResults(false)
  }

  const handleAuthAction = async () => {
    if (userId) {
      await signOut()
    } else {
      toggleOpenAuth()
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full bg-black/20 backdrop-blur-2xl border-b border-white/10 z-[120] shadow-2xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              onClick={() => router.push('/')}
            >
              <Image
                src={logo}
                alt="Sing Lang"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span
                className={`${italiana.className} text-lg font-semibold text-foreground hidden sm:block`}
              >
                Sing Lang
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">

              {/* Search Button - Only show on song pages */}
              {pathname.startsWith('/song/') && (
                <button
                  onClick={toggleSearch}
                  className="p-2 text-foreground/60 hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
                >
                  <Search size={20} />
                </button>
              )}

              {userId && (
                <button
                  onClick={() => router.push('/translation')}
                  className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-sm font-medium"
                >
                  <Music size={16} />
                  My Translations
                </button>
              )}

              {userId ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 rounded-full">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-custom-orange to-custom-pink flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-foreground/70 max-w-24 truncate">
                      {user?.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleAuthAction}
                    className="text-xs font-medium text-foreground/50 hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuthAction}
                  className="px-6 py-2.5 bg-custom-orange/20 backdrop-blur-md border border-custom-orange/30 text-foreground text-sm font-medium rounded-full hover:bg-custom-orange/30 hover:border-custom-orange/50 transition-all duration-200"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-foreground/5 py-4 space-y-2">

              {/* Mobile Search Button - Only show on song pages */}
              {pathname.startsWith('/song/') && (
                <button
                  onClick={() => {
                    toggleSearch()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
                >
                  <Search size={18} />
                  <span className="text-sm font-medium">Search</span>
                </button>
              )}

              {userId && (
                <button
                  onClick={() => {
                    router.push('/translation')
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
                >
                  <Music size={18} />
                  <span className="text-sm font-medium">My Translations</span>
                </button>
              )}

              {userId ? (
                <div className="px-4 space-y-3">
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-custom-orange to-custom-pink flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-foreground/70 truncate">
                      {user?.email}
                    </span>
                  </div>
                  <button
                    onClick={handleAuthAction}
                    className="w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors text-left text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuthAction}
                  className="w-full mx-4 px-4 py-3 bg-custom-orange/20 backdrop-blur-md border border-custom-orange/30 text-foreground font-medium rounded-2xl hover:bg-custom-orange/30 hover:border-custom-orange/50 transition-all duration-200"
                >
                  Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Search Overlay */}
      {searchExpanded && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[300] pt-20">
          <div className="w-full max-w-2xl mx-auto px-4">
            <div className="relative">
              <input
                className="w-full h-14 px-6 pr-16 text-white placeholder-white/60 bg-black/50 backdrop-blur-xl border border-white/30 rounded-2xl outline-none text-lg"
                placeholder="Search songs, artists, lyrics..."
                onChange={e => handleSearchChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()}
                value={searchQuery}
                autoFocus
              />
              <button
                className="absolute top-2 right-2 w-10 h-10 bg-custom-orange rounded-xl flex items-center justify-center text-white hover:bg-custom-orange/80"
                onClick={closeSearch}
              >
                <X size={20} />
              </button>

              {/* Search Results */}
              {showResults && searchQuery.trim() && (
                <div className="mt-4 bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                  <FastResults
                    results={results}
                    loading={loading}
                    setShowResults={setShowResults}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {openAuth && !userId && (
        <SignupSignIn toggleOpenSignIn={toggleOpenAuth} />
      )}
    </>
  )
}
