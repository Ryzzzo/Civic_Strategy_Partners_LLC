'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...Array.from(prev), entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = [statsRef.current, servicesRef.current, aboutRef.current, testimonialsRef.current, videoRef.current];
    elements.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:kevin@civicstrategypartners.com?subject=Federal Contracting Consultation - ${formData.company}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ACompany: ${formData.company}%0D%0APhone: ${formData.phone}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Inter', sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .btn-primary {
          background: #8B0000;
          color: #FFFFFF;
          transition: all 250ms ease;
          border: none;
        }

        .btn-primary:hover {
          background: #A31621;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.4);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid #C9A227;
          color: #C9A227;
          transition: all 250ms ease;
        }

        .btn-secondary:hover {
          background: #C9A227;
          color: #0D0D0D;
        }

        .service-card {
          background: #2D2D2D;
          border: 1px solid transparent;
          transition: all 300ms ease;
        }

        .service-card:hover {
          border-color: #C9A227;
          transform: translateY(-4px);
        }

        .input-field {
          background: #1A1A1A;
          border: 1px solid #2D2D2D;
          color: #FFFFFF;
          transition: border-color 250ms ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #C9A227;
        }

        .input-field::placeholder {
          color: #6B7280;
        }
      `}</style>

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-12 flex justify-center fade-in">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <Image
                src="/Civic Strategy Partners LLC Logo NO TAGLINE.png"
                alt="Civic Strategy Partners, LLC"
                width={280}
                height={112}
                priority
                className="w-auto h-auto max-w-[280px]"
              />
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <p
              className="text-[#C9A227] text-sm font-bold uppercase tracking-widest mb-6 fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Marine-Owned. Mission-Driven. Federal-Focused.
            </p>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Expert Guidance for Federal Market Success
            </h1>

            <p
              className="text-xl text-[#9CA3AF] mb-12 leading-relaxed fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              Strategic consulting to help businesses win and perform on federal contracts. Led by a Marine Corps veteran with proven success in government procurement.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <a
                href="#contact"
                className="btn-primary inline-flex items-center justify-center font-bold px-10 py-4 rounded-md text-base w-full sm:w-auto"
              >
                Schedule Consultation
              </a>
              <a
                href="#services"
                className="btn-secondary inline-flex items-center justify-center font-bold px-10 py-4 rounded-md text-base w-full sm:w-auto"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" ref={statsRef} className="py-16 bg-[#1A1A1A] border-y border-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '$500M+', label: 'Proposals Supported', delay: 0 },
              { value: '14+', label: 'Years Federal Experience', delay: 0.1 },
              { value: 'SDVOSB', label: 'Certified Veteran-Owned', delay: 0.2 },
            ].map((stat, i) => (
              <div
                key={i}
                className={`${visibleSections.has('stats') ? 'fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${stat.delay}s` }}
              >
                <p className="text-5xl font-black text-[#C9A227] mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" ref={servicesRef} className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black text-white mb-6 ${
              visibleSections.has('services') ? 'fade-in-up' : 'opacity-0'
            }`}>
              Strategic Services
            </h2>
            <p className={`text-lg text-[#9CA3AF] max-w-2xl mx-auto ${
              visibleSections.has('services') ? 'fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.1s' }}>
              Comprehensive support for every stage of federal contracting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Proposal Development',
                description: 'Winning strategies from capture to submission',
                delay: 0
              },
              {
                title: 'Compliance & DCAA Audit Support',
                description: 'Maintain FAR compliance and audit readiness',
                delay: 0.1
              },
              {
                title: 'Business Development',
                description: 'Pipeline development and opportunity identification',
                delay: 0.2
              },
              {
                title: 'Capability Statement Design',
                description: 'Professional materials that open doors',
                delay: 0.3
              }
            ].map((service, i) => (
              <div
                key={i}
                className={`service-card rounded-lg p-8 ${
                  visibleSections.has('services') ? 'fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${service.delay}s` }}
              >
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="py-24 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className={`border-l-4 border-[#8B0000] pl-6 mb-8 ${
                visibleSections.has('about') ? 'fade-in-up' : 'opacity-0'
              }`}>
                <p className="text-[#C9A227] text-sm font-bold uppercase tracking-widest mb-4">
                  About Civic Strategy Partners
                </p>
                <h2 className="text-4xl font-black text-white mb-6">
                  Marine Discipline.<br />Federal Expertise.
                </h2>
              </div>

              <div className={`space-y-6 text-base text-[#F5F5F5] leading-relaxed ${
                visibleSections.has('about') ? 'fade-in-up' : 'opacity-0'
              }`} style={{ animationDelay: '0.2s' }}>
                <p>
                  Led by a United States Marine Corps veteran, Civic Strategy Partners brings military precision and strategic thinking to federal contracting. We've helped businesses of all sizes navigate the complexities of government procurement—from initial registration to multi-million dollar contract awards.
                </p>
                <p>
                  Our approach combines deep regulatory knowledge with practical, results-driven strategies that actually win contracts.
                </p>
              </div>

              <div className={`mt-10 space-y-4 ${
                visibleSections.has('about') ? 'fade-in-up' : 'opacity-0'
              }`} style={{ animationDelay: '0.3s' }}>
                {['SDVOSB Certified', 'SAM.gov Registration Expert', 'DCAA Compliant Systems'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#C9A227]"></div>
                    <span className="text-sm font-semibold text-[#F5F5F5]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${
              visibleSections.has('about') ? 'fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.4s' }}>
              <div className="bg-[#2D2D2D] border border-[#C9A227] rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center px-8">
                  <p className="text-sm text-[#9CA3AF] uppercase tracking-wider">
                    Photo Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" ref={testimonialsRef} className="py-24 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-black text-white mb-6 ${
              visibleSections.has('testimonials') ? 'fade-in-up' : 'opacity-0'
            }`}>
              Trusted by Federal Contractors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Kevin's expertise was instrumental in winning our first federal contract. His guidance through the proposal process was invaluable.",
                author: "Federal Contractor",
                delay: 0
              },
              {
                quote: "Professional, knowledgeable, and results-driven. Civic Strategy Partners helped us navigate complex compliance requirements with confidence.",
                author: "Small Business Owner",
                delay: 0.1
              }
            ].map((testimonial, i) => (
              <div
                key={i}
                className={`bg-[#1A1A1A] border-l-4 border-[#8B0000] p-8 rounded-lg ${
                  visibleSections.has('testimonials') ? 'fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${testimonial.delay}s` }}
              >
                <p className="text-lg text-[#F5F5F5] leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-sm font-bold text-[#C9A227] uppercase tracking-wider">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="video" ref={videoRef} className="py-24 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className={`bg-[#0D0D0D] border-2 border-[#2D2D2D] rounded-lg aspect-video flex items-center justify-center ${
            visibleSections.has('video') ? 'fade-in-up' : 'opacity-0'
          }`}>
            <div className="text-center px-8">
              <div className="w-20 h-20 rounded-full bg-[#8B0000] flex items-center justify-center mb-4 mx-auto">
                <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
              </div>
              <p className="text-lg font-bold text-white uppercase tracking-wider">
                Video Coming Soon
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Ready to Win Federal Contracts?
            </h2>
            <p className="text-lg text-[#9CA3AF]">
              Schedule a free consultation to discuss your federal contracting goals
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full Name"
                  className="input-field w-full px-4 py-3 rounded-md text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Email Address"
                  className="input-field w-full px-4 py-3 rounded-md text-base"
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Phone Number"
                  className="input-field w-full px-4 py-3 rounded-md text-base"
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Company Name"
                  className="input-field w-full px-4 py-3 rounded-md text-base"
                />
              </div>

              <div>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  placeholder="Tell us about your federal contracting needs..."
                  className="input-field w-full px-4 py-3 rounded-md text-base resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full font-bold px-10 py-4 rounded-md text-base"
              >
                Submit Consultation Request
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-[#2D2D2D] text-center">
              <p className="text-sm text-[#9CA3AF] mb-2">Or contact directly:</p>
              <a
                href="mailto:kevin@civicstrategypartners.com"
                className="text-[#C9A227] hover:text-[#D4A252] font-semibold transition-colors"
              >
                kevin@civicstrategypartners.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#000000] border-t border-[#2D2D2D] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-white mb-2">
              CIVIC STRATEGY PARTNERS
            </h3>
            <p className="text-sm text-[#6B7280] mb-1">
              Expert guidance for federal market success
            </p>
            <p className="text-xs text-[#6B7280]">
              A Gov Con Proposals Company
            </p>
          </div>

          <div className="border-t border-[#2D2D2D] pt-6 text-center">
            <p className="text-xs text-[#6B7280]">
              © 2025 Civic Strategy Partners LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
