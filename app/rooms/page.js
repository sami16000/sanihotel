'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

const types = ['All', 'Standard', 'Deluxe', 'Suite', 'Family']

export default function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('All')
  const [guests, setGuests] = useState('')
  const [maxPrice, setMaxPrice] = useState(30000)

  useEffect(() => {
    fetchRooms()
  }, [])

  async function fetchRooms() {
    setLoading(true)
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('price', { ascending: true })

    if (error) {
      console.error('Error fetching rooms:', error)
    } else {
      setRooms(data)
    }
    setLoading(false)
  }

  const filtered = rooms.filter((room) => {
    const matchType = activeType === 'All' || room.type === activeType
    const matchGuests = guests === '' || room.capacity >= parseInt(guests)
    const matchPrice = room.price <= maxPrice
    return matchType && matchGuests && matchPrice
  })

  return (
    <main className="pt-24 min-h-screen bg-white">

      {/* ===== PAGE HEADER ===== */}
      <section
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Our Accommodations
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Our Rooms & Suites</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Every room is a sanctuary — designed for rest, inspired by nature.
          </p>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeType === type
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-primary"
            >
              <option value="">Any Guests</option>
              <option value="1">1+ Guests</option>
              <option value="2">2+ Guests</option>
              <option value="3">3+ Guests</option>
              <option value="4">4+ Guests</option>
            </select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Max:</span>
              <input
                type="range"
                min="5000"
                max="30000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-28 accent-primary"
              />
              <span className="text-sm font-medium text-primary w-24">
                {maxPrice.toLocaleString()} DZD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROOMS GRID ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-56 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                  <div className="h-8 bg-gray-200 rounded-full w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏔️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No rooms match your filters</h3>
            <p className="text-gray-400">Try adjusting your filters to see more options.</p>
          </div>
        )}

        {/* Rooms Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={room.image_urls?.[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    {room.type}
                  </span>
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                    {room.size}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{room.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {room.amenities?.slice(0, 3).map((a) => (
                      <span key={a} className="bg-accent text-primary text-xs px-2 py-1 rounded-full">
                        {a}
                      </span>
                    ))}
                    {room.amenities?.length > 3 && (
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-gray-400 text-sm mb-5">
                    <span>👥</span>
                    <span>Up to {room.capacity} guests</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        {room.price.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-sm"> DZD/night</span>
                    </div>
                    <Link
                      href={`/rooms/${room.id}`}
                      className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors duration-200"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="bg-accent py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Not sure which room to pick?</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Our team is happy to help you find the perfect room for your stay.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary text-white font-medium px-8 py-3 rounded-full hover:bg-primary-dark transition-colors duration-300"
        >
          Contact Us
        </Link>
      </section>

    </main>
  )
}