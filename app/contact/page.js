 'use client'
import CustomSelect from '../../components/CustomSelect' 
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

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

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all required fields.')
      return
    }
    setStatus('loading')

    const { error } = await supabase.from('messages').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      read: false,
    })

    if (error) {
      console.error('Message error:', error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  return (
    <main className="pt-24 min-h-screen bg-white overflow-hidden">

      {/* ===== HERO ===== */}
      <section
        className="relative py-32 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: 200 + i * 80,
                height: 200 + i * 80,
                left: `${10 + i * 18}%`,
                top: `${10 + i * 10}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
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
              Get In Touch
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6"
          >
            Contact <span className="text-gold">Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-xl max-w-xl mx-auto"
          >
            We would love to hear from you. Our team is always here to help.
          </motion.p>
        </div>
      </section>

      {/* ===== CONTACT CARDS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: '📍', title: 'Our Address', value: 'Route des Crêtes,\nTizi Ouzou, Algeria', delay: 0 },
            { icon: '📞', title: 'Phone Number', value: '+213 26 XXX XXX\n+213 7XX XXX XXX', delay: 0.1 },
            { icon: '✉️', title: 'Email Address', value: 'info@sanihotel.dz\nbooking@sanihotel.dz', delay: 0.2 },
            { icon: '🕐', title: 'Working Hours', value: 'Reception: 24/7\nAdmin: 8am – 8pm', delay: 0.3 },
          ].map((card) => (
            <AnimateIn key={card.title} delay={card.delay}>
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(27,79,114,0.12)' }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl mb-4 inline-block"
                >
                  {card.icon}
                </motion.div>
                <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{card.value}</p>
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ===== FORM + MAP ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* FORM */}
          <AnimateLeft>
            <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-8">Fill in the form and we will get back to you within 24 hours.</p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-7xl mb-6"
                  >
                    ✅
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-500 mb-2">
                    Thank you <span className="font-semibold text-primary">{form.name}</span>!
                  </p>
                  <p className="text-gray-500 mb-8">
                    We will reply to <span className="text-primary">{form.email}</span> within 24 hours.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                    className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Ahmed Benali"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+213 XXX XXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="ahmed@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
    Subject
  </label>
  <CustomSelect
    value={form.subject}
    onChange={(val) => setForm({ ...form, subject: val })}
  />
</div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                      Message *
                    </label>
                    <textarea
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 rounded-xl transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-base"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      'Send Message →'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimateLeft>

          {/* MAP + EXTRA INFO */}
          <AnimateRight>
            <div className="flex flex-col gap-6">

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-80 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101660.71527767285!2d4.0117!3d36.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e60399e83c97b%3A0xd14d41a5f6a285b5!2sTizi%20Ouzou!5e0!3m2!1sen!2sdz!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              {/* FAQ */}
              <div className="bg-accent rounded-2xl p-8">
                <h3 className="font-semibold text-gray-900 mb-6 text-lg">Frequently Asked Questions</h3>
                <div className="space-y-5">
                  {[
                    { q: 'What time is check-in and check-out?', a: 'Check-in is at 2:00 PM and check-out is at 12:00 PM.' },
                    { q: 'Is breakfast included?', a: 'Yes, all rooms include a complimentary traditional Algerian breakfast.' },
                    { q: 'Do you offer airport transfers?', a: 'Yes, we offer transfers from Algiers airport. Please contact us to arrange.' },
                    { q: 'Is parking available?', a: 'Yes, free secure parking is available for all guests.' },
                  ].map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                    >
                      <p className="font-medium text-gray-900 text-sm mb-1">{faq.q}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </AnimateRight>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="bg-primary py-20 px-6 text-center relative overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{ width: 300 + i * 150, height: 300 + i * 150, left: '50%', top: '50%', x: '-50%', y: '-50%' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          />
        ))}
        <div className="relative z-10">
          <AnimateIn>
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Book Your Stay?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Skip the messages and go straight to booking your perfect mountain room.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/rooms"
                className="inline-block bg-white text-primary font-medium px-10 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 text-lg"
              >
                Browse Our Rooms →
              </Link>
            </motion.div>
          </AnimateIn>
        </div>
      </section>

    </main>
  )
}
