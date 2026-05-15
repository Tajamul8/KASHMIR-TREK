import { useEffect, useState } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Treks', href: '#treks' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Seasons', href: '#seasons' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/95 shadow-2xl backdrop-blur-xl' : 'bg-transparent'} `}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="text-2xl font-black tracking-tight text-white md:text-3xl">
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
              onClick={() => setMenuOpen((state) => !state)}
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Toggle navigation</span>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`overflow-hidden bg-slate-950/95 transition-[max-height] duration-500 md:hidden ${menuOpen ? 'max-h-60' : 'max-h-0'}`}>
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
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.15),_transparent_32%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.98))] pt-28">
          <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center sm:px-6 lg:px-8">
            <div className="mb-10 inline-flex rounded-full bg-amber-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-200 ring-1 ring-amber-300/20">
              Explore the new React navbar
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Modern navigation for unforgettable Kashmir treks.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              A smooth animated navbar built with React and Tailwind CSS, designed to feel premium, accessible, and responsive across every device.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a href="#treks" className="inline-flex items-center justify-center rounded-full bg-amber-300 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-400">
                View Treks
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-300">
                Contact Guide
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">About KashmirTrek</span>
              <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">Adventure-led journeys curated by local experts.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                KashmirTrek delivers premium trekking experiences across Kashmir's alpine valleys, pristine lakes, and Himalayan summits. Our animated navbar keeps explorers connected to every part of the journey.
              </p>
            </div>
            <div className="rounded-[2rem] bg-slate-900/70 p-8 ring-1 ring-white/10 backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-950/60 p-6 shadow-[0_20px_70px_-30px_rgba(6,11,34,0.8)]">
                  <h3 className="text-xl font-semibold text-white">Fast access</h3>
                  <p className="mt-3 text-slate-400">Instant navigation between sections with smooth state transitions.</p>
                </div>
                <div className="rounded-3xl bg-slate-950/60 p-6 shadow-[0_20px_70px_-30px_rgba(6,11,34,0.8)]">
                  <h3 className="text-xl font-semibold text-white">Responsive design</h3>
                  <p className="mt-3 text-slate-400">A mobile-friendly menu and animated interactions for every viewport.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="treks" className="bg-slate-900/50 py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {['Winter Summit Trek', 'Wildflower Valley', 'Alpine Lake Trek'].map((title, index) => (
                <article key={title} className="group overflow-hidden rounded-[2rem] border border-slate-700/50 bg-slate-950/75 p-8 transition duration-500 hover:-translate-y-2 hover:border-amber-300/40 hover:bg-slate-900/90">
                  <div className="mb-5 h-44 rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 transition duration-500 group-hover:from-amber-300/20 group-hover:to-amber-300/5" />
                  <h3 className="text-2xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-slate-400">{index === 0 ? '12 Days • Advanced' : index === 1 ? '5 Days • Easy' : '8 Days • Moderate'}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-white">Gallery</h2>
          <p className="mt-4 max-w-2xl text-slate-400">A clean, modern navigation experience that fits the KashmirTrek brand.</p>
        </section>

        <section id="seasons" className="bg-slate-900/50 py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black tracking-tight text-white">Best Seasons</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {['Spring', 'Summer', 'Winter'].map((season, index) => (
                <div key={season} className="rounded-[2rem] bg-slate-950/85 p-8 ring-1 ring-slate-700/60 transition hover:-translate-y-1 hover:ring-amber-300/40">
                  <h3 className="text-2xl font-semibold text-white">{season}</h3>
                  <p className="mt-3 text-slate-400">{index === 0 ? 'Wildflowers and green valleys.' : index === 1 ? 'Perfect for alpine treks.' : 'Snow-covered magical landscapes.'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900/80 p-10 ring-1 ring-white/10 backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-white">Contact Us</h2>
                <p className="mt-4 text-slate-400">Reach out to book your next Kashmir trekking adventure with a premium, animated interface.</p>
              </div>
              <div className="space-y-4 text-slate-200">
                <p><span className="font-semibold text-amber-300">Phone:</span> +91 9797472650</p>
                <p><span className="font-semibold text-amber-300">WhatsApp:</span> <a href="https://wa.me/919797472650" className="text-slate-100 transition hover:text-amber-300">Chat on WhatsApp</a></p>
                <p><span className="font-semibold text-amber-300">Email:</span> <a href="mailto:shahtajamul88@gmail.com" className="text-slate-100 transition hover:text-amber-300">shahtajamul88@gmail.com</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
