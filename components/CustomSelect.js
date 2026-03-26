'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const options = [
  { value: 'booking', label: 'Room Booking', icon: '🛏️', desc: 'Reserve a room or ask about availability' },
  { value: 'inquiry', label: 'General Inquiry', icon: '💬', desc: 'Any general question about the hotel' },
  { value: 'event', label: 'Event Planning', icon: '🎉', desc: 'Weddings, conferences, and special events' },
  { value: 'complaint', label: 'Complaint', icon: '📝', desc: 'Share your feedback or report an issue' },
  { value: 'other', label: 'Other', icon: '✉️', desc: 'Anything else on your mind' },
]

export default function CustomSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = options.find((o) => o.value === value)

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">

      {/* Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.99 }}
        className={`w-full border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between transition-all duration-200 bg-white ${
          open
            ? 'border-primary shadow-md shadow-primary/10'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <span className="text-xl">{selected.icon}</span>
            <div>
              <div className="font-medium text-gray-900">{selected.label}</div>
              <div className="text-xs text-gray-400">{selected.desc}</div>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Select a subject</span>
        )}

        {/* Arrow */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-gray-400 flex-shrink-0 ml-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-50">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                How can we help?
              </p>
            </div>

            {/* Options */}
            <div className="p-2">
              {options.map((option, i) => (
                <motion.button
                  key={option.value}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-150 group ${
                    value === option.value
                      ? 'bg-primary/5 border border-primary/20'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {/* Icon bubble */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ duration: 0.2 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-colors duration-150 ${
                      value === option.value
                        ? 'bg-primary/10'
                        : 'bg-gray-100 group-hover:bg-primary/8'
                    }`}
                  >
                    {option.icon}
                  </motion.div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm transition-colors duration-150 ${
                      value === option.value ? 'text-primary' : 'text-gray-900'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate">{option.desc}</div>
                  </div>

                  {/* Checkmark */}
                  <AnimatePresence>
                    {value === option.value && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-50 bg-gray-50/50">
              <p className="text-xs text-gray-400 text-center">
                We reply within 24 hours
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}