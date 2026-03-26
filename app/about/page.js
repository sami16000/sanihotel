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
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
              },
              {
                name: 'Amina Bouzid',
                role: 'Head of Hospitality',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
              },
              {
                name: 'Yacine Oukaci',
                role: 'Executive Chef',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
              },
              {
                name: 'Nadia Ferhat',
                role: 'Spa & Wellness Director',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
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