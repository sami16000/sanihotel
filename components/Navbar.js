'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
          scrolled ? 'text-primary' : 'text-white'
        }`}>
          Sani<span className="text-gold">Hotel</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', href: '/' },
            { label: 'Rooms', href: '/rooms' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-gold ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/rooms"
            className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            scrolled ? 'bg-primary' : 'bg-white'
          }`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            scrolled ? 'bg-primary' : 'bg-white'
          }`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${
            scrolled ? 'bg-primary' : 'bg-white'
          }`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col gap-4">
          {[
            { label: 'Home', href: '/' },
            { label: 'Rooms', href: '/rooms' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/rooms"
            className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full text-center hover:bg-primary-dark transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}