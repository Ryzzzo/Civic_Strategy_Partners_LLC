'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 88;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #FFFFFF;
          color: #0F172A;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        button, a {
          transition: all 0.2s ease;
        }

        button:hover {
          transform: scale(1.02);
        }

        @keyframes gradient-slow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 15s ease infinite;
        }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : ''
        }`}
        style={{ height: '88px' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/Civic Strategy Partners LLC Logo NO TAGLINE copy.png"
              alt="Civic Strategy Partners Logo"
              className="h-[70px] w-auto object-contain"
            />
            <div className="text-[#0F172A] font-semibold text-[18px]">
              CIVIC STRATEGY PARTNERS
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-[#4B5563] text-[15px] font-medium hover:text-[#1E3A8F]"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#4B5563] text-[15px] font-medium hover:text-[#1E3A8F]"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[#4B5563] text-[15px] font-medium hover:text-[#1E3A8F]"
            >
              Contact
            </button>
            <a
              href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
              className="bg-[#1E3A8F] text-white px-6 py-2.5 rounded-lg text-[16px] font-medium hover:bg-[#1E40AF]"
            >
              Schedule Consultation
            </a>
          </div>

          <button
            className="md:hidden text-[#0F172A]"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) {
                menu.classList.toggle('hidden');
              }
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div id="mobile-menu" className="hidden md:hidden bg-white border-t border-[#E5E7EB]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <button
              onClick={() => {
                scrollToSection('services');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="text-[#4B5563] text-[15px] font-medium text-left"
            >
              Services
            </button>
            <button
              onClick={() => {
                scrollToSection('about');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="text-[#4B5563] text-[15px] font-medium text-left"
            >
              About
            </button>
            <button
              onClick={() => {
                scrollToSection('contact');
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className="text-[#4B5563] text-[15px] font-medium text-left"
            >
              Contact
            </button>
            <a
              href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
              className="bg-[#1E3A8F] text-white px-6 py-2.5 rounded-lg text-[16px] font-medium text-center"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Animated Gradient */}
      <section
        className="flex items-center justify-center px-6 relative overflow-hidden"
        style={{ minHeight: 'calc(100vh - 88px)', marginTop: '88px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2847] via-[#0d1520] to-[#0F2847] animate-gradient-slow"></div>
        <div className="absolute inset-0 opacity-[0.015] bg-noise"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,179,213,0.05),transparent_50%)]"></div>

        <div className="text-center relative z-10" style={{ maxWidth: '800px' }}>
          <h1
            className="text-[32px] md:text-[40px] lg:text-[56px] font-semibold text-white mb-6"
            style={{ lineHeight: '1.1', fontWeight: 600 }}
          >
            Expert Guidance for Federal Market Success
          </h1>

          <p
            className="text-[20px] md:text-[24px] text-white/80 mb-12 mx-auto"
            style={{ maxWidth: '600px' }}
          >
            Helping businesses navigate GSA schedules, win federal contracts, and build lasting government partnerships.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
              className="bg-white text-[#0F2847] px-8 py-3 rounded-lg text-[16px] font-medium hover:bg-gray-100 w-full sm:w-auto text-center transition-colors"
            >
              Schedule Consultation
            </a>
            <button
              onClick={() => scrollToSection('services')}
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg text-[16px] font-medium hover:bg-white/10 w-full sm:w-auto transition-colors"
            >
              View Services
            </button>
          </div>

          <p className="text-[14px] text-white/60 mt-12">
            Marine-Owned • Mission-Driven • Federal-Focused
          </p>
        </div>
      </section>

      {/* Services Section - White Background */}
      <section id="services" className="py-24 md:py-32 lg:py-[120px] px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[36px] font-semibold text-[#0F172A] mb-16 text-center" style={{ fontWeight: 600 }}>
            Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <h3 className="text-[24px] font-semibold text-[#0F172A] mb-4" style={{ fontWeight: 600 }}>
                Offer Development
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.7' }}>
                Full-scope preparation and submission of GSA MAS offers, from readiness assessment through final award. We handle documentation, pricing strategy, and compliance requirements so you can focus on your business.
              </p>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Offer Development Inquiry"
                className="text-[#1E3A8F] text-[16px] font-medium hover:text-[#1E40AF] transition-colors"
              >
                Learn more →
              </a>
            </div>

            <div>
              <h3 className="text-[24px] font-semibold text-[#0F172A] mb-4" style={{ fontWeight: 600 }}>
                Post-Award Compliance
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.7' }}>
                Ongoing contract maintenance, modifications, and Economic Price Adjustments. We keep your Schedule compliant, current, and positioned for long-term success in the federal marketplace.
              </p>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Post-Award Compliance Inquiry"
                className="text-[#1E3A8F] text-[16px] font-medium hover:text-[#1E40AF] transition-colors"
              >
                Learn more →
              </a>
            </div>

            <div>
              <h3 className="text-[24px] font-semibold text-[#0F172A] mb-4" style={{ fontWeight: 600 }}>
                Growth Strategy
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.7' }}>
                Catalog expansion, BPA and IDIQ positioning, and GSA-driven sales optimization. We help you expand your federal footprint and turn your Schedule into a sustainable revenue engine.
              </p>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Growth Strategy Inquiry"
                className="text-[#1E3A8F] text-[16px] font-medium hover:text-[#1E40AF] transition-colors"
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Animated Gradient */}
      <section id="about" className="py-24 md:py-32 lg:py-[120px] px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2847] via-[#0d1520] to-[#0F2847] animate-gradient-slow"></div>
        <div className="absolute inset-0 opacity-[0.015] bg-noise"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,179,213,0.05),transparent_50%)]"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
            <div className="md:col-span-2">
              <img
                src="/1743701547902 copy.jpeg"
                alt="Kevin Martin"
                className="rounded-lg w-full object-cover"
                style={{ aspectRatio: '4/5' }}
              />
            </div>

            <div className="md:col-span-3">
              <p className="text-[14px] text-white/60 uppercase mb-4" style={{ letterSpacing: '0.1em' }}>
                About
              </p>

              <h2 className="text-[36px] font-semibold text-white mb-3" style={{ fontWeight: 600 }}>
                Kevin Martin
              </h2>

              <p className="text-[16px] text-white/70 mb-8">
                MBA • U.S. Marine Corps Veteran • Former GSA Contract Specialist
              </p>

              <div className="text-[18px] text-white/90 space-y-6" style={{ lineHeight: '1.7' }}>
                <p>
                  Kevin brings firsthand federal acquisition expertise from his time at the General Services Administration, where he evaluated offers, negotiated pricing, and guided contractors through the Multiple Award Schedule program. This insider perspective shapes everything Civic Strategy Partners delivers.
                </p>
                <p>
                  As Founder and Principal Consultant, Kevin helps businesses secure, manage, and grow their GSA Schedule contracts with precision, compliance, and confidence. His approach combines strategic business acumen with the discipline and mission focus gained through Marine Corps service.
                </p>
                <p>
                  Whether you're pursuing your first Schedule award or optimizing a mature contract portfolio, Kevin provides hands-on expertise built from inside government itself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section - White Background */}
      <section id="contact" className="py-24 md:py-32 lg:py-[120px] px-6 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[36px] md:text-[48px] font-semibold text-[#0F172A] mb-6" style={{ fontWeight: 600 }}>
            Ready to Enter the Federal Market?
          </h2>

          <p className="text-[20px] text-[#4B5563] mb-12 max-w-[600px] mx-auto">
            Schedule a consultation to discuss your government contracting goals.
          </p>

          <a
            href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
            className="inline-block bg-[#1E3A8F] text-white px-8 py-4 rounded-lg text-[18px] font-medium hover:bg-[#1E40AF] mb-6 transition-colors"
          >
            Schedule Consultation
          </a>

          <p className="text-[14px] text-[#6B7280]">
            or email{' '}
            <a href="mailto:kevin@civicstrategypartners.com" className="text-[#1E3A8F] hover:text-[#1E40AF] underline transition-colors">
              kevin@civicstrategypartners.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2847] via-[#0d1520] to-[#0F2847] animate-gradient-slow"></div>
        <div className="absolute inset-0 opacity-[0.015] bg-noise"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,179,213,0.05),transparent_50%)]"></div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <p className="text-[14px] text-white/70">
            © 2025 Civic Strategy Partners LLC
          </p>
        </div>
      </footer>
    </>
  );
}
