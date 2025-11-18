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
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
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
        style={{ height: '72px' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="text-[#0F172A] font-semibold text-[18px]">
            CIVIC STRATEGY PARTNERS
          </div>

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
        style={{ minHeight: 'calc(100vh - 72px)', marginTop: '72px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3F] via-[#1a1a1a] to-[#0B1F3F] animate-gradient-slow"></div>
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
              className="bg-white text-[#0B1F3F] px-8 py-3 rounded-lg text-[16px] font-medium hover:bg-gray-100 w-full sm:w-auto text-center transition-colors"
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
                GSA Schedule Consulting
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.7' }}>
                Help companies get on GSA MAS and start selling to federal agencies. We guide you through the application process and position you for success.
              </p>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=GSA Schedule Consulting Inquiry"
                className="text-[#1E3A8F] text-[16px] font-medium hover:text-[#1E40AF] transition-colors"
              >
                Learn more →
              </a>
            </div>

            <div>
              <h3 className="text-[24px] font-semibold text-[#0F172A] mb-4" style={{ fontWeight: 600 }}>
                Business Development
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.7' }}>
                Strategic BD support to identify and win federal contract opportunities. We help you build a pipeline and develop winning strategies.
              </p>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Business Development Inquiry"
                className="text-[#1E3A8F] text-[16px] font-medium hover:text-[#1E40AF] transition-colors"
              >
                Learn more →
              </a>
            </div>

            <div>
              <h3 className="text-[24px] font-semibold text-[#0F172A] mb-4" style={{ fontWeight: 600 }}>
                Contract Coaching
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.7' }}>
                Advisory services for companies navigating the federal marketplace. Get expert guidance on compliance, strategy, and execution.
              </p>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Contract Coaching Inquiry"
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3F] via-[#1a1a1a] to-[#0B1F3F] animate-gradient-slow"></div>
        <div className="absolute inset-0 opacity-[0.015] bg-noise"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,179,213,0.05),transparent_50%)]"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
            <div className="md:col-span-2">
              <div
                className="bg-[#E5E7EB] rounded-lg w-full"
                style={{ aspectRatio: '4/5' }}
              ></div>
            </div>

            <div className="md:col-span-3">
              <p className="text-[14px] text-white/60 uppercase mb-4" style={{ letterSpacing: '0.1em' }}>
                About
              </p>

              <h2 className="text-[36px] font-semibold text-white mb-3" style={{ fontWeight: 600 }}>
                Kevin Martin
              </h2>

              <p className="text-[16px] text-white/70 mb-8">
                MBA • U.S. Marine Corps Veteran
              </p>

              <div className="text-[18px] text-white/90 space-y-6" style={{ lineHeight: '1.7' }}>
                <p>
                  Kevin brings deep expertise in federal contracting and GSA schedules, helping businesses successfully enter and grow in the government marketplace. His background combines strategic business acumen with the discipline and mission focus gained through military service.
                </p>
                <p>
                  With extensive experience guiding companies through the complexities of federal procurement, Kevin provides practical, results-driven consulting that helps clients win contracts and build sustainable government partnerships.
                </p>
                <p>
                  Based in Charlotte, NC, Civic Strategy Partners works with businesses nationwide to navigate federal contracting requirements and achieve their government market goals.
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
      <footer className="bg-[#F9FAFB] py-12 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[14px] text-[#6B7280]">
            © 2025 Civic Strategy Partners LLC
          </p>
        </div>
      </footer>
    </>
  );
}
