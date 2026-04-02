'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

// Reusable animation wrapper - fades + slides up when scrolled into view
function AnimateIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fades in from left
function AnimateLeft({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fades in from right
function AnimateRight({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const heroRef = useRef(null)

  return (
    <main className="pt-24 min-h-screen bg-white overflow-hidden">

      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative py-32 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 4 + i * 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block bg-white/10 border border-white/20 text-white text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Our Story
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            About{' '}
            <span className="text-gold">SaniHotel</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-xl max-w-xl mx-auto"
          >
            Born from a love of the mountains and a passion for Algerian hospitality.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-0.5 h-8 bg-white/20"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== STORY SECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <AnimateLeft>
            <span className="text-primary-light text-sm font-medium tracking-widest uppercase">Who We Are</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
              More Than a Hotel —<br />A Mountain Experience
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              SaniHotel was founded in 2014 with a single dream: to create a place where guests could escape the noise of city life and reconnect with nature — without sacrificing comfort or luxury.
            </p>
            <p className="text-gray-500 leading-relaxed mb-5">
              Nestled in the stunning mountains of Tizi Ouzou, Algeria, our hotel was built using locally sourced stone and timber, designed to blend seamlessly into the landscape it calls home.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Today, SaniHotel welcomes thousands of guests every year — from adventure seekers and honeymooners to families and solo travelers — all united by a love of Algeria's breathtaking nature.
            </p>
          </AnimateLeft>

          <AnimateRight>
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', mt: '', alt: 'Hotel exterior' },
                { src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80', mt: 'mt-8', alt: 'Hotel interior' },
                { src: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=600&q=80', mt: '', alt: 'Mountain view' },
                { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', mt: 'mt-8', alt: 'Nature' },
              ].map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl overflow-hidden h-52 ${img.mt} cursor-pointer shadow-sm`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </AnimateRight>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-primary py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '2014', label: 'Year Founded' },
            { number: '50+', label: 'Luxury Rooms' },
            { number: '5,000+', label: 'Happy Guests' },
            { number: '4.9★', label: 'Average Rating' },
          ].map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <AnimateIn className="text-center mb-16">
          <span className="text-primary-light text-sm font-medium tracking-widest uppercase">What We Stand For</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3">Our Values</h2>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🌿',
              title: 'Nature First',
              desc: 'Every decision we make puts the environment first. We use renewable energy, source food locally, and minimize our footprint on the beautiful landscape around us.',
            },
            {
              icon: '🤝',
              title: 'Algerian Hospitality',
              desc: 'Hospitality is in our DNA. Our staff are all from local Algerian communities, trained to make every guest feel like family from the moment they arrive.',
            },
            {
              icon: '✨',
              title: 'Uncompromising Quality',
              desc: 'From the thread count of our sheets to the ingredients in our kitchen, we never cut corners. Excellence is not a goal — it is our standard.',
            },
          ].map((val, i) => (
            <AnimateIn key={val.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(27,79,114,0.12)' }}
                transition={{ duration: 0.3 }}
                className="text-center p-8 rounded-2xl border border-gray-100 cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl mb-5 inline-block"
                >
                  {val.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{val.title}</h3>
                <p className="text-gray-500 leading-relaxed">{val.desc}</p>
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="bg-accent py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <span className="text-primary-light text-sm font-medium tracking-widest uppercase">The People Behind SaniHotel</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Meet Our Team</h2>
          </AnimateIn>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: 'Sami Hadjadj',
                role: 'Founder & CEO',
                image: 'data:image/png;base64,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',
              },
              {
                name: 'Amina Bouzid',
                role: 'Head of Hospitality',
                image: 'data:image/png;base64,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',
              },
              {
                name: 'Yacine Oukaci',
                role: 'Executive Chef',
                image: 'data:image/png;base64,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'
              },
              {
                name: 'Nadia Ferhat',
                role: 'Spa & Wellness Director',
                image: 'data:image/png;base64,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',
              },
            ].map((member, i) => (
              <AnimateIn key={member.name} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-center group cursor-default"
                >
                  <div className="rounded-2xl overflow-hidden h-64 mb-4 shadow-sm">
                    <motion.img
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.5 }}
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-primary-light text-sm mt-1">{member.role}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimateLeft>
            <span className="text-primary-light text-sm font-medium tracking-widest uppercase">Find Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-6">
              Located in the Heart of<br />Tizi Ouzou
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              SaniHotel is situated in the breathtaking Kabyle mountains of Tizi Ouzou, just 2 hours from Algiers. Surrounded by cedar forests and dramatic peaks, it is one of Algeria's most scenic destinations.
            </p>
            <div className="space-y-5">
              {[
                { icon: '📍', label: 'Address', value: 'Route des Crêtes, Tizi Ouzou, Algeria' },
                { icon: '✈️', label: 'Nearest Airport', value: 'Houari Boumediene Airport, Algiers (120 km)' },
                { icon: '🚗', label: 'By Car', value: '2 hours from Algiers via N12' },
                { icon: '📞', label: 'Phone', value: '+213 26 XXX XXX' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                    <div className="text-gray-500 text-sm">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimateLeft>

          <AnimateRight>
            <div className="rounded-2xl overflow-hidden h-96 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101660.71527767285!2d4.0117!3d36.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e60399e83c97b%3A0xd14d41a5f6a285b5!2sTizi%20Ouzou!5e0!3m2!1sen!2sdz!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </AnimateRight>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        {/* Background animated circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: 300 + i * 150,
              height: 300 + i * 150,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          />
        ))}

        <div className="relative z-10">
          <AnimateIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Experience<br />
              <span className="text-gold">SaniHotel?</span>
            </h2>
            <p className="text-white/70 mb-10 max-w-lg mx-auto text-lg">
              Book your stay today and discover why thousands of guests call SaniHotel their favourite place in Algeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/rooms"
                  className="inline-block bg-white text-primary font-medium px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  Browse Rooms
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-block border border-white/30 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-300"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </AnimateIn>
        </div>
      </section>

    </main>
  )
}