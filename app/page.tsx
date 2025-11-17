'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:kevin@civicstrategypartners.com?subject=Consultation Request from ${formData.name}&body=${formData.message}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background video will be added here - currently using gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0a2847]"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute top-8 left-8 z-20">
          <Image
            src="/Civic Strategy Partners LLC Logo NO TAGLINE.png"
            alt="Civic Strategy Partners, LLC"
            width={180}
            height={72}
            priority
            className="w-auto h-auto max-w-[180px]"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Expert Guidance for Federal Market Success
            </h1>

            <p className="font-playfair text-2xl sm:text-3xl text-white/95 mb-6 leading-relaxed">
              Marine-Owned. Mission-Driven. Federal-Focused.
            </p>

            <p className="font-sans text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Helping businesses enter, compete, and grow in the U.S. government marketplace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
                className="inline-block bg-[#0a2847] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#1e3a8a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Schedule Consultation
              </a>
              <a
                href="#services"
                className="inline-block bg-transparent text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/80 hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>

      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#0a2847] text-center mb-16">
            How We Help You Win
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1e3a8a] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-[#0a2847] mb-4">
                Proposal Development
              </h3>
              <p className="font-sans text-gray-700 leading-relaxed">
                Compliant, compelling proposals for SBIRs and RFPs that stand out and win contracts.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1e3a8a] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-[#0a2847] mb-4">
                Strategic Planning
              </h3>
              <p className="font-sans text-gray-700 leading-relaxed">
                Identify opportunities and create winning roadmaps for sustained federal market growth.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1e3a8a] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-[#0a2847] mb-4">
                Compliance & Certifications
              </h3>
              <p className="font-sans text-gray-700 leading-relaxed">
                Navigate SBA 8(a), GSA Schedule, and federal regulations with confidence and precision.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-[#1e3a8a] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-[#0a2847] mb-4">
                Contract Management
              </h3>
              <p className="font-sans text-gray-700 leading-relaxed">
                From capture to closeout, we guide you through every phase of the contract lifecycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f0f4f8]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#0a2847] mb-8">
            Veteran Leadership, Proven Results
          </h2>
          <p className="font-sans text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Led by Marine Corps veteran Kevin, Civic Strategy Partners brings military discipline,
            strategic thinking, and deep federal contracting expertise to every engagement. With years
            of experience navigating complex government procurement processes, we've helped businesses
            secure millions in federal contracts.
          </p>
          <Link
            href="/about"
            className="inline-block bg-[#1e3a8a] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#0a2847] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Learn More About Our Team
          </Link>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0a2847] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white text-center mb-6">
            Ready to Win Government Contracts?
          </h2>
          <p className="font-sans text-xl text-white/90 text-center mb-12">
            Schedule your complimentary consultation today
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-12 shadow-2xl max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                  placeholder="Tell us about your federal contracting needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0a2847] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#1e3a8a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/20 text-center">
              <p className="text-white/90 mb-3">Or contact us directly:</p>
              <a
                href="mailto:kevin@civicstrategypartners.com"
                className="text-white font-semibold text-lg hover:text-white/80 transition-colors underline decoration-white/40 hover:decoration-white/60"
              >
                kevin@civicstrategypartners.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
