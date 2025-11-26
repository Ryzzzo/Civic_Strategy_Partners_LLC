'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3F] via-[#1a1a1a] to-[#0B1F3F] animate-gradient-slow"></div>

      <div className="absolute inset-0 opacity-[0.015] bg-noise"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,179,213,0.05),transparent_50%)]"></div>

      <div
        className={`relative z-10 max-w-4xl w-full text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="mb-16 flex justify-center">
          <div className="inline-block bg-white/[0.05] backdrop-blur-sm border border-white/[0.12] rounded-2xl p-8 transition-transform duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <Image
              src="/Civic Strategy Partners LLC Logo NO TAGLINE.png"
              alt="Civic Strategy Partners, LLC"
              width={200}
              height={80}
              priority
              className="w-auto h-auto max-w-[200px]"
            />
          </div>
        </div>

        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[56px] font-bold text-white mb-6 leading-[1.2] tracking-[-0.02em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          Under Construction
        </h1>

        <h2 className="font-playfair text-xl sm:text-2xl lg:text-[28px] text-white/95 mb-12 leading-relaxed">
          Expert guidance for federal market success
        </h2>

        <p className="font-sans text-base sm:text-lg leading-relaxed mb-16 max-w-[600px] mx-auto px-4" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
          Our new website is currently under development. We're building
          something great for federal contractors and agencies seeking expert
          guidance.
        </p>

        <div className="mb-12 max-w-3xl mx-auto">
          <p className="font-playfair text-xl sm:text-2xl lg:text-[28px] text-white/90 leading-relaxed mb-4">
            Marine-Owned. Mission-Driven. Federal-Focused.
          </p>
          <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed">
            Helping businesses enter, compete, and grow in the U.S. government marketplace.
          </p>
        </div>

        <div className="pt-10 border-t border-white/10 max-w-xl mx-auto">
          <p className="text-base text-white/70">
            For immediate inquiries:{' '}
            <a
              href="mailto:info@civicstrategypartners.com"
              className="text-white/90 font-medium hover:text-white transition-colors underline decoration-white/30 hover:decoration-white/60"
            >
              info@civicstrategypartners.com
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-slow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 20s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
