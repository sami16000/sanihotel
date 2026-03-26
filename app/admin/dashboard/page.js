 'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // Room form state
  const [roomForm, setRoomForm] = useState({
    name: '', type: 'Standard', description: '',
    price: '', capacity: '', size: '', available: true
  })
  const [editingRoom, setEditingRoom] = useState(null)
  const [roomStatus, setRoomStatus] = useState('idle')

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin')
      return
    }
    setUser(session.user)
    fetchAll()
  }

  async function fetchAll() {
    setLoading(true)
    const [b, m, r] = await Promise.all([
      supabase.from('bookings').select('*').order('created_at', { ascending: false }),
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
      supabase.from('rooms').select('*').order('price', { ascending: true }),
    ])
    setBookings(b.data || [])
    setMessages(m.data || [])
    setRooms(r.data || [])
    setLoading(false)
  }

  async function updateBookingStatus(id, newStatus) {
    await supabase.from('bookings').update({ status: newStatus }).eq('id', id)
    fetchAll()
  }

  async function markMessageRead(id) {
    await supabase.from('messages').update({ read: true }).eq('id', id)
    fetchAll()
  }

  async function deleteMessage(id) {
    await supabase.from('messages').delete().eq('id', id)
    fetchAll()
  }

  async function deleteBooking(id) {
    await supabase.from('bookings').delete().eq('id', id)
    fetchAll()
  }

  async function handleRoomSubmit(e) {
    e.preventDefault()
    setRoomStatus('loading')

    const roomData = {
      name: roomForm.name,
      type: roomForm.type,
      description: roomForm.description,
      price: parseInt(roomForm.price),
      capacity: parseInt(roomForm.capacity),
      size: roomForm.size,
      available: roomForm.available,
      image_urls: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      ],
      amenities: ['Free WiFi', 'Private Bathroom', 'Air Conditioning'],
    }

    if (editingRoom) {
      await supabase.from('rooms').update(roomData).eq('id', editingRoom)
    } else {
      await supabase.from('rooms').insert(roomData)
    }

    setRoomForm({ name: '', type: 'Standard', description: '', price: '', capacity: '', size: '', available: true })
    setEditingRoom(null)
    setRoomStatus('idle')
    fetchAll()
  }

  async function deleteRoom(id) {
    if (!confirm('Are you sure you want to delete this room?')) return
    await supabase.from('rooms').delete().eq('id', id)
    fetchAll()
  }

  function startEditRoom(room) {
    setEditingRoom(room.id)
    setRoomForm({
      name: room.name,
      type: room.type,
      description: room.description,
      price: room.price,
      capacity: room.capacity,
      size: room.size,
      available: room.available,
    })
    setActiveTab('rooms')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  // Stats
  const totalRevenue = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.total_price, 0)
  const pendingCount = bookings.filter((b) => b.status === 'pending').length
  const unreadMessages = messages.filter((m) => !m.read).length

  const statusColor = (status) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-700'
    if (status === 'cancelled') return 'bg-red-100 text-red-700'
    return 'bg-amber-100 text-amber-700'
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full mb-4"
          />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ===== TOP NAV ===== */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">
            Sani<span className="text-gold">Hotel</span>
            <span className="text-gray-400 text-sm font-normal ml-3">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden md:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-red-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: '🛏️', color: 'bg-blue-50 text-blue-700' },
            { label: 'Pending', value: pendingCount, icon: '⏳', color: 'bg-amber-50 text-amber-700' },
            { label: 'Revenue (DZD)', value: totalRevenue.toLocaleString(), icon: '💰', color: 'bg-green-50 text-green-700' },
            { label: 'Unread Messages', value: unreadMessages, icon: '✉️', color: 'bg-purple-50 text-purple-700' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className={`inline-block text-2xl p-2 rounded-xl mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ===== TABS ===== */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-fit">
          {[
            { id: 'overview', label: 'Bookings', icon: '🛏️' },
            { id: 'messages', label: 'Messages', icon: '✉️' },
            { id: 'rooms', label: 'Rooms', icon: '🏨' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.id === 'messages' && unreadMessages > 0 && (
                <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
              {tab.id === 'overview' && pendingCount > 0 && (
                <span className="bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ===== BOOKINGS TAB ===== */}
          {activeTab === 'overview' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">All Bookings ({bookings.length})</h2>
                </div>

                {bookings.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-3">🛏️</div>
                    <p>No bookings yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 text-left">Guest</th>
                          <th className="px-6 py-3 text-left">Room</th>
                          <th className="px-6 py-3 text-left">Dates</th>
                          <th className="px-6 py-3 text-left">Total</th>
                          <th className="px-6 py-3 text-left">Status</th>
                          <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900 text-sm">{booking.guest_name}</div>
                              <div className="text-gray-400 text-xs">{booking.guest_email}</div>
                              {booking.guest_phone && (
                                <div className="text-gray-400 text-xs">{booking.guest_phone}</div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-700">{booking.room_name}</div>
                              <div className="text-gray-400 text-xs">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-700">{booking.check_in}</div>
                              <div className="text-gray-400 text-xs">→ {booking.check_out}</div>
                              <div className="text-gray-400 text-xs">{booking.nights} night{booking.nights > 1 ? 's' : ''}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-primary text-sm">
                                {booking.total_price.toLocaleString()} DZD
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${statusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2 flex-wrap">
                                {booking.status !== 'confirmed' && (
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                    className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
                                  >
                                    Confirm
                                  </button>
                                )}
                                {booking.status !== 'cancelled' && (
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                    className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteBooking(booking.id)}
                                  className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ===== MESSAGES TAB ===== */}
          {activeTab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">
                    All Messages ({messages.length})
                    {unreadMessages > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {unreadMessages} unread
                      </span>
                    )}
                  </h2>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-3">✉️</div>
                    <p>No messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`px-6 py-5 hover:bg-gray-50 transition-colors ${!msg.read ? 'border-l-4 border-primary' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-semibold text-gray-900 text-sm">{msg.name}</span>
                              {!msg.read && (
                                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>
                              )}
                              {msg.subject && (
                                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                                  {msg.subject}
                                </span>
                              )}
                            </div>
                            <div className="text-gray-400 text-xs mb-2">
                              {msg.email} {msg.phone && `· ${msg.phone}`} · {new Date(msg.created_at).toLocaleDateString()}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{msg.message}</p>
                          </div>
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            {!msg.read && (
                              <button
                                onClick={() => markMessageRead(msg.id)}
                                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                              >
                                Mark Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="text-xs bg-red-50 text-red-500 px-3 py-1 rounded-full hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ===== ROOMS TAB ===== */}
          {activeTab === 'rooms' && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Add / Edit Room Form */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-6">
                  {editingRoom ? '✏️ Edit Room' : '➕ Add New Room'}
                </h2>
                <form onSubmit={handleRoomSubmit} className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Room Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Mountain View Room"
                      value={roomForm.name}
                      onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Type *</label>
                    <select
                      value={roomForm.type}
                      onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    >
                      <option>Standard</option>
                      <option>Deluxe</option>
                      <option>Suite</option>
                      <option>Family</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Price per Night (DZD) *</label>
                    <input
                      type="number"
                      placeholder="e.g. 8500"
                      value={roomForm.price}
                      onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Capacity (guests) *</label>
                    <input
                      type="number"
                      placeholder="e.g. 2"
                      value={roomForm.capacity}
                      onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 35 m²"
                      value={roomForm.size}
                      onChange={(e) => setRoomForm({ ...roomForm, size: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Available</label>
                    <select
                      value={roomForm.available}
                      onChange={(e) => setRoomForm({ ...roomForm, available: e.target.value === 'true' })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="true">Yes — Available</option>
                      <option value="false">No — Unavailable</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Description</label>
                    <textarea
                      placeholder="Describe the room..."
                      value={roomForm.description}
                      onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex gap-3">
                    <button
                      type="submit"
                      disabled={roomStatus === 'loading'}
                      className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-70"
                    >
                      {roomStatus === 'loading' ? 'Saving...' : editingRoom ? 'Update Room' : 'Add Room'}
                    </button>
                    {editingRoom && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingRoom(null)
                          setRoomForm({ name: '', type: 'Standard', description: '', price: '', capacity: '', size: '', available: true })
                        }}
                        className="border border-gray-200 text-gray-500 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Rooms List */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">All Rooms ({rooms.length})</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {rooms.map((room) => (
                    <div key={room.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                      <img
                        src={room.image_urls?.[0]}
                        alt={room.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">{room.name}</div>
                        <div className="text-gray-400 text-xs mt-0.5">
                          {room.type} · {room.size} · {room.capacity} guests
                        </div>
                        <div className="text-primary font-semibold text-sm mt-0.5">
                          {room.price.toLocaleString()} DZD/night
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                        room.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {room.available ? 'Available' : 'Unavailable'}
                      </span>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => startEditRoom(room)}
                          className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteRoom(room.id)}
                          className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  )
}
