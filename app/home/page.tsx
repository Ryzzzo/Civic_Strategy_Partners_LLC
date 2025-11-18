'use client';

import { useState, useEffect, useRef } from 'react';

function AnimatedStat({ value, label, delay, visible }: { value: string; label: string; delay: number; visible: boolean }) {
  const [count, setCount] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (visible && !hasAnimated) {
      setHasAnimated(true);
      setTimeout(() => {
        setCount(value);
      }, delay);
    }
  }, [visible, value, delay, hasAnimated]);

  return (
    <div className="text-center">
      <div className="text-6xl font-bold mb-3 text-[#d4af37] transition-all duration-1000 ease-out">
        {hasAnimated ? count : '0'}
      </div>
      <div className="text-base text-[#94a3b8] font-light tracking-wide">
        {label}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...Array.from(prev), entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = [statsRef.current, servicesRef.current, videoRef.current, aboutRef.current];
    elements.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0f172a] text-white">
      <style dangerouslySetInnerHTML={{__html: "* { margin: 0; padding: 0; box-sizing: border-box; } html { scroll-behavior: smooth; } body { overflow-x: hidden; } .playfair { font-family: var(--font-playfair); } @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-up { animation: fadeInUp 0.8s ease-out forwards; } .glassmorphism { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(226, 232, 240, 0.1); } .gradient-bg { background: linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #334155); background-size: 400% 400%; animation: gradient-shift 30s ease infinite; } .gold-gradient-text { background: linear-gradient(135deg, #d4af37 0%, #f4e4a6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }"}} />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f172a]/95 backdrop-blur-md shadow-lg border-b border-[#334155]/30'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="playfair text-white font-semibold text-lg tracking-wider">
              CIVIC STRATEGY PARTNERS
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-[#e2e8f0] hover:text-[#d4af37] transition-colors text-sm font-medium">
                Home
              </a>
              <a href="#services" className="text-[#e2e8f0] hover:text-[#d4af37] transition-colors text-sm font-medium">
                Services
              </a>
              <a href="#about" className="text-[#e2e8f0] hover:text-[#d4af37] transition-colors text-sm font-medium">
                About
              </a>
              <a href="mailto:kevin@civicstrategypartners.com" className="text-[#e2e8f0] hover:text-[#d4af37] transition-colors text-sm font-medium">
                Contact
              </a>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
                className="bg-[#d4af37] hover:bg-[#c4a027] text-[#0f172a] px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d4af37]/20"
              >
                Get Started
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0f172a] border-t border-[#334155]/30">
            <div className="px-6 py-4 space-y-4">
              <a href="#home" className="block text-[#e2e8f0] hover:text-[#d4af37] transition-colors">Home</a>
              <a href="#services" className="block text-[#e2e8f0] hover:text-[#d4af37] transition-colors">Services</a>
              <a href="#about" className="block text-[#e2e8f0] hover:text-[#d4af37] transition-colors">About</a>
              <a href="mailto:kevin@civicstrategypartners.com" className="block text-[#e2e8f0] hover:text-[#d4af37] transition-colors">Contact</a>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
                className="block bg-[#d4af37] hover:bg-[#c4a027] text-[#0f172a] px-6 py-3 rounded-lg font-semibold text-center transition-all"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center z-10">
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-[#94a3b8] text-sm uppercase tracking-widest mb-8 font-medium">
              Marine-Owned. Mission-Driven. Federal-Focused.
            </p>
          </div>

          <h1
            className="playfair text-6xl sm:text-7xl lg:text-[96px] font-bold leading-[1.1] mb-8 tracking-tight animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Expert Guidance for<br />
            <span className="gold-gradient-text">Federal Market</span> Success
          </h1>

          <p
            className="text-[#e2e8f0] text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light animate-fade-up"
            style={{ animationDelay: '0.3s', lineHeight: '1.7' }}
          >
            Strategic consulting to help businesses win and perform on federal contracts with military precision and proven methodologies.
          </p>

          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
              className="inline-block bg-[#d4af37] hover:bg-[#c4a027] text-[#0f172a] px-10 py-4 rounded-lg font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d4af37]/30"
            >
              Schedule Consultation
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      <section id="stats" ref={statsRef} className="py-24 bg-[#1e293b] border-y border-[#334155]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatedStat value="14+" label="Years Federal Experience" delay={100} visible={visibleSections.has('stats')} />
            <AnimatedStat value="$500M+" label="Proposals Supported" delay={200} visible={visibleSections.has('stats')} />
            <AnimatedStat value="USMC" label="Marine Corps Veteran" delay={300} visible={visibleSections.has('stats')} />
            <AnimatedStat value="MBA" label="Strategic Leadership" delay={400} visible={visibleSections.has('stats')} />
          </div>
        </div>
      </section>

      <section id="services" ref={servicesRef} className="py-32 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className={`playfair text-5xl lg:text-6xl font-semibold mb-6 tracking-tight ${
              visibleSections.has('services') ? 'animate-fade-up' : 'opacity-0'
            }`}>
              How We Help You Win
            </h2>
            <p className={`text-[#94a3b8] text-lg max-w-2xl mx-auto ${
              visibleSections.has('services') ? 'animate-fade-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.1s', lineHeight: '1.7' }}>
              Comprehensive federal contracting expertise across every phase of the process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Proposal Development',
                description: 'Craft winning proposals that demonstrate clear value and technical excellence while maintaining full FAR compliance.',
                delay: '0s'
              },
              {
                title: 'Capture Management',
                description: 'Strategic opportunity identification and relationship building to position your business for success in the federal marketplace.',
                delay: '0.1s'
              },
              {
                title: 'Strategic Positioning',
                description: 'Navigate certifications, registrations, and competitive positioning to maximize your federal contracting potential.',
                delay: '0.2s'
              }
            ].map((service, index) => (
              <div
                key={index}
                className={`glassmorphism rounded-2xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#d4af37]/10 hover:border-[#d4af37]/30 ${
                  visibleSections.has('services') ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{ animationDelay: service.delay }}
              >
                <h3 className="playfair text-2xl font-semibold mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-[#94a3b8] mb-6 leading-relaxed" style={{ lineHeight: '1.7' }}>
                  {service.description}
                </p>
                <a
                  href={`mailto:kevin@civicstrategypartners.com?subject=Inquiry about ${service.title}`}
                  className="text-[#d4af37] hover:text-[#c4a027] font-medium inline-flex items-center transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="video" ref={videoRef} className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className={`playfair text-5xl lg:text-6xl font-semibold mb-8 ${
            visibleSections.has('video') ? 'animate-fade-up' : 'opacity-0'
          }`}>
            See Our Process in Action
          </h2>

          <div className={`glassmorphism rounded-3xl aspect-video flex items-center justify-center transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
            visibleSections.has('video') ? 'animate-fade-up' : 'opacity-0'
          }`} style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#d4af37]/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto border border-[#d4af37]/50 hover:bg-[#d4af37]/30 transition-all">
                <svg className="w-10 h-10 text-[#d4af37] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-[#94a3b8] text-sm uppercase tracking-wider">Video Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="py-32 bg-[#1e293b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3">
              <h2 className={`playfair text-5xl lg:text-6xl font-semibold mb-8 leading-tight ${
                visibleSections.has('about') ? 'animate-fade-up' : 'opacity-0'
              }`}>
                Marine Leadership.<br />
                Strategic Precision.
              </h2>

              <div className={`space-y-6 text-[#e2e8f0] text-lg leading-relaxed ${
                visibleSections.has('about') ? 'animate-fade-up' : 'opacity-0'
              }`} style={{ animationDelay: '0.1s', lineHeight: '1.7' }}>
                <p>
                  Led by a United States Marine Corps veteran with an MBA in Strategic Leadership, Civic Strategy Partners brings military precision and strategic thinking to federal contracting.
                </p>
                <p>
                  Kevin Martin has guided businesses through the complexities of government procurement for over 14 years, supporting more than $500M in federal proposals and helping companies of all sizes secure and perform on federal contracts.
                </p>
                <p>
                  Our approach combines deep regulatory knowledge with practical, results-driven strategies that win contracts. We don't just guide you through the process—we become your strategic partner in building a sustainable federal contracting business.
                </p>
              </div>

              <div className={`mt-10 pt-8 border-t border-[#334155]/50 ${
                visibleSections.has('about') ? 'animate-fade-up' : 'opacity-0'
              }`} style={{ animationDelay: '0.2s' }}>
                <p className="text-[#d4af37] font-semibold mb-2">Service-Disabled Veteran-Owned Small Business (SDVOSB)</p>
              </div>
            </div>

            <div className={`lg:col-span-2 ${
              visibleSections.has('about') ? 'animate-fade-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.3s' }}>
              <div className="glassmorphism rounded-2xl aspect-square overflow-hidden">
                <img
                  src="/1743701547902.jpeg"
                  alt="Kevin M. Lewis - Founder & CEO"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-[#0f172a] border-y border-[#334155]/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="playfair text-5xl lg:text-6xl font-semibold mb-6">
            Ready to Win Federal Contracts?
          </h2>
          <p className="text-[#e2e8f0] text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ lineHeight: '1.7' }}>
            Schedule a consultation to discuss your goals and learn how we can help you succeed in the federal marketplace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
              className="inline-block bg-[#d4af37] hover:bg-[#c4a027] text-[#0f172a] px-10 py-4 rounded-lg font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d4af37]/30"
            >
              Schedule Consultation
            </a>
            <a
              href="#services"
              className="inline-block border-2 border-[#334155] hover:border-[#d4af37] text-white px-10 py-4 rounded-lg font-bold text-lg transition-all hover:-translate-y-1"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#0f172a] border-t border-[#334155]/30 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="playfair text-xl font-semibold mb-4 tracking-wider">
                CIVIC STRATEGY PARTNERS
              </h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                Expert guidance for federal market success
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">
                Navigation
              </h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-[#94a3b8] hover:text-[#d4af37] transition-colors text-sm">Home</a></li>
                <li><a href="#services" className="text-[#94a3b8] hover:text-[#d4af37] transition-colors text-sm">Services</a></li>
                <li><a href="#about" className="text-[#94a3b8] hover:text-[#d4af37] transition-colors text-sm">About</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">
                Contact
              </h4>
              <a
                href="mailto:kevin@civicstrategypartners.com"
                className="text-[#d4af37] hover:text-[#c4a027] transition-colors text-sm"
              >
                kevin@civicstrategypartners.com
              </a>
            </div>
          </div>

          <div className="border-t border-[#334155]/30 pt-8 text-center">
            <p className="text-[#94a3b8] text-sm">
              © 2025 Civic Strategy Partners LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
