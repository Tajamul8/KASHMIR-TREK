import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Star, MapPin, Clock, AlertCircle, ChevronDown, Send, Phone, Mail, MapIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Trek {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Expert';
  image: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const trekPackages: Trek[] = [
  {
    id: 1,
    title: 'Spring Valley Trek',
    subtitle: 'Wildflower meadows & emerald valleys',
    price: 12000,
    duration: '5 Days',
    difficulty: 'Easy',
    image: '/KASHMIR-TREK/images/trek-spring.svg',
    description: 'Perfect for beginners. Experience blooming meadows and pristine valleys with expert guides.',
  },
  {
    id: 2,
    title: 'Alpine Summit Trek',
    subtitle: 'High altitude peaks & crystal lakes',
    price: 22000,
    duration: '8 Days',
    difficulty: 'Moderate',
    image: '/KASHMIR-TREK/images/trek-alpine.svg',
    description: 'Conquer alpine peaks and camp beside glacial lakes with panoramic Himalayan views.',
  },
  {
    id: 3,
    title: 'Kashmir Paradise Trek',
    subtitle: 'Ultimate adventure across major peaks',
    price: 35000,
    duration: '12 Days',
    difficulty: 'Advanced',
    image: '/KASHMIR-TREK/images/trek-paradise.svg',
    description: 'Expert mountaineers only. Navigate challenging terrain, summits, and extreme conditions.',
  },
  {
    id: 4,
    title: 'Winter Wonderland Trek',
    subtitle: 'Snow-covered mountains & frozen lakes',
    price: 18000,
    duration: '6 Days',
    difficulty: 'Moderate',
    image: '/KASHMIR-TREK/images/trek-winter.svg',
    description: 'Experience Kashmir\'s pristine snow-covered landscape in complete solitude and beauty.',
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rohan Sharma',
    location: 'Mumbai, India',
    text: 'The most incredible trekking experience of my life! Professional guides and breathtaking views.',
    rating: 5,
    image: '👨‍💼',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    location: 'London, UK',
    text: 'Perfectly organized trek. The safety measures and accommodation exceeded all expectations.',
    rating: 5,
    image: '👩‍💼',
  },
  {
    id: 3,
    name: 'Arjun Patel',
    location: 'Delhi, India',
    text: 'Worth every penny! Guides were knowledgeable, supportive, and genuinely passionate about trekking.',
    rating: 5,
    image: '👨‍🎓',
  },
];

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What is the best season for trekking in Kashmir?',
    answer: 'May-September offers ideal conditions with clear skies and stable weather. Winter treks are available for experienced trekkers.',
  },
  {
    id: 2,
    question: 'Do I need previous trekking experience?',
    answer: 'No! We offer treks for all fitness levels from Easy to Expert. Our guides will adjust the pace to your comfort.',
  },
  {
    id: 3,
    question: 'What is included in the trek package?',
    answer: 'Accommodation, meals, professional guides, permits, camping equipment, and safety gear are included.',
  },
  {
    id: 4,
    question: 'How do I book a trek?',
    answer: 'Click "Book Now" and fill the form, or contact us via WhatsApp at +91 9797472650 for personalized assistance.',
  },
  {
    id: 5,
    question: 'What about travel insurance and safety?',
    answer: 'We provide comprehensive safety briefings, emergency kits, and recommend travel insurance for international guests.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!loading) {
        gsap.from(navRef.current?.querySelectorAll('a, button'), {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
        });

        gsap.from(heroRef.current?.querySelectorAll('.reveal'), {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.3,
        });

        const cards = document.querySelectorAll('.trek-card');
        cards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 80%', once: true },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out',
          });

          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -12, duration: 0.3, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
          });
        });

        const statElements = statsRef.current?.querySelectorAll('.stat-number');
        if (statElements) {
          statElements.forEach((el) => {
            const finalValue = parseInt(el.textContent || '0');
            gsap.from(
              { value: 0 },
              {
                scrollTrigger: { trigger: el, start: 'top 80%', once: true },
                value: finalValue,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                  el.textContent = Math.floor(this.targets()[0].value).toLocaleString();
                },
              }
            );
          });
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, [loading]);

  const filteredTreks = activeFilter === 'All' ? trekPackages : trekPackages.filter((t) => t.difficulty === activeFilter);
  const galleryImages = [
    '/KASHMIR-TREK/images/gallery1.svg',
    '/KASHMIR-TREK/images/gallery2.svg',
    '/KASHMIR-TREK/images/gallery3.svg',
  ];

  const handleWhatsAppBooking = (trekTitle: string) => {
    const message = `Hi! I'm interested in booking the ${trekTitle} package.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919797472650?text=${encodedMessage}`, '_blank');
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Loading Animation */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-amber-300/30" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-300 border-r-amber-300 animate-spin" />
            <div className="absolute inset-4 rounded-full border-2 border-amber-300/20 animate-pulse" />
          </div>
        </div>
      )}

      {/* Sticky Navigation */}
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-slate-950/95 shadow-2xl backdrop-blur-xl border-b border-amber-300/10' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-2 text-2xl font-black tracking-tight md:text-3xl">
            <span className="text-amber-400">🏔️</span>
            <span>
              <span className="text-amber-400">Kashmir</span>Trek
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {['Home', 'Packages', 'Gallery', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group text-sm font-semibold text-slate-200 transition hover:text-amber-400"
              >
                {item}
                <div className="h-0.5 w-0 bg-amber-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={() => handleWhatsAppBooking('General Inquiry')}
              className="hidden rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:shadow-lg md:inline-flex"
            >
              📞 Book Now
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 transition hover:border-amber-400 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="bg-slate-950/95 backdrop-blur-xl border-b border-amber-300/10 md:hidden">
            <nav className="space-y-2 px-5 py-4">
              {['Home', 'Packages', 'Gallery', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block rounded-lg px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-amber-400/10 hover:text-amber-400"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section - Fullscreen */}
        <section ref={heroRef} id="home" className="relative h-screen overflow-hidden">
          <video
            ref={heroVideoRef}
            src="/KASHMIR-TREK/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/70" />

          <div className="relative flex h-full items-center justify-center">
            <div className="max-w-4xl px-5 text-center">
              <div className="reveal mb-6 inline-block">
                <span className="rounded-full bg-amber-400/15 px-4 py-2 text-sm font-bold uppercase tracking-widest text-amber-300 ring-1 ring-amber-400/30">
                  ✨ Experience Paradise
                </span>
              </div>

              <h1 className="reveal text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Explore Kashmir <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Treks</span>
              </h1>

              <p className="reveal mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
                Journey through pristine valleys, towering peaks, and enchanting alpine lakes with expert local guides.
              </p>

              <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="#packages"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-base font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Explore Packages
                  <ChevronDown size={20} className="transition group-hover:translate-y-1" />
                </a>
                <button
                  onClick={() => handleWhatsAppBooking('Consultation')}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-amber-400 bg-slate-950/40 px-8 py-4 text-base font-bold text-amber-400 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-amber-400/10"
                >
                  📱 WhatsApp Chat
                  <Phone size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="animate-bounce text-amber-400">
              <ChevronDown size={32} />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="relative bg-gradient-to-r from-slate-900 to-slate-950 py-20 sm:py-28">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: '500', desc: 'Happy Travelers' },
                { label: '50', desc: 'Trek Routes' },
                { label: '10000', desc: 'Summits Conquered' },
                { label: '99', desc: 'Success Rate %' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="stat-number text-5xl font-black text-amber-400">{stat.label}</div>
                  <p className="mt-2 text-slate-300">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trek Packages Section */}
        <section ref={packagesRef} id="packages" className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-amber-400">Our Collections</span>
              <h2 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">Trek Packages</h2>
              <p className="mt-6 text-lg text-slate-300">Choose your adventure. Every package includes professional guides, equipment, and unforgettable memories.</p>
            </div>

            {/* Filter Buttons */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {['All', 'Easy', 'Moderate', 'Advanced', 'Expert'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-6 py-2.5 font-semibold transition ${
                    activeFilter === filter
                      ? 'bg-amber-400 text-slate-950'
                      : 'border border-slate-600 text-slate-300 hover:border-amber-400 hover:text-amber-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Trek Cards */}
            <div className="grid gap-8 lg:grid-cols-2">
              {filteredTreks.map((trek) => (
                <div key={trek.id} className="trek-card group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl transition duration-500 hover:border-amber-400/40">
                  <img src={trek.image} alt={trek.title} className="h-64 w-full object-cover transition duration-500 group-hover:scale-110" />

                  <div className="relative p-8">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-white">{trek.title}</h3>
                        <p className="mt-1 flex items-center gap-2 text-amber-400">
                          <MapPin size={16} />
                          {trek.subtitle}
                        </p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        trek.difficulty === 'Easy'
                          ? 'bg-green-500/20 text-green-300'
                          : trek.difficulty === 'Moderate'
                            ? 'bg-blue-500/20 text-blue-300'
                            : trek.difficulty === 'Advanced'
                              ? 'bg-orange-500/20 text-orange-300'
                              : 'bg-red-500/20 text-red-300'
                      }`}>
                        {trek.difficulty}
                      </span>
                    </div>

                    <p className="text-slate-300">{trek.description}</p>

                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-700 pt-6">
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400">Duration</p>
                        <p className="mt-1 flex items-center gap-1 text-lg font-bold text-white">
                          <Clock size={18} /> {trek.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400">Price</p>
                        <p className="mt-1 text-2xl font-black text-amber-400">₹{trek.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleWhatsAppBooking(trek.title)}
                      className="mt-6 w-full rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 py-3 font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      Book on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-5xl font-black text-white">Why Choose KashmirTrek?</h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '🛡️', title: 'Safety First', desc: 'Certified guides, emergency kits, and comprehensive insurance coverage.' },
                { icon: '⭐', title: '500+ Reviews', desc: 'Trusted by travelers worldwide with exceptional 5-star ratings.' },
                { icon: '🏕️', title: 'Premium Camps', desc: 'Comfortable accommodations with hot meals and modern amenities.' },
                { icon: '📱', title: 'WhatsApp Support', desc: '24/7 customer support and real-time trek updates via WhatsApp.' },
                { icon: '🌲', title: 'Eco-Friendly', desc: 'We preserve Kashmir\'s pristine environment with sustainable practices.' },
                { icon: '👥', title: 'Expert Guides', desc: 'Local experts with 10+ years experience in Himalayan trekking.' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-slate-700/50 bg-slate-950/50 p-8 backdrop-blur transition hover:border-amber-400/40 hover:bg-slate-900/70">
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trip Schedule/Timeline */}
        <section ref={timelineRef} className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-5xl font-black text-white">Sample Trek Schedule</h2>
              <p className="mt-4 text-lg text-slate-400">Alpine Summit Trek (8 Days)</p>
            </div>

            <div className="space-y-8">
              {[
                { day: 'Day 1', title: 'Arrival & Acclimatization', desc: 'Meet at base camp, orientation briefing, and equipment distribution.' },
                { day: 'Day 2-3', title: 'Valley Exploration', desc: 'Trek through lush meadows, visit alpine lakes, spot local wildlife.' },
                { day: 'Day 4-6', title: 'Summit Push', desc: 'Challenging climbs, high altitude camps, summit day preparation.' },
                { day: 'Day 7', title: 'Summit Day', desc: 'Early morning start, reach the peak, panoramic views, descent begins.' },
                { day: 'Day 8', title: 'Descent & Farewell', desc: 'Final trek down, celebration dinner, return to base camp.' },
              ].map((item, i) => (
                <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-4 before:w-4 before:rounded-full before:bg-amber-400 before:ring-4 before:ring-slate-950">
                  <h3 className="text-lg font-bold text-amber-400">{item.day}</h3>
                  <h4 className="mt-1 text-xl font-bold text-white">{item.title}</h4>
                  <p className="mt-2 text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery & Image Carousel */}
        <section ref={galleryRef} id="gallery" className="relative bg-slate-900/50 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-5xl font-black text-white">Gallery</h2>
              <p className="mt-4 text-lg text-slate-400">Visual stories from our amazing treks</p>
            </div>

            <div className="mb-8 overflow-hidden rounded-2xl border border-slate-700/50">
              <img src={galleryImages[carouselIndex]} alt={`Gallery ${carouselIndex + 1}`} className="h-96 w-full object-cover" />
            </div>

            <div className="flex justify-center gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`h-3 rounded-full transition ${i === carouselIndex ? 'w-8 bg-amber-400' : 'w-3 bg-slate-600 hover:bg-slate-500'}`}
                />
              ))}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i + 1}`} className="rounded-xl border border-slate-700/50 object-cover transition hover:scale-105" />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialRef} className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-5xl font-black text-white">What Travelers Say</h2>
              <p className="mt-4 text-lg text-slate-400">Join 500+ satisfied adventure seekers</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((review) => (
                <div key={review.id} className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur transition hover:border-amber-400/40 hover:bg-slate-900/70">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{review.image}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 italic text-slate-300">"{review.text}"</p>

                  <div className="mt-6 border-t border-slate-700 pt-4">
                    <p className="font-bold text-white">{review.name}</p>
                    <p className="text-sm text-slate-400">{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="relative bg-slate-900/50 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-5xl font-black text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-950/50 transition hover:border-amber-400/40">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="flex w-full items-center justify-between bg-slate-900/50 p-6 text-left font-bold text-white hover:bg-slate-900/80"
                  >
                    {faq.question}
                    <ChevronDown size={20} className={`transition ${expandedFAQ === faq.id ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedFAQ === faq.id && (
                    <div className="border-t border-slate-700 bg-slate-950/30 px-6 py-4 text-slate-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-5xl font-black text-white">Get in Touch</h2>
              <p className="mt-4 text-lg text-slate-400">Have questions? We're here to help!</p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <form className="space-y-6 rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur">
                <div>
                  <label className="block text-sm font-semibold text-slate-300">Full Name</label>
                  <input type="text" className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white transition focus:border-amber-400 focus:outline-none" placeholder="Your Name" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300">Email</label>
                  <input type="email" className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white transition focus:border-amber-400 focus:outline-none" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300">Trek Interest</label>
                  <select className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white transition focus:border-amber-400 focus:outline-none">
                    <option>Select a trek package</option>
                    {trekPackages.map((trek) => (
                      <option key={trek.id}>{trek.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300">Message</label>
                  <textarea className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white transition focus:border-amber-400 focus:outline-none" rows={4} placeholder="Tell us about your adventure plans..." />
                </div>

                <button className="w-full rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 py-3 font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2">
                  <Send size={20} />
                  Send Message
                </button>
              </form>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6">
                  <div className="flex items-start gap-4">
                    <Phone size={28} className="mt-1 text-amber-400" />
                    <div>
                      <h3 className="font-bold text-white">Call Us</h3>
                      <p className="mt-2 text-slate-400">+91 9797472650</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6">
                  <div className="flex items-start gap-4">
                    <Mail size={28} className="mt-1 text-amber-400" />
                    <div>
                      <h3 className="font-bold text-white">Email</h3>
                      <p className="mt-2 text-slate-400">shahtajamul88@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6">
                  <div className="flex items-start gap-4">
                    <MapIcon size={28} className="mt-1 text-amber-400" />
                    <div>
                      <h3 className="font-bold text-white">Location</h3>
                      <p className="mt-2 text-slate-400">Kashmir Valley, Jammu & Kashmir, India</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="overflow-hidden rounded-xl border border-slate-700/50">
                  <iframe
                    title="Kashmir Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3299.6074577319746!2d75.33719731111115!3d34.18330977277435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e42f18db8ad97f%3A0x4c8c4c1e1c8c1c8c!2sKashmir%20Valley!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Professional Footer */}
      <footer className="relative border-t border-slate-700/50 bg-gradient-to-b from-slate-950 to-slate-950/95 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#home" className="flex items-center gap-2 text-2xl font-black">
                <span className="text-amber-400">🏔️</span>
                <span>
                  <span className="text-amber-400">Kashmir</span>Trek
                </span>
              </a>
              <p className="mt-4 text-slate-400">Premium trekking experiences in the heart of the Himalayas since 2020.</p>
            </div>

            <div>
              <h4 className="font-bold text-white">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-slate-400">
                {['Home', 'Packages', 'Gallery', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="transition hover:text-amber-400">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white">Follow Us</h4>
              <div className="mt-4 flex gap-4">
                {['📘', '📷', '🎥', '🐦'].map((icon, i) => (
                  <a key={i} href="#" className="text-2xl transition hover:scale-110">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white">Newsletter</h4>
              <div className="mt-4 flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none" />
                <button className="rounded-lg bg-amber-400 px-4 py-2 font-bold text-slate-950 transition hover:-translate-y-0.5">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-700/50 pt-8 text-center text-slate-400">
            <p>&copy; 2026 KashmirTrek. All rights reserved. | <a href="#" className="hover:text-amber-400">Privacy Policy</a> | <a href="#" className="hover:text-amber-400">Terms</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
