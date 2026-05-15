import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type NavItem = { label: string; href: string };
type TrekCard = { title: string; subtitle: string; image: string };
type SeasonCard = { title: string; description: string; image: string };

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Treks', href: '#treks' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Seasons', href: '#seasons' },
  { label: 'Contact', href: '#contact' },
];

const trekCards: TrekCard[] = [
  { title: 'Winter Summit Trek', subtitle: '12 Days • Advanced', image: '/images/mountain.svg' },
  { title: 'Wildflower Valley', subtitle: '5 Days • Easy', image: '/images/valley.svg' },
  { title: 'Alpine Lake Trek', subtitle: '8 Days • Moderate', image: '/images/lake.svg' },
];

const galleryImages = ['/images/gallery1.svg', '/images/gallery2.svg', '/images/gallery3.svg'];

const seasonCards: SeasonCard[] = [
  { title: 'Spring', description: 'Wildflowers and green valleys.', image: '/images/season-spring.svg' },
  { title: 'Summer', description: 'Perfect for alpine treks.', image: '/images/season-summer.svg' },
  { title: 'Winter', description: 'Snow-covered magical landscapes.', image: '/images/season-winter.svg' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const treksRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const seasonsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current?.querySelectorAll('a, button, .brand'), {
        opacity: 0,
        y: -18,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      });

      gsap.from(heroRef.current?.querySelectorAll('.reveal'), {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.16,
        delay: 0.2,
      });

      gsap.from(heroVideoRef.current, {
        opacity: 0,
        duration: 1.4,
        ease: 'power2.out',
      });

      [aboutRef.current, treksRef.current, galleryRef.current, seasonsRef.current, contactRef.current].forEach((section) => {
        if (!section) return;
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div ref={rootRef} className="min-h-screen bg-slate-950 text-slate-100">
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-slate-950/95 shadow-2xl backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="brand text-2xl font-black tracking-tight text-white md:text-3xl">
            <span className="text-amber-300">Kashmir</span>Trek
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group text-sm font-medium text-slate-200 transition hover:text-amber-300"
              >
                <span>{item.label}</span>
                <span className="block h-[2px] w-full scale-x-0 transform bg-amber-300 transition duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-400 md:inline-flex"
            >
              Book Now
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-100 transition hover:bg-slate-800 md:hidden"
              onClick={() => setMenuOpen((previous) => !previous)}
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Toggle navigation</span>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        <div className={`overflow-hidden bg-slate-950/95 transition-[max-height] duration-500 md:hidden ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
          <nav className="space-y-1 px-5 pb-5 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800 hover:text-amber-300"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-slate-950 pt-28"
          id="hero"
        >
          <video
            ref={heroVideoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center sm:px-6 lg:px-8">
            <span className="reveal mb-6 inline-flex rounded-full bg-amber-300/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-amber-200 ring-1 ring-amber-300/20">
              Kashmir Treks in motion
            </span>
            <h1 className="reveal max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Explore Kashmir through modern React motion and cinematic visuals.
            </h1>
            <p className="reveal mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              A TypeScript React upgrade with GSAP-powered scroll animations, local SVG artwork, and an immersive hero video.
            </p>
            <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#treks"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-400"
              >
                Explore Treks
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-300"
              >
                Book a Guide
              </a>
            </div>
          </div>
        </section>

        <section ref={aboutRef} id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">About KashmirTrek</span>
              <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Journeys shaped by local expertise and cinematic design.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                KashmirTrek blends premium adventure planning with a polished digital experience. This TypeScript upgrade includes GSAP animation, responsive navigation, and curated visual assets for an elegant landing page.
              </p>
            </div>
            <div className="rounded-[2rem] bg-slate-900/70 p-8 ring-1 ring-white/10 backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-950/60 p-6 shadow-[0_20px_70px_-30px_rgba(6,11,34,0.8)]">
                  <h3 className="text-xl font-semibold text-white">Cinematic motion</h3>
                  <p className="mt-3 text-slate-400">GSAP brings gentle reveals and scroll-triggered fades to every section.</p>
                </div>
                <div className="rounded-3xl bg-slate-950/60 p-6 shadow-[0_20px_70px_-30px_rgba(6,11,34,0.8)]">
                  <h3 className="text-xl font-semibold text-white">Local visual assets</h3>
                  <p className="mt-3 text-slate-400">Every image is included locally as SVG art, so the page loads fast and looks sharp.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={treksRef} id="treks" className="bg-slate-900/50 py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-white">Popular Treks</h2>
                <p className="mt-3 max-w-2xl text-slate-400">A selection of routes that highlight Kashmir's peaks, valleys, and lakes.</p>
              </div>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-300 hover:text-amber-300"
              >
                View Gallery
              </a>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {trekCards.map((trek) => (
                <article key={trek.title} className="card overflow-hidden rounded-[2rem] border border-slate-700/50 bg-slate-950/85 shadow-[0_20px_70px_-30px_rgba(6,11,34,0.8)] transition duration-500 hover:-translate-y-2 hover:border-amber-300/40 hover:bg-slate-900/90">
                  <img src={trek.image} alt={trek.title} className="h-56 w-full object-cover" />
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-white">{trek.title}</h3>
                    <p className="mt-3 text-slate-400">{trek.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={galleryRef} id="gallery" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tight text-white">Gallery</h2>
            <p className="mt-3 max-w-2xl text-slate-400">Hand-crafted vector scenes give the page a cohesive, modern mood.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {galleryImages.map((image) => (
              <img key={image} src={image} alt="Gallery" className="rounded-[2rem] border border-slate-700/60 bg-slate-950/80 object-cover shadow-xl" />
            ))}
          </div>
        </section>

        <section ref={seasonsRef} id="seasons" className="bg-slate-900/50 py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-4xl font-black tracking-tight text-white">Best Seasons</h2>
              <p className="mt-3 max-w-2xl text-slate-400">Seasonal adventure options designed to match Kashmir's natural highlights.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {seasonCards.map((season) => (
                <div key={season.title} className="rounded-[2rem] bg-slate-950/85 p-8 ring-1 ring-slate-700/60 transition hover:-translate-y-1 hover:ring-amber-300/40">
                  <img src={season.image} alt={season.title} className="mb-6 h-48 w-full rounded-3xl object-cover" />
                  <h3 className="text-2xl font-semibold text-white">{season.title}</h3>
                  <p className="mt-3 text-slate-400">{season.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={contactRef} id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900/80 p-10 ring-1 ring-white/10 backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-white">Contact Us</h2>
                <p className="mt-4 text-slate-400">Ready to book your next Kashmir trekking adventure with a polished digital experience.</p>
              </div>
              <div className="space-y-4 text-slate-200">
                <p>
                  <span className="font-semibold text-amber-300">Phone:</span> +91 9797472650
                </p>
                <p>
                  <span className="font-semibold text-amber-300">WhatsApp:</span>{' '}
                  <a href="https://wa.me/919797472650" className="text-slate-100 transition hover:text-amber-300">
                    Chat on WhatsApp
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-amber-300">Email:</span>{' '}
                  <a href="mailto:shahtajamul88@gmail.com" className="text-slate-100 transition hover:text-amber-300">
                    shahtajamul88@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
