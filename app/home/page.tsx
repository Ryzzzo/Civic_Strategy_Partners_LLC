'use client';

import { useState, useEffect, useRef } from 'react';

function AnimatedStat({ value, label, delay, visible }: { value: string; label: string; delay: number; visible: boolean }) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (visible && !hasAnimated) {
      setHasAnimated(true);

      const numericValue = value.replace(/[^0-9]/g, '');
      const isNumeric = numericValue.length > 0;

      if (isNumeric) {
        const target = parseInt(numericValue);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(current + increment, target);

          if (value.includes('M')) {
            setDisplayValue(`${Math.floor(current)}M+`);
          } else if (value.includes('+')) {
            setDisplayValue(`${Math.floor(current)}+`);
          } else {
            setDisplayValue(Math.floor(current).toString());
          }

          if (step >= steps) {
            setDisplayValue(value);
            clearInterval(timer);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      } else {
        setTimeout(() => {
          setDisplayValue(value);
        }, delay);
      }
    }
  }, [visible, value, delay, hasAnimated]);

  return (
    <div className="text-center">
      <div className="text-6xl font-bold mb-3 text-[#d4af37] transition-all duration-1000 ease-out">
        {displayValue}
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
    <div className="bg-[#0f172a] text-white font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; font-family: var(--font-inter); }
        .playfair { font-family: var(--font-playfair); }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes video-gradient {
          0%, 100% {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1e3a8a 75%, #0f172a 100%);
          }
          33% {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 25%, #1e3a8a 50%, #0f172a 75%, #1e293b 100%);
          }
          66% {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 25%, #0f172a 50%, #1e293b 75%, #1e3a8a 100%);
          }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
        }

        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .glassmorphism {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          transition: all 0.4s ease;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1e3a8a 75%, #0f172a 100%);
          background-size: 400% 400%;
          animation: video-gradient 25s ease infinite;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.7);
          z-index: 1;
        }

        .grid-pattern {
          background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+');
          opacity: 0.4;
        }

        .gold-gradient-text {
          background: linear-gradient(135deg, #d4af37 0%, #f4e4a6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}} />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
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

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="video-background"></div>
        <div className="video-overlay"></div>
        <div className="absolute inset-0 grid-pattern z-[1]"></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 text-center z-10">
          <div className="animate-on-scroll animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="playfair text-[#d4af37] text-lg sm:text-xl mb-8 italic tracking-wide">
              Marine-Owned. Mission-Driven. Federal-Focused.
            </p>
          </div>

          <h1
            className="animate-on-scroll text-5xl sm:text-6xl lg:text-[64px] font-bold leading-[1.1] mb-8 tracking-tight animate-fade-up"
            style={{ animationDelay: '0.2s', fontWeight: 700 }}
          >
            Expert Guidance for<br />
            <span className="gold-gradient-text">Federal Market</span> Success
          </h1>

          <p
            className="animate-on-scroll text-[#e2e8f0] text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.3s', lineHeight: '1.7' }}
          >
            Strategic consulting to help businesses win and perform on federal contracts with military precision and proven methodologies.
          </p>

          <div className="animate-on-scroll animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
              className="inline-block bg-[#d4af37] hover:bg-[#c4a027] text-[#0f172a] px-10 py-4 rounded-lg font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d4af37]/30"
            >
              Schedule Consultation
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <svg className="w-6 h-6 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <section id="stats" ref={statsRef} className="py-24 bg-[#1e293b] border-y border-[#334155]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatedStat value="14+" label="Years Federal Experience" delay={100} visible={visibleSections.has('stats')} />
            <AnimatedStat value="500M+" label="Proposals Supported" delay={200} visible={visibleSections.has('stats')} />
            <AnimatedStat value="USMC" label="Marine Corps Veteran" delay={300} visible={visibleSections.has('stats')} />
            <AnimatedStat value="MBA" label="Strategic Leadership" delay={400} visible={visibleSections.has('stats')} />
          </div>
        </div>
      </section>

      <section id="services" ref={servicesRef} className="py-32 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className={`animate-on-scroll text-5xl lg:text-[56px] font-bold mb-6 tracking-tight ${
              visibleSections.has('services') ? 'animate-fade-up' : ''
            }`} style={{ fontWeight: 700 }}>
              How We Help You Win
            </h2>
            <p className={`animate-on-scroll text-[#94a3b8] text-lg max-w-2xl mx-auto ${
              visibleSections.has('services') ? 'animate-fade-up' : ''
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
                className={`animate-on-scroll glassmorphism p-10 group ${
                  visibleSections.has('services') ? 'animate-fade-up' : ''
                }`}
                style={{
                  animationDelay: service.delay,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-white" style={{ fontWeight: 600 }}>
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

      <section id="video" ref={videoRef} className="relative py-32 overflow-hidden bg-[#1e293b]">
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className={`animate-on-scroll text-4xl lg:text-5xl font-bold mb-16 ${
            visibleSections.has('video') ? 'animate-fade-up' : ''
          }`} style={{ fontWeight: 700 }}>
            See Our Process
          </h2>

          <div className={`animate-on-scroll flex items-center justify-center ${
            visibleSections.has('video') ? 'animate-fade-up' : ''
          }`} style={{ animationDelay: '0.2s' }}>
            <button className="group relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#d4af37] flex items-center justify-center transition-all duration-300 group-hover:bg-[#c4a027] group-hover:scale-110 shadow-xl">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#0f172a] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="py-32 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <h2 className={`animate-on-scroll text-5xl lg:text-[56px] font-bold mb-8 leading-tight ${
                visibleSections.has('about') ? 'animate-fade-up' : ''
              }`} style={{ fontWeight: 700 }}>
                Marine Leadership.<br />
                Strategic Precision.
              </h2>

              <div className={`animate-on-scroll space-y-6 text-[#e2e8f0] text-lg leading-relaxed ${
                visibleSections.has('about') ? 'animate-fade-up' : ''
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

              <div className={`animate-on-scroll mt-10 pt-8 border-t border-[#334155]/50 ${
                visibleSections.has('about') ? 'animate-fade-up' : ''
              }`} style={{ animationDelay: '0.2s' }}>
                <p className="text-[#d4af37] font-semibold text-lg">Service-Disabled Veteran-Owned Small Business (SDVOSB)</p>
              </div>
            </div>

            <div className={`animate-on-scroll lg:col-span-5 ${
              visibleSections.has('about') ? 'animate-fade-up' : ''
            }`} style={{ animationDelay: '0.3s' }}>
              <div className="glassmorphism aspect-square overflow-hidden shadow-2xl">
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

      <section className="py-40 bg-[#1e293b] border-y border-[#334155]/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl lg:text-[56px] font-bold mb-6" style={{ fontWeight: 700 }}>
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
