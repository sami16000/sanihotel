'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen w-full overflow-hidden">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          
          {/* Badge */}
          <div className={`transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
              Algeria · Mountain Retreat
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-5xl md:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Where Nature Meets
            <span className="block text-gold">Luxury</span>
          </h1>

          {/* Subheading */}
          <p className={`text-white/80 text-lg md:text-xl max-w-2xl mb-10 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Nestled in the heart of Algeria's most breathtaking mountains, SaniHotel offers an unforgettable escape from the ordinary.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href="/rooms"
              className="bg-primary hover:bg-primary-dark text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              Explore Rooms
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full transition-all duration-300"
            >
              Discover More
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-0.5 h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '50+', label: 'Luxury Rooms' },
            { number: '10+', label: 'Years Experience' },
            { number: '5000+', label: 'Happy Guests' },
            { number: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-gold mb-1">{stat.number}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="text-primary-light text-sm font-medium tracking-widest uppercase">About SaniHotel</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
              A Sanctuary in the<br />Algerian Mountains
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              SaniHotel is more than just a place to stay — it's an experience. Surrounded by towering peaks and lush forests, our hotel blends modern luxury with the raw beauty of Algeria's northern mountains.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Every room is designed to bring the outdoors in, with panoramic views, natural materials, and thoughtful details that make you feel at home in nature.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
            >
              Learn our story →
            </Link>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden h-96">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
                alt="SaniHotel exterior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-white/70 text-sm mt-1">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROOMS PREVIEW ===== */}
      <section className="py-24 bg-accent px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary-light text-sm font-medium tracking-widest uppercase">Our Rooms</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Find Your Perfect Room</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">From cozy mountain-view singles to expansive luxury suites, every room tells a story.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mountain View Room',
                price: '8,500',
                image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
                tag: 'Most Popular',
                desc: 'Wake up to stunning panoramic mountain views every morning.',
              },
              {
                name: 'Forest Suite',
                price: '14,000',
                image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80',
                tag: 'Best Value',
                desc: 'Immerse yourself in nature with floor-to-ceiling forest views.',
              },
              {
                name: 'Presidential Suite',
                price: '25,000',
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
                tag: 'Luxury',
                desc: 'The ultimate mountain luxury experience with private terrace.',
              },
            ].map((room) => (
              <div key={room.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    {room.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{room.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">{room.price}</span>
                      <span className="text-gray-400 text-sm"> DZD/night</span>
                    </div>
                    <Link
                      href="/rooms"
                      className="bg-primary text-white text-sm px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/rooms"
              className="inline-block border-2 border-primary text-primary font-medium px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* ===== AMENITIES ===== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary-light text-sm font-medium tracking-widest uppercase">Why Choose Us</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3">Everything You Need</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: '🏔️', title: 'Mountain Views', desc: 'Breathtaking panoramic views from every room' },
            { icon: '🍽️', title: 'Fine Dining', desc: 'Traditional Algerian cuisine with a modern twist' },
            { icon: '♨️', title: 'Spa & Wellness', desc: 'Relax and rejuvenate in our world-class spa' },
            { icon: '🏊', title: 'Heated Pool', desc: 'Indoor heated pool open all year round' },
            { icon: '🚗', title: 'Free Parking', desc: 'Spacious secure parking for all guests' },
            { icon: '📶', title: 'Free WiFi', desc: 'High-speed internet throughout the hotel' },
            { icon: '🎿', title: 'Hiking Trails', desc: 'Guided mountain hikes for all levels' },
            { icon: '🛎️', title: '24/7 Concierge', desc: 'Round-the-clock service for all your needs' },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 rounded-2xl hover:bg-accent transition-colors duration-300 group">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-24 bg-primary px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">Guest Reviews</span>
            <h2 className="text-4xl font-bold text-white mt-3">What Our Guests Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Karim Benali',
                location: 'Algiers, Algeria',
                review: 'Absolutely stunning hotel. The mountain views from our room were incredible. The staff were so warm and welcoming. Will definitely come back!',
                rating: 5,
              },
              {
                name: 'Sarah Mitchell',
                location: 'London, UK',
                review: 'Best hotel experience I have ever had in North Africa. The food was exceptional, the spa was heavenly, and the scenery was out of this world.',
                rating: 5,
              },
              {
                name: 'Omar Tlemcani',
                location: 'Oran, Algeria',
                review: 'Perfect getaway from the city. Clean, luxurious, and the hiking trails were amazing. The sunset from the terrace was unforgettable.',
                rating: 5,
              },
            ].map((review) => (
              <div key={review.name} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {Array(review.rating).fill('★').map((star, i) => (
                    <span key={i} className="text-gold">{star}</span>
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-6 italic">"{review.review}"</p>
                <div>
                  <div className="font-semibold text-white">{review.name}</div>
                  <div className="text-white/50 text-sm">{review.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Ready for Your Mountain
            <span className="text-primary"> Escape?</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Book your stay today and experience the magic of Algeria's mountains like never before.
          </p>
          <Link
            href="/rooms"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg"
          >
            Book Your Room Now
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="text-2xl font-bold mb-4">Sani<span className="text-gold">Hotel</span></div>
            <p className="text-gray-400 text-sm leading-relaxed">A luxury mountain retreat in the heart of Algeria. Your perfect escape from the ordinary.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {['Home', 'Rooms', 'About', 'Contact'].map((l) => (
                <Link key={l} href={`/${l.toLowerCase() === 'home' ? '' : l.toLowerCase()}`} className="text-gray-400 text-sm hover:text-gold transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <span>📍 Tizi Ouzou, Algeria</span>
              <span>📞 +213 XXX XXX XXX</span>
              <span>✉️ info@sanihotel.dz</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'Twitter'].map((s) => (
                <span key={s} className="text-gray-400 text-sm hover:text-gold cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          © 2026 SaniHotel. All rights reserved.
        </div>
      </footer>
    </main>
  )
}