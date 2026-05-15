'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Star, MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';

// Loading Component
function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0B1120] via-[#0B1120] to-[#1a1f3a] opacity-0 animate-[fadeOut_0.8s_ease-out_0.5s_forwards]">
      <div className="space-y-4 text-center">
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-[#D4AF37] animate-[bounce_1.4s_infinite]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-[#F8FAFC] font-montserrat font-bold tracking-wider">KashmirTrek</p>
      </div>
    </div>
  );
}

// Premium Navbar Component
function PremiumNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Treks', href: '#treks' },
    { label: 'Packages', href: '#packages' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0B1120]/80 backdrop-blur-2xl shadow-2xl' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <a href="#home" className="text-2xl font-black tracking-tight text-white md:text-3xl font-montserrat">
          KashmirTrek
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-[#F8FAFC] transition duration-300 hover:text-[#D4AF37]"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#D4AF37] to-[#7DD3FC] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/919797472650"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400 transition duration-300 hover:bg-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] lg:inline-flex"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>

          {/* Book Now Button */}
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-[#D4AF37] to-[#7DD3FC] px-6 py-2.5 text-sm font-semibold text-[#0B1120] transition duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 md:inline-flex"
          >
            Book Now
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#0B1120]/50 backdrop-blur-md text-[#D4AF37] transition duration-300 hover:bg-[#0B1120]/80 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-[#0B1120]/95 backdrop-blur-2xl border-t border-[#D4AF37]/20">
          <nav className="mx-auto max-w-7xl space-y-2 px-5 py-4 lg:px-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-[#F8FAFC] transition duration-300 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/919797472650"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-green-400 transition duration-300 hover:bg-green-500/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 1000 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

// Main App Component
function App() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const packages = [
    {
      id: 1,
      title: 'Gulmarg Trek',
      duration: '5 Days',
      rating: 4.9,
      price: '₹12,999',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    },
    {
      id: 2,
      title: 'Sonamarg Adventure',
      duration: '7 Days',
      rating: 4.8,
      price: '₹15,999',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&h=500&fit=crop',
    },
    {
      id: 3,
      title: 'Snow Camping',
      duration: '4 Days',
      rating: 4.9,
      price: '₹9,999',
      image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=500&h=500&fit=crop',
    },
    {
      id: 4,
      title: 'Couple Tour Package',
      duration: '6 Days',
      rating: 4.7,
      price: '₹18,999',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=500&fit=crop',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Adventure Enthusiast',
      text: 'An unforgettable experience! The guides were knowledgeable, and the views were absolutely breathtaking.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Travel Blogger',
      text: 'KashmirTrek redefined luxury trekking for me. Premium service with authentic local experiences.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      name: 'Aisha Khan',
      role: 'Corporate Executive',
      text: 'Perfect escape from city life. Every detail was perfectly curated. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC]">
      {showLoading && <LoadingAnimation />}

      <PremiumNavbar />

      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; pointer-events: none; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
      `}</style>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden pt-32 min-h-screen flex items-center justify-center">
          {/* Background Video or Gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#1a2a4a] to-[#0B1120]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.1),_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(125,211,252,0.05),_transparent_50%)]" />
            
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#D4AF37]/10 animate-pulse"
                style={{
                  width: Math.random() * 100 + 20 + 'px',
                  height: Math.random() * 100 + 20 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 5 + 's',
                }}
              />
            ))}
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 z-1 bg-black/40" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8 animate-fade-in">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 inline-flex rounded-full bg-[#D4AF37]/10 px-4 py-2 ring-1 ring-[#D4AF37]/30 backdrop-blur-md"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] font-montserrat">
                Premium Luxury Experiences
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black font-montserrat tracking-tight text-white mb-6 leading-tight"
            >
              Explore The <span className="bg-gradient-to-r from-[#D4AF37] to-[#7DD3FC] bg-clip-text text-transparent">Hidden Beauty</span> Of Kashmir
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-[#F8FAFC]/80 mb-10 max-w-2xl mx-auto"
            >
              Luxury trekking, camping & adventure experiences curated for the discerning traveler.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#packages"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#7DD3FC] text-[#0B1120] font-semibold transition duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105"
              >
                Book Now
              </a>
              <a
                href="#treks"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#D4AF37]/50 text-[#F8FAFC] font-semibold transition duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] backdrop-blur-md"
              >
                Explore Treks
              </a>
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="relative py-20 bg-[#0B1120]/50 border-y border-[#D4AF37]/10">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: '500+', desc: 'Happy Travelers' },
                { label: '50+', desc: 'Trek Locations' },
                { label: '4.9', desc: 'Average Rating' },
                { label: '24/7', desc: 'Expert Support' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-4xl font-bold font-montserrat bg-gradient-to-r from-[#D4AF37] to-[#7DD3FC] bg-clip-text text-transparent mb-2">
                    {stat.label === '4.9' ? '4.9' : stat.label}
                  </div>
                  <p className="text-[#F8FAFC]/70 text-sm font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-24 relative">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black font-montserrat text-white mb-4">
                Premium Packages
              </h2>
              <p className="text-[#F8FAFC]/70 max-w-2xl mx-auto">
                Handcrafted luxury experiences for every adventure seeker
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-2xl bg-[#1a2a4a] border border-[#D4AF37]/20 transition duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-[#0B1120]">
                    <motion.img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.15 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-montserrat text-white mb-2">
                      {pkg.title}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-[#F8FAFC]/60">{pkg.duration}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-[#D4AF37]">{pkg.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold font-montserrat text-[#D4AF37]">
                        {pkg.price}
                      </span>
                    </div>

                    <motion.a
                      href="https://wa.me/919797472650"
                      className="block w-full text-center px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#7DD3FC] text-[#0B1120] font-semibold transition duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Package
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Treks Section */}
        <section id="treks" className="py-24 bg-[#0B1120]/50 border-y border-[#D4AF37]/10">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black font-montserrat text-white mb-4">
                Featured Treks
              </h2>
              <p className="text-[#F8FAFC]/70 max-w-2xl mx-auto">
                Discover iconic trails through Kashmir's pristine landscapes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Gulmarg Summit', difficulty: 'Moderate', altitude: '2,650m', days: '5 Days' },
                { name: 'Sonamarg Loop', difficulty: 'Easy', altitude: '2,100m', days: '3 Days' },
                { name: 'Pahalgam Valley', difficulty: 'Hard', altitude: '3,500m', days: '7 Days' },
              ].map((trek, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a2a4a] to-[#0B1120] border border-[#D4AF37]/20 p-8 transition duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.1),_transparent_60%)]" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-montserrat text-white mb-4">{trek.name}</h3>
                    <div className="space-y-3 text-[#F8FAFC]/80">
                      <p className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">•</span> Difficulty: {trek.difficulty}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">•</span> Altitude: {trek.altitude}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-[#D4AF37]">•</span> Duration: {trek.days}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black font-montserrat text-white mb-4">
                Gallery
              </h2>
              <p className="text-[#F8FAFC]/70 max-w-2xl mx-auto">
                Cinematic views of Kashmir's breathtaking landscapes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  style={{ gridColumn: idx % 5 === 0 ? 'span 2' : 'span 1', gridRow: idx % 3 === 0 ? 'span 2' : 'span 1' }}
                >
                  <motion.img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.15 }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 to-transparent flex items-end"
                  >
                    <div className="p-6 w-full">
                      <p className="text-white font-semibold">Kashmir Landscape</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="about" className="py-24 bg-[#0B1120]/50 border-y border-[#D4AF37]/10">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black font-montserrat text-white mb-4">
                What Travelers Say
              </h2>
              <p className="text-[#F8FAFC]/70 max-w-2xl mx-auto">
                Real stories from our premium clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl border border-[#D4AF37]/20 bg-[#0B1120]/80 backdrop-blur-xl p-8 transition duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover border border-[#D4AF37]/30"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <p className="font-semibold text-white font-montserrat">{testimonial.name}</p>
                      <p className="text-sm text-[#F8FAFC]/60">{testimonial.role}</p>
                    </div>
                  </div>

                  <p className="text-[#F8FAFC]/80 italic">"{testimonial.text}"</p>

                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#7DD3FC]/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.1),_transparent_70%)]" />

          <div className="relative z-10 mx-auto max-w-4xl px-5 text-center lg:px-8">
            <h2 className="text-4xl md:text-5xl font-black font-montserrat text-white mb-4">
              Ready For Your Next Adventure?
            </h2>
            <p className="text-lg text-[#F8FAFC]/70 mb-12 max-w-2xl mx-auto">
              Join thousands of travelers who've experienced the magic of Kashmir with us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919797472650"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-green-500 text-white font-semibold transition duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Booking
              </a>
              <a
                href="tel:+919797472650"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-[#D4AF37]/50 text-[#F8FAFC] font-semibold transition duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] backdrop-blur-md"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-[#0B1120]/95 border-t border-[#D4AF37]/10 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div>
                <a href="#home" className="text-2xl font-black font-montserrat text-white mb-4 inline-block">
                  KashmirTrek
                </a>
                <p className="text-[#F8FAFC]/60 text-sm">
                  Premium luxury trekking & adventure experiences in Kashmir.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold font-montserrat text-white mb-4">Quick Links</h3>
                <ul className="space-y-2 text-[#F8FAFC]/60 text-sm">
                  <li><a href="#home" className="transition hover:text-[#D4AF37]">Home</a></li>
                  <li><a href="#packages" className="transition hover:text-[#D4AF37]">Packages</a></li>
                  <li><a href="#gallery" className="transition hover:text-[#D4AF37]">Gallery</a></li>
                  <li><a href="#about" className="transition hover:text-[#D4AF37]">About</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-bold font-montserrat text-white mb-4">Contact</h3>
                <ul className="space-y-3 text-[#F8FAFC]/60 text-sm">
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#D4AF37]" />
                    <a href="tel:+919797472650" className="transition hover:text-[#D4AF37]">+91 9797472650</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#D4AF37]" />
                    <a href="mailto:shahtajamul88@gmail.com" className="transition hover:text-[#D4AF37]">shahtajamul88@gmail.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#D4AF37]" />
                    <span>Kashmir, India</span>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-bold font-montserrat text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] transition duration-300 hover:bg-[#D4AF37]/20"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/919797472650"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-500/10 text-green-400 transition duration-300 hover:bg-green-500/20"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[#D4AF37]/10 pt-8 text-center text-[#F8FAFC]/60 text-sm">
              <p>© 2026 KashmirTrek. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
