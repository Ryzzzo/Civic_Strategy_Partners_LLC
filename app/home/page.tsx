'use client';

import { useState, useEffect, useRef } from 'react';

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

interface GSANewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<typeof mockArticles[0] | null>(null);
  const [gsaNews, setGsaNews] = useState<GSANewsItem[]>([]);
  const [gsaNewsLoading, setGsaNewsLoading] = useState(true);
  const [gsaNewsError, setGsaNewsError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.playbackRate = 0.5;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Trigger it manually in case video is already loaded
    if (video.readyState >= 2) {
      video.playbackRate = 0.5;
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const fetchGSANews = async () => {
      try {
        setGsaNewsLoading(true);
        const response = await fetch('/api/gsa-news');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        setGsaNews(Array.isArray(data) ? data : []);
        setGsaNewsError(false);
      } catch (error) {
        setGsaNewsError(true);
      } finally {
        setGsaNewsLoading(false);
      }
    };

    fetchGSANews();
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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        button:hover {
          transform: scale(1.02);
        }

        @keyframes wave-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .silk-gradient {
          background: linear-gradient(135deg,
            #15283d 0%,
            #1a3247 25%,
            #1e3a5f 50%,
            #1a3247 75%,
            #15283d 100%
          );
          background-size: 200% 200%;
          animation: wave-flow 7s ease-in-out infinite;
        }

        .silk-gradient::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.05" /%3E%3C/svg%3E');
          opacity: 0.03;
          z-index: 1;
        }

        .silk-overlay {
          background: rgba(255, 255, 255, 0.03);
          opacity: 0.5;
        }

        .premium-card {
          background: rgba(255, 255, 255, 1);
          border: 2px solid rgba(30, 58, 95, 0.08);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .premium-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 2px;
          background: linear-gradient(135deg,
            rgba(184, 134, 11, 0) 0%,
            rgba(184, 134, 11, 0.3) 50%,
            rgba(184, 134, 11, 0) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .premium-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(30, 58, 95, 0.2);
          border-color: rgba(30, 58, 95, 0.3);
        }

        .premium-card:hover::before {
          opacity: 1;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .premium-cta,
        .cta-button,
        .blue-section .cta-button,
        .about-section .cta-button,
        button.cta,
        a.cta-button {
          background: linear-gradient(135deg, #b8860b 0%, #daa520 100%) !important;
          color: #ffffff !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          padding: 14px 32px !important;
          border-radius: 8px !important;
          border: none !important;
          text-decoration: none !important;
          display: inline-block !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3) !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
        }

        .premium-cta:hover,
        .cta-button:hover,
        .blue-section .cta-button:hover,
        .about-section .cta-button:hover,
        button.cta:hover,
        a.cta-button:hover {
          background: linear-gradient(135deg, #daa520 0%, #b8860b 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(184, 134, 11, 0.5) !important;
        }

        .hero-content .cta-button {
          background: linear-gradient(135deg, #b8860b 0%, #daa520 100%) !important;
          padding: 16px 40px !important;
          font-size: 17px !important;
          box-shadow: 0 6px 16px rgba(184, 134, 11, 0.4) !important;
        }

        .hero-content .cta-button:hover {
          background: linear-gradient(135deg, #daa520 0%, #b8860b 100%) !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 10px 24px rgba(184, 134, 11, 0.6) !important;
        }

        .learn-more-link {
          position: relative;
          padding-right: 25px;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .learn-more-link::after {
          content: '→';
          position: absolute;
          right: 0;
          transition: transform 0.3s ease;
        }

        .learn-more-link:hover::after {
          transform: translateX(5px);
        }

        .premium-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          background-color: #ffffff !important;
          backdrop-filter: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid #e5e7eb;
          z-index: 50;
        }

        nav.gradient,
        nav[class*="gradient"] {
          background: #ffffff !important;
        }

        nav button[class*="logo"],
        nav .flex.items-center.gap-3,
        nav button:has(img[alt*="Logo"]) {
          background: transparent !important;
          background-color: transparent !important;
          padding: 0 !important;
        }

        nav .max-w-\[1200px\] > button:first-child {
          background: transparent !important;
        }

        nav .logo-button,
        nav button:first-child {
          background: transparent !important;
          background-color: transparent !important;
        }

        nav .logo-button:hover {
          background: transparent !important;
        }

        nav a[href*="Consultation"],
        nav .bg-\[#1E3A8F\] {
          background: linear-gradient(135deg, #b8860b 0%, #daa520 100%) !important;
          background-color: #b8860b !important;
          box-shadow: 0 2px 8px rgba(184, 134, 11, 0.25) !important;
        }

        nav a[href*="Consultation"]:hover {
          background: linear-gradient(135deg, #daa520 0%, #b8860b 100%) !important;
          box-shadow: 0 4px 12px rgba(184, 134, 11, 0.4) !important;
        }

        input:focus, textarea:focus, select:focus {
          border-color: #1e3a5f;
          box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .wave-bar {
          width: 100%;
          height: 120px;
          position: relative;
          z-index: 1;
        }

        .wave-bar-top {
          margin-top: 88px;
        }

        @keyframes wave-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-video {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 88px - 240px);
          height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(30, 58, 95, 0.30) 0%,
            rgba(30, 58, 95, 0.45) 50%,
            rgba(30, 58, 95, 0.55) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #ffffff;
          max-width: 1000px;
          padding: 0 24px;
        }

        .hero-content h1 {
          font-size: clamp(24px, 5vw, 52px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
          white-space: nowrap;
          overflow: visible;
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: clamp(20px, 5.5vw, 52px);
            letter-spacing: -0.03em;
          }
        }

        .hero-subline {
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 20px;
          opacity: 0.95;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .hero-intro {
          font-size: clamp(15px, 1.5vw, 17px);
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 32px;
          opacity: 0.9;
          text-shadow: 0 1px 3px rgba(0,0,0,0.2);
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .wave-bar {
            height: 80px;
          }

          .hero-video {
            min-height: calc(100vh - 88px - 160px);
            height: 600px;
          }
        }

        .insights-section {
          background: linear-gradient(135deg, #1e3a5f 0%, #15283d 100%);
          padding: 80px 24px;
          position: relative;
        }

        .insights-section h2 {
          font-size: 42px;
          font-weight: 800;
          color: #ffffff;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.85);
          text-align: center;
          margin-bottom: 56px;
          font-weight: 400;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .insight-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 32px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .insight-card:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .insight-card h3 {
          color: #1e3a5f;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .insight-card .card-title-full {
          color: #1e3a5f;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .insight-card .date {
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 16px;
          display: block;
        }

        .insight-card .excerpt {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .insight-card .read-more {
          color: #1e3a5f;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .insight-card .read-more:hover {
          color: #2a4a6f;
          gap: 12px;
        }

        .insight-card .read-more::after {
          content: '→';
          font-size: 18px;
        }

        .corner-decoration {
          opacity: 0.15;
        }

        @media (max-width: 768px) {
          .insights-section {
            padding: 60px 20px;
          }

          .insights-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .insight-card {
            padding: 24px;
          }

          .insight-card h3 {
            font-size: 22px;
          }
        }

        .about-section {
          position: relative;
        }

        .about-container {
          display: grid;
          grid-template-columns: 600px 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-image {
          position: relative;
        }

        .about-image img {
          width: 100%;
          border-radius: 8px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .image-caption {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 600;
          margin-top: 12px;
          line-height: 1.4;
        }

        .about-content {
          color: #ffffff;
        }

        .about-content h2 {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.2;
          text-align: center;
        }

        .about-content h2 span {
          display: block;
        }

        .fillout-container {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        /* ========== COMPREHENSIVE MOBILE RESPONSIVE STYLES ========== */

        @media (max-width: 768px) {

          /* === NAVIGATION === */
          nav {
            padding: 12px 16px !important;
            height: 56px !important;
          }

          nav .logo-button img {
            height: 40px !important;
          }

          nav .logo-button div {
            font-size: 14px !important;
          }

          nav button,
          nav a {
            font-size: 14px !important;
          }

          nav .premium-cta {
            padding: 8px 16px !important;
            font-size: 14px !important;
          }

          /* === WAVE BARS === */
          .wave-bar {
            height: 60px !important;
          }

          .wave-bar-top {
            margin-top: 56px !important;
          }

          /* === HERO SECTION === */
          .hero-video {
            min-height: calc(100vh - 56px - 120px) !important;
            height: 500px !important;
          }

          .hero-content {
            padding: 0 20px !important;
          }

          .hero-content h1 {
            font-size: 26px !important;
            margin-bottom: 16px !important;
          }

          .hero-subline {
            font-size: 16px !important;
            margin-bottom: 12px !important;
          }

          .hero-intro {
            font-size: 14px !important;
            margin-bottom: 20px !important;
          }

          .hero-content .cta-button {
            padding: 12px 28px !important;
            font-size: 15px !important;
          }

          /* === SECTION SPACING === */
          section {
            padding: 50px 20px !important;
          }

          /* === TYPOGRAPHY === */
          h2 {
            font-size: 28px !important;
            margin-bottom: 12px !important;
          }

          h3 {
            font-size: 20px !important;
          }

          h4 {
            font-size: 18px !important;
          }

          .section-subtitle {
            font-size: 15px !important;
            margin-bottom: 32px !important;
          }

          p {
            font-size: 15px !important;
            line-height: 1.6 !important;
          }

          /* === SERVICES SECTION === */
          #services .grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          .premium-card {
            padding: 24px !important;
          }

          .premium-card h3 {
            font-size: 20px !important;
            margin-bottom: 12px !important;
          }

          .premium-card p {
            font-size: 14px !important;
          }

          /* === RESULTS/STATS SECTION === */
          #results .grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          /* === INSIGHTS/BLOG SECTION === */
          .insights-section {
            padding: 50px 20px !important;
          }

          .insights-section h2 {
            font-size: 28px !important;
          }

          .insights-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          .insight-card {
            padding: 20px !important;
          }

          .insight-card h3 {
            font-size: 20px !important;
            margin-bottom: 10px !important;
          }

          .insight-card .card-title-full {
            font-size: 16px !important;
          }

          .insight-card .date {
            font-size: 13px !important;
            margin-bottom: 12px !important;
          }

          .insight-card .excerpt {
            font-size: 14px !important;
            margin-bottom: 16px !important;
          }

          .insight-card .read-more {
            font-size: 14px !important;
          }

          /* === GSA NEWS SECTION === */
          #gsa-news {
            padding: 50px 20px !important;
          }

          #gsa-news .grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          #gsa-news h2 {
            font-size: 28px !important;
          }

          #gsa-news article {
            padding: 20px !important;
          }

          /* === ABOUT SECTION === */
          .about-section {
            padding: 50px 20px !important;
          }

          .about-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          .about-image {
            max-width: 350px !important;
            margin: 0 auto !important;
          }

          .about-content h2 {
            font-size: 32px !important;
            text-align: center !important;
          }

          .about-section p {
            font-size: 15px !important;
            margin-bottom: 16px !important;
          }

          /* === CONTACT FORM === */
          .fillout-container {
            padding: 20px !important;
          }

          #contact h2 {
            font-size: 28px !important;
          }

          #contact p {
            font-size: 15px !important;
          }

          /* === BUTTONS === */
          .cta-button,
          .premium-cta,
          button {
            padding: 12px 24px !important;
            font-size: 15px !important;
          }

          /* === CORNER DECORATIONS === */
          .corner-decoration {
            width: 40px !important;
            height: 40px !important;
          }

          /* === FOOTER === */
          footer {
            padding: 40px 20px 24px !important;
          }

          footer h3 {
            font-size: 16px !important;
          }

          footer p,
          footer a {
            font-size: 14px !important;
          }

          footer .grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          /* === BACK TO TOP BUTTON === */
          button[aria-label="Return to top"] {
            width: 48px !important;
            height: 48px !important;
            font-size: 20px !important;
            bottom: 20px !important;
            right: 20px !important;
          }

          /* === MODAL === */
          .modal-content h1 {
            font-size: 24px !important;
            margin: 24px 20px 12px !important;
          }

          .modal-content p {
            font-size: 14px !important;
            margin: 0 20px 20px !important;
          }

          .modal-content .text-\\[18px\\] {
            font-size: 16px !important;
            margin: 0 20px !important;
            padding-bottom: 24px !important;
          }

          .modal-content .bg-\\[\\#F9FAFB\\] {
            margin: 20px !important;
            padding: 24px !important;
          }
        }

        /* === EXTRA SMALL PHONES (480px and below) === */
        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 24px !important;
          }

          .hero-subline {
            font-size: 15px !important;
          }

          .hero-intro {
            display: none !important;
          }

          .hero-video {
            height: 450px !important;
          }

          h2 {
            font-size: 24px !important;
          }

          .premium-card,
          .insight-card {
            padding: 20px !important;
          }

          section {
            padding: 40px 16px !important;
          }

          nav .logo-button div {
            display: none !important;
          }

          .marine-emblem,
          .service-photo {
            display: none !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 premium-nav z-50 transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : ''
        }`}
        style={{ height: '88px' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="logo-button flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
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
              href="mailto:info@civicstrategypartners.com?subject=Consultation Request"
              className="premium-cta"
              style={{ padding: '10px 24px', fontSize: '16px' }}
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
              href="mailto:info@civicstrategypartners.com?subject=Consultation Request"
              className="premium-cta"
              style={{ padding: '10px 24px', fontSize: '16px' }}
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* Top Wave Bar */}
      <div className="wave-bar wave-bar-top silk-gradient"></div>

      {/* Hero Section with Video */}
      <section className="hero-video">
        <video ref={videoRef} autoPlay loop muted playsInline className="hero-video-bg">
          <source src="/dc_at_dusk.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div className="hero-content">
          <h1>Your GSA MAS Contract Won't Sell Itself.</h1>
          <p className="hero-subline">Civic Strategy Partners helps you diagnose, fix, and optimize your MAS or federal sales posture—so you stop missing revenue and start performing.</p>
          <p className="hero-intro">Most companies think a GSA Schedule will generate sales automatically. It won't. MAS performs only when it's aligned, maintained, and guided by someone who understands the doctrine—and your CO will not do that for you. If your contract is quiet, misaligned, or at risk of cancellation, you're not alone. CSP brings former-GSA insight and Marine-grade discipline to correct course and build a federal revenue engine that actually works.</p>
          <a href="#services" className="cta-button" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
        </div>
      </section>

      {/* Bottom Wave Bar */}
      <div className="wave-bar wave-bar-bottom silk-gradient"></div>

      {/* What We Do Section - White Background */}
      <section id="services" className="py-24 md:py-32 lg:py-[120px] px-6 bg-white fade-in-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
              What We Do
            </h2>
            <p className="text-[18px] text-[#6B7280]">
              Core services designed to diagnose, fix, and optimize your federal sales posture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="premium-card p-6">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                MAS Contract Diagnosis & Performance Correction
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                A MAS contract is not a vending machine. If the foundation is wrong, nothing you do in the marketplace will work. We identify exactly where your contract is failing and build a correction plan to restore compliance, visibility, and performance.
              </p>
              <a
                href="/services#mas-diagnosis"
                className="text-[#1e3a5f] text-[16px] font-medium learn-more-link"
                style={{ fontWeight: 500 }}
              >
                Learn More
              </a>
            </div>

            <div className="premium-card p-6">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Federal Readiness Roadmaps
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                Less than half of one percent of U.S. small businesses sell to the federal government, yet nearly $190B flowed to them last year. We build Federal Readiness Roadmaps that give you land navigation for the federal marketplace.
              </p>
              <a
                href="/services#readiness"
                className="text-[#1e3a5f] text-[16px] font-medium learn-more-link"
                style={{ fontWeight: 500 }}
              >
                Learn More
              </a>
            </div>

            <div className="premium-card p-6">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                MAS Advisory & Offer Support
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                CSP is not a proposal mill. We guide you through the MAS offer or mod process with expert oversight, helping you build the right offer, the right pricing, and the right structure from day one.
              </p>
              <a
                href="/services#advisory"
                className="text-[#1e3a5f] text-[16px] font-medium learn-more-link"
                style={{ fontWeight: 500 }}
              >
                Learn More
              </a>
            </div>

            <div className="premium-card p-6">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Post-Award Compliance & Lifecycle Support
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                MAS is a lifecycle program requiring accurate, timely maintenance. CSP supports mod packages, price list updates, EPA strategy, solicitation refresh alignment, and annual requirements. Healthy contracts sell.
              </p>
              <a
                href="/services#lifecycle"
                className="text-[#1e3a5f] text-[16px] font-medium learn-more-link"
                style={{ fontWeight: 500 }}
              >
                Learn More
              </a>
            </div>

            <div className="premium-card p-6">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Retainer-Based Support
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                Some clients need continuous support, not one-off fixes. CSP offers customizable Advisory and White-Glove retainer packages with direct access to the Principal Consultant and CSP-certified MAS technicians.
              </p>
              <a
                href="/services#retainer"
                className="text-[#1e3a5f] text-[16px] font-medium learn-more-link"
                style={{ fontWeight: 500 }}
              >
                Learn More
              </a>
            </div>

            <div className="premium-card p-6">
              <h3 className="text-[22px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                À La Carte Mod Support
              </h3>
              <p className="text-[#4B5563] text-[16px] mb-4" style={{ lineHeight: '1.6' }}>
                If you only need a clean, compliant modification, CSP offers à la carte mod support from administrative updates to major contract restructuring—handled by CSP-certified MAS technicians with strategic oversight.
              </p>
              <a
                href="/services#mods"
                className="text-[#1e3a5f] text-[16px] font-medium learn-more-link"
                style={{ fontWeight: 500 }}
              >
                Learn More
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

      {/* About Section - Side by Side Layout */}
      <section id="about" className="about-section py-24 md:py-32 lg:py-[120px] px-6 relative overflow-hidden fade-in-section">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        <div className="about-container max-w-[1200px] mx-auto relative z-10">
          {/* Iraq Photo - Left Side */}
          <div className="about-image">
            <img
              src="/A714F951-FD08-400C-9B27-FCCB0D74049D.JPG"
              alt="Kevin Martin - Operation Iraqi Freedom"
            />
            <p className="image-caption">
              Operation Iraqi Freedom<br />Kevin Martin, USMC
            </p>
          </div>

          {/* Text Content - Right Side */}
          <div className="about-content">
            <h2>
              <span className="line-1">Marine-Owned.</span>
              <span className="line-2">Mission-Driven.</span>
              <span className="line-3">Federal-Focused.</span>
            </h2>

            <div className="text-[16px] text-white/95 space-y-4" style={{ lineHeight: '1.7' }}>
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

            <div className="text-center mt-8">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="cta-button inline-block"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - White Background */}
      <section id="results" className="py-24 md:py-32 lg:py-[120px] px-6 bg-white fade-in-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
              Representative Outcomes & Typical Engagement Results
            </h2>
            <p className="text-[18px] text-[#6B7280] max-w-[800px] mx-auto" style={{ lineHeight: '1.6' }}>
              CSP engagements are confidential, and many clients come to us early in their federal journey. Instead of publishing sensitive details, we highlight representative scenarios that reflect the types of challenges we solve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="premium-card p-8">
              <h3 className="text-[20px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                MAS Structure Correction & Performance Alignment
              </h3>
              <p className="text-[#4B5563] text-[16px]" style={{ lineHeight: '1.6' }}>
                A services contractor with minimal MAS sales sought clarity on why their schedule wasn't gaining traction. Analysis revealed misaligned SINs, outdated labor categories, and pricing inconsistencies tied to older solicitation refreshes. CSP provided a corrective action roadmap to rebuild the contract's structure, restore compliance, and position the company for visibility with agency buyers.
              </p>
            </div>

            <div className="premium-card p-8">
              <h3 className="text-[20px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Federal Readiness Roadmap for a Growing Technology Firm
              </h3>
              <p className="text-[#4B5563] text-[16px]" style={{ lineHeight: '1.6' }}>
                A tech company exploring federal sales needed to understand market fit, competitive posture, and whether MAS should be part of their strategy. CSP built a Federal Readiness Roadmap assessing capabilities, NAICS alignment, SAM/DSBS posture, agency targets, and contract vehicle pathways. Leadership gained clarity on their federal entry points and a structured path toward future MAS alignment.
              </p>
            </div>

            <div className="premium-card p-8">
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
              href="mailto:info@civicstrategypartners.com?subject=Talk Through Your Scenario"
              className="inline-block premium-cta text-white px-10 py-4 text-[18px] font-semibold"
              style={{ fontWeight: 600 }}
            >
              Talk Through Your Scenario
            </a>
          </div>
        </div>
      </section>

      {/* Insights & Expertise Section - Light Glassmorphism Cards */}
      <section id="insights" className="insights-section fade-in-section">
        <div
          className="corner-decoration absolute top-5 left-5 w-20 h-20 border-t-[3px] border-l-[3px] border-white/30 z-10"
          style={{
            borderTopColor: 'rgba(255, 255, 255, 0.3)',
            borderLeftColor: 'rgba(255, 255, 255, 0.3)'
          }}
        ></div>
        <div
          className="corner-decoration absolute bottom-5 right-5 w-20 h-20 border-b-[3px] border-r-[3px] border-white/30 z-10"
          style={{
            borderBottomColor: 'rgba(255, 255, 255, 0.3)',
            borderRightColor: 'rgba(255, 255, 255, 0.3)'
          }}
        ></div>

        <div>
          <h2>Civil Strategy Briefing</h2>
          <p className="section-subtitle">Insights & Expertise for Government Contracting Success</p>

          <div className="insights-grid">
            {mockArticles.map((article, index) => (
              <article
                key={index}
                onClick={() => openModal(article)}
                className="insight-card"
              >
                <h3>{article.title}</h3>
                <span className="date">{formatDate(article.date)}</span>
                <p className="excerpt">
                  {article.content.substring(0, 150)}...
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(article);
                  }}
                  className="read-more"
                >
                  Read more
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Government Contracting News Section - White Background */}
      <section id="gsa-news" className="py-20 md:py-24 lg:py-[80px] px-6 bg-white fade-in-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
              Government Contracting News
            </h2>
            <p className="text-[18px] text-[#6B7280]">
              Latest updates on GSA Schedules, federal procurement, and contract opportunities
            </p>
          </div>

          {gsaNewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/95 backdrop-blur-[10px] border border-white/20 rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : gsaNewsError ? (
            <div className="text-center py-12">
              <p className="text-[16px] text-[#6B7280] mb-4">
                Unable to load latest government contracting news. Please visit{' '}
                <a
                  href="https://govconwire.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e3a5f] font-semibold hover:opacity-80 transition-opacity"
                >
                  GovConWire.com
                </a>
                {' '}directly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gsaNews.map((item, index) => (
                <article
                  key={index}
                  className="bg-white/95 backdrop-blur-[10px] border border-white/20 rounded-2xl p-6 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  style={{
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                  }}
                >
                  <span className="text-[14px] text-[#6B7280] uppercase block mb-2">
                    {item.pubDate}
                  </span>
                  <h3 className="text-[20px] font-semibold text-[#1e3a5f] mb-3 line-clamp-2" style={{ fontWeight: 600, lineHeight: '1.4' }}>
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-[#4B5563] mb-4 line-clamp-3" style={{ lineHeight: '1.6' }}>
                    {item.description.length > 120 ? item.description.substring(0, 120) + '...' : item.description}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-[#1e3a5f] font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                    style={{ fontWeight: 500 }}
                  >
                    Read Full Story →
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact/CTA Section - Navy Background */}
      <section id="contact" className="py-24 md:py-32 lg:py-[120px] px-6 relative overflow-hidden fade-in-section">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>
        <div className="max-w-[600px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-bold text-white mb-4" style={{ fontWeight: 700 }}>
              Get in Touch with Civic Strategy Partners
            </h2>
            <p className="text-[18px] text-white/90">
              Whether you need MAS diagnosis, federal readiness guidance, mod support, or a strategic advisor, CSP is here to help you move with clarity and purpose in the federal marketplace.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}>
            <iframe
              src="[FILLOUT_FORM_URL_HERE]"
              style={{ width: '100%', height: '700px', border: 'none', borderRadius: '8px' }}
              allowFullScreen
            ></iframe>
          </div>

          <div className="text-center mt-8">
            <p className="text-[16px] text-white/80 mb-2" style={{ fontFamily: 'Inter' }}>
              Or email directly:
            </p>
            <a
              href="mailto:info@civicstrategypartners.com"
              className="text-[18px] text-[#daa520] font-semibold hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Inter', fontWeight: 600, textDecoration: 'none' }}
            >
              info@civicstrategypartners.com
            </a>
          </div>

          <div className="text-center mt-8">
            <a
              href="mailto:info@civicstrategypartners.com?subject=Consultation Request"
              className="premium-cta inline-block text-white px-8 py-3.5 rounded-md text-[16px] font-semibold"
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
                href="mailto:info@civicstrategypartners.com?subject=Consultation Request"
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
                <a href="mailto:info@civicstrategypartners.com" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                  info@civicstrategypartners.com
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
