'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function RoomDetail() {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    fetchRoom()
  }, [id])

  async function fetchRoom() {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching room:', error)
    } else {
      setRoom(data)
    }
    setLoading(false)
  }

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
      : 0
  const total = nights * (room?.price || 0)
  const today = new Date().toISOString().split('T')[0]

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!checkIn || !checkOut || nights <= 0) {
      alert('Please select valid check-in and check-out dates.')
      return
    }
    if (!form.name || !form.email) {
      alert('Please fill in your name and email.')
      return
    }

    setStatus('loading')

    const { error } = await supabase.from('bookings').insert({
      room_id: room.id,
      room_name: room.name,
      guest_name: form.name,
      guest_email: form.email,
      guest_phone: form.phone,
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
      nights: nights,
      total_price: total,
      status: 'pending',
    })

    if (error) {
      console.error('Booking error:', error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <main className="pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="h-80 bg-gray-200 rounded-2xl mb-4" />
              <div className="flex gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 flex-1 bg-gray-200 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-64 bg-gray-200 rounded-2xl mt-8" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!room) {
    return (
      <main className="pt-32 text-center min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Room not found</h1>
        <Link href="/rooms" className="text-primary mt-4 inline-block hover:underline">
          ← Back to Rooms
        </Link>
      </main>
    )
  }

  if (status === 'success') {
    return (
      <main className="pt-32 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-500 mb-2">
            Thank you <span className="font-semibold text-primary">{form.name}</span>!
          </p>
          <p className="text-gray-500 mb-2">
            Your booking for <span className="font-semibold">{room.name}</span> has been received.
          </p>
          <p className="text-gray-500 mb-8">
            {nights} night{nights > 1 ? 's' : ''} · {checkIn} → {checkOut} · {total.toLocaleString()} DZD total
          </p>
          <p className="text-sm text-gray-400 mb-8">
            We will contact you at <span className="text-primary">{form.email}</span> to confirm.
          </p>
          <Link
            href="/rooms"
            className="inline-block bg-primary text-white font-medium px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            Browse More Rooms
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm"
        >
          ← Back to all rooms
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT: IMAGES + INFO */}
          <div>
            <div className="rounded-2xl overflow-hidden h-80 mb-4">
              <img
                src={room.image_urls?.[activeImage]}
                alt={room.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            <div className="flex gap-3 mb-8">
              {room.image_urls?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-xl overflow-hidden h-20 flex-1 border-2 transition-all duration-200 ${
                    activeImage === i ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                {room.type}
              </span>
              <span className="text-gray-400 text-sm">📐 {room.size}</span>
              <span className="text-gray-400 text-sm">👥 Up to {room.capacity} guests</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{room.name}</h1>
            <p className="text-gray-500 leading-relaxed mb-8">{room.description}</p>

            <h3 className="font-semibold text-gray-900 mb-4">Room Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {room.amenities?.map((a) => (
                <div key={a} className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-primary text-xs">✓</span>
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: BOOKING FORM */}
          <div>
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-primary">
                  {room.price.toLocaleString()}
                </span>
                <span className="text-gray-400">DZD / night</span>
              </div>

              <form onSubmit={handleBooking} className="flex flex-col gap-5">

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                      Check-in
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value)
                        if (checkOut && e.target.value >= checkOut) setCheckOut('')
                      }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                      Check-out
                    </label>
                    <input
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    {Array.from({ length: room.capacity }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {nights > 0 && (
                  <div className="bg-accent rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{room.price.toLocaleString()} DZD × {nights} night{nights > 1 ? 's' : ''}</span>
                      <span>{total.toLocaleString()} DZD</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxes & fees</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span className="text-primary">{total.toLocaleString()} DZD</span>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-2">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
                    Your Details
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed text-base"
                >
                  {status === 'loading'
                    ? 'Processing...'
                    : `Reserve Now · ${nights > 0 ? total.toLocaleString() + ' DZD' : 'Select Dates'}`}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Free cancellation · No payment required now · Confirmation by email
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}