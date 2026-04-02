'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home',    href: '/' },
  { label: 'Rooms',   href: '/rooms' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname  = usePathname()
  const isHome    = pathname === '/'

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  /*
   * On the home page  → transparent until scrolled
   * On every other page → always solid (white text would be invisible otherwise)
   */
  const isSolid = !isHome || scrolled

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSolid
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Small diamond accent */}
            <motion.span
              className={`w-2 h-2 rotate-45 transition-colors duration-500 ${
                isSolid ? 'bg-gold' : 'bg-white/70'
              }`}
              whileHover={{ scale: 1.4, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 400 }}
            />
            <span className={`text-2xl font-bold tracking-tight transition-colors duration-500 ${
              isSolid ? 'text-primary' : 'text-white'
            }`}>
              Sani<span className="text-gold">Hotel</span>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isSolid
                      ? isActive
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-primary'
                      : isActive
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {/* Active underline pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isSolid ? 'bg-primary/8' : 'bg-white/15'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}

            {/* Divider */}
            <span className={`w-px h-5 mx-2 transition-colors duration-500 ${
              isSolid ? 'bg-gray-200' : 'bg-white/25'
            }`} />

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/rooms"
                className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
                  isSolid
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md'
                    : 'bg-white text-primary hover:bg-white/90 shadow-md'
                }`}
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={`md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full transition-colors duration-300 ${
              isSolid ? 'hover:bg-gray-100' : 'hover:bg-white/15'
            }`}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45,  y: 6,  opacity: 1 }
                      : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -6, opacity: 1 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.25 }}
                className={`block w-5 h-0.5 mb-1 last:mb-0 rounded-full origin-center transition-colors duration-300 ${
                  isSolid ? 'bg-primary' : 'bg-white'
                }`}
              />
            ))}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {links.map((link, i) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-accent text-primary'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                        }`}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05, duration: 0.25 }}
                  className="pt-2 mt-1 border-t border-gray-100"
                >
                  <Link
                    href="/rooms"
                    className="block bg-primary text-white text-sm font-semibold px-5 py-3 rounded-xl text-center hover:bg-primary-dark transition-colors duration-200"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
