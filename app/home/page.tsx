'use client';

import { useState, useEffect } from 'react';

const mockArticles = [
  {
    title: "FedRAMP vs. DoD Impact Levels: What Software Companies Need to Know",
    date: "2025-11-20",
    imageUrl: "https://placehold.co/1200x627/0F2847/ffffff?text=FedRAMP+vs+DoD",
    content: "There's a lot of confusion in federal tech circles about how FedRAMP, the DoD Impact Levels (IL2-IL6), and the GSA Multiple Award Schedule (MAS) program all relate to one another; especially for AI and software companies trying to sell into the government.\n\nSome tech leaders tell me: We don't see any opportunities on eBuy for what we sell. Others assume: We have IL6, so we should automatically qualify for FedRAMP, right?\n\nLet's clear this up. Understanding these frameworks is crucial for any software company looking to succeed in the federal marketplace. Each certification serves a different purpose and opens different doors in government contracting.\n\nThe relationship between these frameworks is more nuanced than many realize, and getting it right can mean the difference between winning contracts and missing opportunities."
  },
  {
    title: "GSA MAS: Common Myths About Schedule Eligibility",
    date: "2025-11-06",
    imageUrl: "https://placehold.co/1200x627/0F2847/ffffff?text=GSA+MAS+Myths",
    content: "Many vendors believe they need years of federal experience before applying to GSA's Multiple Award Schedule program. This misconception costs companies valuable opportunities.\n\nThe truth is that the GSA Schedule is more accessible than most companies think. While having federal experience can be helpful, it's not a requirement. What matters more is your ability to demonstrate past performance, competitive pricing, and a solid business foundation.\n\nAnother common myth is that small businesses can't compete on the Schedule. In reality, GSA actively encourages small business participation and offers specific support programs to help smaller vendors succeed in the federal marketplace."
  },
  {
    title: "Winning Federal RFPs: The Proposal Strategy That Works",
    date: "2025-10-23",
    imageUrl: "https://placehold.co/1200x627/0F2847/ffffff?text=Winning+RFPs",
    content: "The key to winning federal proposals isn't just technical excellence—it's demonstrating you understand the agency's mission and challenges.\n\nSuccessful proposals speak directly to the agency's pain points and clearly articulate how your solution addresses their specific needs. Too many companies focus on listing features and capabilities without connecting them to outcomes that matter to the evaluators.\n\nYour proposal should tell a story: the agency has a challenge, your solution solves it, and here's the evidence that proves you can deliver. Back everything with concrete examples, metrics, and past performance that demonstrates your capability."
  }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<typeof mockArticles[0] | null>(null);

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

  const openModal = (article: typeof mockArticles[0]) => {
    setCurrentArticle(article);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentArticle(null);
    document.body.style.overflow = 'auto';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [modalOpen]);

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

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes wave-shift {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-50px);
          }
        }

        .silk-gradient {
          background: linear-gradient(135deg,
            #15283d 0%,
            #1e3a5f 50%,
            #15283d 100%
          );
          background-size: 400% 400%;
          animation: gradient-shift 25s ease infinite;
        }

        .silk-overlay {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
          animation: wave-shift 20s ease-in-out infinite;
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

      {/* Hero Section - Silk Flag Gradient */}
      <section
        className="flex items-center justify-center px-6 relative overflow-hidden"
        style={{ minHeight: 'calc(100vh - 88px)', marginTop: '88px' }}
      >
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        <div className="text-center relative z-10" style={{ maxWidth: '900px' }}>
          <h1
            className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white mb-6"
            style={{ lineHeight: '1.2', fontWeight: 700 }}
          >
            Your GSA MAS Contract Won't Sell Itself.
          </h1>

          <p
            className="text-[18px] md:text-[24px] text-white/90 mb-8 mx-auto font-medium"
            style={{ maxWidth: '800px', lineHeight: '1.5', fontWeight: 500 }}
          >
            Civic Strategy Partners helps you diagnose, fix, and optimize your MAS or federal sales posture—so you stop missing revenue and start performing.
          </p>

          <p
            className="text-[16px] md:text-[18px] mb-12 mx-auto"
            style={{ maxWidth: '800px', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Most companies think a GSA Schedule will generate sales automatically. It won't. MAS performs only when it's aligned, maintained, and guided by someone who understands the doctrine—and your CO will not do that for you. If your contract is quiet, misaligned, or at risk of cancellation, you're not alone. CSP brings former-GSA insight and Marine-grade discipline to correct course and build a federal revenue engine that actually works.
          </p>

          <a
            href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
            className="inline-block bg-white text-[#1e3a5f] px-10 py-4 rounded-md text-[18px] font-semibold hover:bg-gray-100 transition-colors"
            style={{ fontWeight: 600 }}
          >
            Book a Consultation
          </a>
        </div>
      </section>

      {/* What We Do Section - White Background */}
      <section id="services" className="py-24 md:py-32 lg:py-[120px] px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
              What We Do
            </h2>
            <p className="text-[18px] text-[#6B7280]">
              Core services designed to diagnose, fix, and optimize your federal sales posture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-2 border-[#E5E7EB] rounded-xl p-8 bg-white shadow-sm hover:border-[#1e3a5f] hover:-translate-y-1 transition-all">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                MAS Contract Diagnosis & Performance Correction
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                A MAS contract is not a vending machine. If the foundation is wrong, nothing you do in the marketplace will work. We identify exactly where your contract is failing and build a correction plan to restore compliance, visibility, and performance.
              </p>
              <a
                href="/services#mas-diagnosis"
                className="text-[#1e3a5f] text-[16px] font-medium hover:opacity-80 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                Learn More →
              </a>
            </div>

            <div className="border-2 border-[#E5E7EB] rounded-xl p-8 bg-white shadow-sm hover:border-[#1e3a5f] hover:-translate-y-1 transition-all">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Federal Readiness Roadmaps
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                Less than half of one percent of U.S. small businesses sell to the federal government, yet nearly $190B flowed to them last year. We build Federal Readiness Roadmaps that give you land navigation for the federal marketplace.
              </p>
              <a
                href="/services#readiness"
                className="text-[#1e3a5f] text-[16px] font-medium hover:opacity-80 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                Learn More →
              </a>
            </div>

            <div className="border-2 border-[#E5E7EB] rounded-xl p-8 bg-white shadow-sm hover:border-[#1e3a5f] hover:-translate-y-1 transition-all">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                MAS Advisory & Offer Support
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                CSP is not a proposal mill. We guide you through the MAS offer or mod process with expert oversight, helping you build the right offer, the right pricing, and the right structure from day one.
              </p>
              <a
                href="/services#advisory"
                className="text-[#1e3a5f] text-[16px] font-medium hover:opacity-80 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                Learn More →
              </a>
            </div>

            <div className="border-2 border-[#E5E7EB] rounded-xl p-8 bg-white shadow-sm hover:border-[#1e3a5f] hover:-translate-y-1 transition-all">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Post-Award Compliance & Lifecycle Support
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                MAS is a lifecycle program requiring accurate, timely maintenance. CSP supports mod packages, price list updates, EPA strategy, solicitation refresh alignment, and annual requirements. Healthy contracts sell.
              </p>
              <a
                href="/services#lifecycle"
                className="text-[#1e3a5f] text-[16px] font-medium hover:opacity-80 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                Learn More →
              </a>
            </div>

            <div className="border-2 border-[#E5E7EB] rounded-xl p-8 bg-white shadow-sm hover:border-[#1e3a5f] hover:-translate-y-1 transition-all">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Retainer-Based Support
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                Some clients need continuous support, not one-off fixes. CSP offers customizable Advisory and White-Glove retainer packages with direct access to the Principal Consultant and CSP-certified MAS technicians.
              </p>
              <a
                href="/services#retainer"
                className="text-[#1e3a5f] text-[16px] font-medium hover:opacity-80 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                Learn More →
              </a>
            </div>

            <div className="border-2 border-[#E5E7EB] rounded-xl p-8 bg-white shadow-sm hover:border-[#1e3a5f] hover:-translate-y-1 transition-all">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                À La Carte Mod Support
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                If you only need a clean, compliant modification, CSP offers à la carte mod support from administrative updates to major contract restructuring—handled by CSP-certified MAS technicians with strategic oversight.
              </p>
              <a
                href="/services#mods"
                className="text-[#1e3a5f] text-[16px] font-medium hover:opacity-80 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                Learn More →
              </a>
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="/services"
              className="text-[18px] text-[#1e3a5f] font-semibold border-b-2 border-[#1e3a5f] pb-1 hover:opacity-80 transition-opacity"
              style={{ fontWeight: 600, textDecoration: 'none' }}
            >
              View All Services & Details →
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Silk Flag Gradient */}
      <section id="about" className="py-24 md:py-32 lg:py-[120px] px-6 relative overflow-hidden">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <h2 className="text-[36px] font-bold text-white mb-8" style={{ fontWeight: 700 }}>
            Marine-Owned. Mission-Driven. Federal-Focused.
          </h2>

          <div className="text-[18px] text-white/90 space-y-6 text-left" style={{ lineHeight: '1.7' }}>
            <p>
              Civic Strategy Partners is built on the belief that federal acquisition should be agile, modern, and mission-oriented—and that GSA MAS is becoming the government's fastest, cleanest way to get there. Agencies are moving more requirements onto MAS to speed procurement, increase commercial access, and push capability directly into government hands. That shift demands contractors who understand the doctrine, the compliance landscape, and how to maintain a contract so it performs.
            </p>
            <p>
              CSP brings a blend of Marine Corps discipline, former-GSA Contract Specialist experience, and deep knowledge of MAS structure and federal readiness. We help companies diagnose failing contracts, correct course, and build federal revenue engines that actually work. Our approach is structured, direct, and grounded in the Civic Strategy Method and MAS Doctrine—models designed to help companies operate with clarity in a constantly changing federal environment.
            </p>
            <p>
              For founders, small businesses, and growing federal practices, CSP provides the guidance, structure, and truth you need to perform in the federal space with confidence.
            </p>
          </div>

          <a
            href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
            className="inline-block mt-12 bg-white text-[#1e3a5f] px-10 py-4 rounded-md text-[18px] font-semibold hover:bg-gray-100 transition-colors"
            style={{ fontWeight: 600 }}
          >
            Book a Consultation
          </a>
        </div>
      </section>

      {/* Results Section - White Background */}
      <section id="results" className="py-24 md:py-32 lg:py-[120px] px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
              Representative Outcomes & Typical Engagement Results
            </h2>
            <p className="text-[18px] text-[#6B7280] max-w-[800px] mx-auto" style={{ lineHeight: '1.6' }}>
              CSP engagements are confidential, and many clients come to us early in their federal journey. Instead of publishing sensitive details, we highlight representative scenarios that reflect the types of challenges we solve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="border-2 border-[#E5E7EB] rounded-lg p-8">
              <h3 className="text-[20px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                MAS Structure Correction & Performance Alignment
              </h3>
              <p className="text-[#4B5563] text-[16px]" style={{ lineHeight: '1.6' }}>
                A services contractor with minimal MAS sales sought clarity on why their schedule wasn't gaining traction. Analysis revealed misaligned SINs, outdated labor categories, and pricing inconsistencies tied to older solicitation refreshes. CSP provided a corrective action roadmap to rebuild the contract's structure, restore compliance, and position the company for visibility with agency buyers.
              </p>
            </div>

            <div className="border-2 border-[#E5E7EB] rounded-lg p-8">
              <h3 className="text-[20px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Federal Readiness Roadmap for a Growing Technology Firm
              </h3>
              <p className="text-[#4B5563] text-[16px]" style={{ lineHeight: '1.6' }}>
                A tech company exploring federal sales needed to understand market fit, competitive posture, and whether MAS should be part of their strategy. CSP built a Federal Readiness Roadmap assessing capabilities, NAICS alignment, SAM/DSBS posture, agency targets, and contract vehicle pathways. Leadership gained clarity on their federal entry points and a structured path toward future MAS alignment.
              </p>
            </div>

            <div className="border-2 border-[#E5E7EB] rounded-lg p-8">
              <h3 className="text-[20px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Compliance Intervention for a Low-Activity MAS Holder
              </h3>
              <p className="text-[#4B5563] text-[16px]" style={{ lineHeight: '1.6' }}>
                A small business with a quiet MAS contract faced the risk of falling below minimum sales thresholds. CSP conducted a comprehensive compliance and lifecycle review, identifying missing mods, outdated pricing files, and structural issues impacting visibility. Recommendations allowed the company to reestablish compliance, protect their contract, and begin rebuilding a real revenue pathway.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="mailto:kevin@civicstrategypartners.com?subject=Talk Through Your Scenario"
              className="inline-block bg-[#1e3a5f] text-white px-10 py-4 rounded-md text-[18px] font-semibold hover:bg-[#2a4a6f] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Talk Through Your Scenario
            </a>
          </div>
        </div>
      </section>

      {/* Insights & Expertise Section - Silk Flag Gradient */}
      <section id="insights" className="py-24 md:py-32 lg:py-[120px] px-6 relative overflow-hidden">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        <div
          className="absolute top-5 left-5 w-20 h-20 border-t-[3px] border-l-[3px] border-white/30 z-10"
          style={{
            borderTopColor: 'rgba(255, 255, 255, 0.3)',
            borderLeftColor: 'rgba(255, 255, 255, 0.3)'
          }}
        ></div>
        <div
          className="absolute bottom-5 right-5 w-20 h-20 border-b-[3px] border-r-[3px] border-white/30 z-10"
          style={{
            borderBottomColor: 'rgba(255, 255, 255, 0.3)',
            borderRightColor: 'rgba(255, 255, 255, 0.3)'
          }}
        ></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-semibold text-white mb-4" style={{ fontWeight: 600 }}>
              Insights & Expertise
            </h2>
            <p className="text-[18px] text-white/70">
              Expert guidance for government market success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {mockArticles.map((article, index) => (
              <article
                key={index}
                onClick={() => openModal(article)}
                className="cursor-pointer transition-opacity duration-300 hover:opacity-85"
                style={{ background: 'transparent' }}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full rounded-lg mb-5 object-cover"
                  style={{ aspectRatio: '16/9' }}
                />
                <h3
                  className="text-[20px] font-semibold text-white mb-3 line-clamp-2"
                  style={{
                    fontWeight: 600,
                    lineHeight: '1.3',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {article.title}
                </h3>
                <p className="text-[14px] text-white/60 mb-3">
                  {formatDate(article.date)}
                </p>
                <p
                  className="text-[16px] text-white/80 mb-4 line-clamp-3"
                  style={{
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {article.content.substring(0, 150)}...
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(article);
                  }}
                  className="text-[16px] font-medium text-white hover:text-white/80 inline-flex items-center gap-2 transition-all"
                  style={{ fontWeight: 500 }}
                >
                  Read more <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/CTA Section - White Background */}
      <section id="contact" className="py-24 md:py-32 lg:py-[120px] px-6 bg-white">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
              Get in Touch with Civic Strategy Partners
            </h2>
            <p className="text-[18px] text-[#6B7280]">
              Whether you need MAS diagnosis, federal readiness guidance, mod support, or a strategic advisor, CSP is here to help you move with clarity and purpose in the federal marketplace.
            </p>
          </div>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-md text-[16px] focus:outline-none focus:border-[#1e3a5f]"
              style={{ fontFamily: 'Inter' }}
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-md text-[16px] focus:outline-none focus:border-[#1e3a5f]"
              style={{ fontFamily: 'Inter' }}
            />

            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-md text-[16px] focus:outline-none focus:border-[#1e3a5f]"
              style={{ fontFamily: 'Inter' }}
            />

            <select
              required
              className="w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-md text-[16px] text-[#4B5563] focus:outline-none focus:border-[#1e3a5f]"
              style={{ fontFamily: 'Inter' }}
            >
              <option value="">What are you looking for?</option>
              <option value="mas-diagnosis">MAS Diagnosis</option>
              <option value="federal-readiness">Federal Readiness</option>
              <option value="mas-advisory">MAS Advisory</option>
              <option value="mod-support">Mod Support</option>
              <option value="compliance">Compliance/Lifecycle</option>
              <option value="retainer">Retainer Inquiry</option>
              <option value="custom">Custom Project</option>
              <option value="general">General Question</option>
            </select>

            <textarea
              placeholder="Tell us more about your needs..."
              rows={5}
              className="w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-md text-[16px] focus:outline-none focus:border-[#1e3a5f] resize-vertical"
              style={{ fontFamily: 'Inter' }}
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#1e3a5f] text-white px-4 py-4 rounded-md text-[18px] font-semibold hover:bg-[#2a4a6f] transition-colors"
              style={{ fontFamily: 'Inter', fontWeight: 600 }}
            >
              Send Message
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-[16px] text-[#6B7280] mb-2" style={{ fontFamily: 'Inter' }}>
              Or email directly:
            </p>
            <a
              href="mailto:kevin@civicstrategypartners.com"
              className="text-[18px] text-[#1e3a5f] font-semibold hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Inter', fontWeight: 600, textDecoration: 'none' }}
            >
              kevin@civicstrategypartners.com
            </a>
          </div>

          <div className="text-center mt-8">
            <a
              href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
              className="inline-block bg-white text-[#1e3a5f] border-2 border-[#1e3a5f] px-8 py-3.5 rounded-md text-[16px] font-semibold hover:bg-[#1e3a5f] hover:text-white transition-colors"
              style={{ fontFamily: 'Inter', fontWeight: 600 }}
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {modalOpen && currentArticle && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-[1000] p-10"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '40px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-[800px] max-h-[90vh] overflow-y-auto relative shadow-2xl"
            style={{
              background: 'white',
              maxWidth: '800px',
              maxHeight: '90vh',
              borderRadius: '12px',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 bg-white border-2 border-[#E5E7EB] rounded-full w-10 h-10 text-2xl text-[#6B7280] cursor-pointer z-10 hover:bg-gray-50 transition-colors"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'white',
                border: '2px solid #E5E7EB',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                color: '#6B7280',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              ×
            </button>

            <img
              src={currentArticle.imageUrl}
              alt={currentArticle.title}
              className="w-full object-cover"
              style={{
                width: '100%',
                aspectRatio: '1200/627',
                objectFit: 'cover',
                borderRadius: '12px 12px 0 0'
              }}
            />

            <h1
              className="text-[32px] font-semibold text-[#0F2847] mx-10 mt-10 mb-3"
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '32px',
                color: '#0F2847',
                lineHeight: '1.2',
                margin: '40px 40px 12px'
              }}
            >
              {currentArticle.title}
            </h1>

            <p
              className="text-[14px] text-[#6B7280] mx-10 mb-8"
              style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#6B7280',
                margin: '0 40px 32px'
              }}
            >
              {formatDate(currentArticle.date)} | {calculateReadTime(currentArticle.content)}
            </p>

            <div
              className="text-[18px] text-[#374151] mx-10 pb-10"
              style={{
                fontFamily: 'Inter',
                fontSize: '18px',
                color: '#374151',
                lineHeight: '1.8',
                margin: '0 40px',
                paddingBottom: '40px'
              }}
            >
              {currentArticle.content.split('\n\n').map((paragraph, i) => (
                <p key={i} style={{ marginBottom: '24px' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              className="bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-lg p-8 m-10 text-center"
              style={{
                background: '#F9FAFB',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                padding: '32px',
                margin: '40px',
                textAlign: 'center'
              }}
            >
              <p
                className="text-[20px] font-semibold text-[#0F2847] mb-5"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '20px',
                  color: '#0F2847',
                  marginBottom: '20px'
                }}
              >
                Ready to discuss your GSA strategy?
              </p>
              <a
                href="mailto:kevin@civicstrategypartners.com?subject=Consultation Request"
                className="inline-block bg-[#0F2847] text-white px-8 py-3.5 rounded-md text-[16px] font-medium cursor-pointer hover:bg-[#1e3a5f] transition-colors border-none"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 500
                }}
              >
                Schedule Consultation →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Silk Flag Gradient */}
      <footer className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-[18px] font-bold text-white mb-4" style={{ fontFamily: 'Inter', fontWeight: 700 }}>
                Civic Strategy Partners, LLC
              </h3>
              <p className="text-[14px] text-white/80 mb-2" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                Marine-Owned | Mission-Driven | Federal-Focused
              </p>
              <p className="text-[14px] text-white/80 mb-2" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                GSA MAS Architect | Federal Readiness Advisor
              </p>
              <p className="text-[14px] text-white/80" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                New England, USA
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-bold text-white mb-4" style={{ fontFamily: 'Inter', fontWeight: 700 }}>
                Contact
              </h3>
              <p className="text-[14px] text-white/80 mb-2" style={{ fontFamily: 'Inter' }}>
                <a href="mailto:kevin@civicstrategypartners.com" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                  kevin@civicstrategypartners.com
                </a>
              </p>
              <p className="text-[14px] text-white/80 mb-4" style={{ fontFamily: 'Inter' }}>
                (603) 969-2269
              </p>
              <p className="text-[14px] mt-4" style={{ fontFamily: 'Inter' }}>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                  LinkedIn →
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-bold text-white mb-4" style={{ fontFamily: 'Inter', fontWeight: 700 }}>
                Client Portal
              </h3>
              <p className="text-[14px]" style={{ fontFamily: 'Inter' }}>
                <a href="#" className="text-white/80 hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                  Pay Invoice →
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-[14px] text-white/60" style={{ fontFamily: 'Inter' }} suppressHydrationWarning>
              © {new Date().getFullYear()} Civic Strategy Partners, LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Return to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#1e3a5f] text-white border-none rounded-full w-14 h-14 text-2xl cursor-pointer hover:scale-110 transition-transform z-50"
        style={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
        aria-label="Return to top"
      >
        ↑
      </button>
    </>
  );
}
