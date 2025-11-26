'use client';

import { useState, useEffect, useRef } from 'react';
import { Activity, Map, Briefcase, RefreshCw, Award, Package, Check } from 'lucide-react';

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
  const [isClient, setIsClient] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState<{title: string, content: string} | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [schedulingModalOpen, setSchedulingModalOpen] = useState(false);

  const services = [
    {
      id: 1,
      title: "MAS Performance Diagnosis & Correction",
      teaser: "We identify exactly where your contract is failing and build a correction plan to restore compliance, visibility, and performance.",
      fullDescription: `Your MAS contract isn't performing, and you know something's wrong—but pinpointing the exact issue can feel like navigating a maze blindfolded. That's where we come in.

Our MAS Performance Diagnosis & Correction service is built to give you clarity and a path forward. We don't just tell you what's broken—we show you why it broke, how to fix it, and how to prevent it from happening again.

**What You Receive:**
• Comprehensive contract health audit identifying compliance gaps, structural weaknesses, and performance blockers
• Root cause analysis showing exactly where and why your contract is underperforming
• Prioritized correction roadmap with clear, actionable steps to restore compliance and visibility
• Documentation package aligned with GSA expectations and audit requirements
• Implementation support to execute corrections and verify results

**The Outcome:**
You'll move from uncertainty to confidence—with a clear understanding of your contract's current state, a proven plan to fix what's broken, and the tools to maintain performance long-term. Your contract becomes an asset again, not a liability.`,
      outcomes: [
        "Contract compliance restored to GSA standards",
        "Visibility gaps closed with proper documentation",
        "Performance metrics improved and measurable",
        "Audit-ready documentation package delivered"
      ]
    },
    {
      id: 2,
      title: "Federal Readiness Roadmap",
      teaser: "We build Federal Readiness Roadmaps that give you land navigation for the federal marketplace.",
      fullDescription: `Entering the federal marketplace without a roadmap is like deploying without a mission brief—you're moving, but you don't know if you're moving toward the objective.

Our Federal Readiness Roadmap service gives you that mission brief. We assess where you are now, identify what's missing, and build a step-by-step plan to get you contract-ready—whether that means your first GSA Schedule, expanding into new agencies, or positioning for competitive bids.

**What You Receive:**
• Current state assessment of your federal readiness across compliance, capabilities, and positioning
• Gap analysis identifying what you need to compete effectively in your target markets
• Phased implementation roadmap with clear milestones, timelines, and resource requirements
• Market intelligence briefing on your target agencies, competitors, and procurement trends
• Certification and registration guidance (SAM, DSBS, GSA, etc.)

**The Outcome:**
You'll know exactly where you stand, what you need to build, and how to get there. No more guessing, no more wasted effort—just a clear path from where you are to where you need to be to win federal work.`,
      outcomes: [
        "Clear path from current state to contract-ready",
        "Market positioning strategy developed",
        "Certification roadmap with timelines",
        "Competitive intelligence on target agencies"
      ]
    },
    {
      id: 3,
      title: "MAS Advisory & Offer Strategy",
      teaser: "We guide you through the MAS offer or mod process with expert oversight, helping you build the right structure from day one.",
      fullDescription: `The MAS offer process isn't just complex—it's designed to catch mistakes. One wrong move in your initial offer can haunt you for years, from pricing structures that don't scale to compliance requirements you didn't know existed.

Our MAS Advisory & Offer Strategy service embeds expert guidance into your offer development from day one. We don't just review your work—we help you build it right the first time, avoiding the costly corrections and delays that plague most first-time offerors.

**What You Receive:**
• Pre-offer strategy session to align your offer structure with your business model and market positioning
• Offer development support including SIN selection, pricing strategy, T&C negotiation, and compliance documentation
• Real-time review and feedback as you build your offer, catching issues before they become problems
• GSA submission package review ensuring completeness, accuracy, and alignment with current requirements
• Post-award support to verify your contract is set up correctly and performing as expected

**The Outcome:**
Your MAS offer gets accepted faster, with fewer iterations and corrections. You'll launch with a contract structure that actually works for your business—not one that creates ongoing headaches or limits your growth.`,
      outcomes: [
        "Offer accepted with minimal iterations",
        "Pricing structure optimized for profitability",
        "Compliance documentation audit-ready",
        "Contract structure aligned with business model"
      ]
    },
    {
      id: 4,
      title: "MAS Lifecycle & Compliance Support",
      teaser: "CSP supports mod packages, price list updates, EPA strategy, solicitation refresh alignment, and annual requirements.",
      fullDescription: `Your GSA Schedule isn't a "set it and forget it" asset—it requires ongoing maintenance, updates, and strategic adjustments to stay compliant and competitive. Miss an update window or file the wrong paperwork, and you're looking at compliance issues, lost opportunities, or worse.

Our MAS Lifecycle & Compliance Support service takes the ongoing management burden off your plate. We handle the routine maintenance, guide you through strategic modifications, and keep you ahead of GSA's ever-changing requirements.

**What You Receive:**
• Annual compliance calendar with key deadlines, requirements, and submission windows
• Modification package development for price adjustments, SIN additions, T&C updates, and EPA changes
• Price list update support ensuring accuracy, compliance, and competitive positioning
• Solicitation refresh alignment to keep your contract competitive as GSA updates requirements
• Annual reporting and documentation support (sales reporting, SCA compliance, etc.)

**The Outcome:**
Your contract stays current, compliant, and competitive without consuming your internal resources. You'll never miss a deadline, file incorrect paperwork, or lose market positioning because your contract fell out of date.`,
      outcomes: [
        "100% on-time compliance with GSA deadlines",
        "Contract modifications executed correctly",
        "Competitive positioning maintained",
        "Zero compliance violations or penalties"
      ]
    },
    {
      id: 5,
      title: "White-Glove Retainer Support",
      teaser: "CSP offers customizable Advisory and White-Glove retainer packages with direct access to the Principal Consultant.",
      fullDescription: `Some federal contractors don't need project-based support—they need a trusted advisor on call. Someone who understands their business, knows their contract inside and out, and can provide strategic guidance when decisions need to be made quickly.

Our White-Glove Retainer Support service gives you that advisor. Think of it as having a GSA expert embedded in your team—available when you need guidance, proactive about keeping your contract optimized, and invested in your long-term success.

**What You Receive:**
• Direct access to the Principal Consultant with guaranteed response times
• Proactive contract monitoring to identify opportunities, risks, and required actions before they become urgent
• Strategic guidance on pricing, modifications, market positioning, and growth opportunities
• Priority support for urgent issues, questions, or time-sensitive decisions
• Quarterly business reviews to assess performance, adjust strategy, and plan ahead

**The Outcome:**
You'll operate with confidence, knowing you have expert guidance available whenever you need it. Your contract becomes a strategic asset actively managed for maximum performance, not a compliance burden you're constantly worried about.`,
      outcomes: [
        "Expert guidance available on-demand",
        "Proactive contract optimization",
        "Strategic decisions made with confidence",
        "Long-term partnership vs. transactional support"
      ]
    },
    {
      id: 6,
      title: "À La Carte Mod Support",
      teaser: "CSP offers à la carte mod support from administrative updates to major contract restructuring.",
      fullDescription: `Not every modification requires full-service support. Sometimes you just need expert help with a specific change—a SIN addition, a price adjustment, a T&C update, or a major contract restructuring.

Our À La Carte Mod Support service gives you flexible, project-based assistance for individual modifications. You get the expertise you need without committing to ongoing support—perfect for contractors who manage their contracts internally but want expert backup for specific changes.

**What You Receive:**
• Modification scoping and strategy to determine the best approach for your specific change
• Package development support including documentation, pricing analysis, and compliance verification
• GSA submission review ensuring accuracy and completeness before filing
• Follow-up support to address any GSA questions or requested revisions
• Implementation guidance to execute approved modifications correctly

**The Outcome:**
Your modification gets filed correctly, approved faster, and implemented properly—without the delays, rejections, or compliance issues that come from DIY approaches. You get expert help exactly when and where you need it.`,
      outcomes: [
        "Modifications approved on first submission",
        "No compliance issues or rejections",
        "Faster approval timelines",
        "Expertise applied only where needed"
      ]
    }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);


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

  const legalContent = {
    privacy: {
      title: "Privacy Policy",
      content: `Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

INTRODUCTION
Civic Strategy Partners, LLC ("CSP," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

INFORMATION WE COLLECT
We collect information that you provide directly to us, including:
• Name, email address, phone number, and company information
• Communications you send to us
• Information you provide when requesting our services
• Payment and billing information

We also automatically collect certain information when you visit our website:
• Log and usage data
• Device and browser information
• Cookies and similar technologies

HOW WE USE YOUR INFORMATION
We use the information we collect to:
• Provide, maintain, and improve our services
• Process your requests and transactions
• Send you technical notices and support messages
• Respond to your comments and questions
• Communicate with you about services, offers, and events

DATA SECURITY
We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

YOUR RIGHTS
You have the right to:
• Access your personal information
• Correct inaccurate information
• Request deletion of your information
• Opt-out of marketing communications

CONTACT US
If you have questions about this Privacy Policy, please contact us at:
Civic Strategy Partners, LLC
Email: info@civicstrategypartners.com`
    },
    terms: {
      title: "Terms of Service",
      content: `Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

AGREEMENT TO TERMS
By accessing or using the services of Civic Strategy Partners, LLC ("CSP"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use our services.

SERVICES
CSP provides government contracting advisory services, including but not limited to:
• GSA Multiple Award Schedule (MAS) consulting
• Federal readiness assessments
• Compliance support
• Strategic advisory services

CLIENT RESPONSIBILITIES
Clients agree to:
• Provide accurate and complete information
• Cooperate with CSP in good faith
• Comply with all applicable laws and regulations
• Maintain confidentiality of proprietary information

FEES AND PAYMENT
• Fees are specified in individual service agreements
• Payment terms are outlined in engagement letters
• Late payments may incur additional charges

INTELLECTUAL PROPERTY
All materials, content, and deliverables created by CSP remain our intellectual property unless explicitly transferred in writing.

CONFIDENTIALITY
Both parties agree to maintain confidentiality of sensitive information shared during the engagement.

LIMITATION OF LIABILITY
CSP's liability is limited to the fees paid for the specific services that gave rise to the claim. We are not liable for indirect, incidental, or consequential damages.

TERMINATION
Either party may terminate services with written notice as specified in the engagement agreement.

GOVERNING LAW
These terms are governed by the laws of the jurisdiction where CSP operates.

CONTACT
For questions about these Terms, contact:
Civic Strategy Partners, LLC
Email: info@civicstrategypartners.com`
    },
    disclaimer: {
      title: "Disclaimer",
      content: `PROFESSIONAL SERVICES DISCLAIMER

Civic Strategy Partners, LLC ("CSP") provides consulting and advisory services related to government contracting and GSA Multiple Award Schedule (MAS) matters. The following disclaimers apply to all services and information provided:

NO GUARANTEE OF RESULTS
CSP does not guarantee any specific outcome, including but not limited to:
• Award of government contracts
• GSA Schedule approval
• Specific revenue or sales results
• Resolution of compliance issues

Success depends on numerous factors beyond CSP's control, including but not limited to client qualifications, market conditions, government policies, and agency decisions.

NOT LEGAL ADVICE
CSP is not a law firm. Our services do not constitute legal advice. Clients should consult with qualified legal counsel for legal matters related to government contracting.

NO AGENCY RELATIONSHIP
CSP is not an agent of the General Services Administration (GSA) or any other government agency. We operate as an independent consultant.

INFORMATION ACCURACY
While we strive to provide accurate and current information, government contracting rules and regulations change frequently. CSP is not responsible for:
• Changes in regulations after information is provided
• Errors or omissions in third-party information
• Client misunderstanding or misapplication of guidance

CLIENT RESPONSIBILITY
Clients are ultimately responsible for:
• Compliance with all government contracting regulations
• Accuracy of submissions to government agencies
• Business decisions based on CSP guidance
• Maintaining their contracts and certifications

NO WARRANTIES
Services are provided "as is" without warranties of any kind, express or implied.

LIMITATION OF LIABILITY
CSP's liability is limited as specified in individual engagement agreements.

CONTACT
Questions about this disclaimer should be directed to:
Civic Strategy Partners, LLC
Email: info@civicstrategypartners.com`
    },
    cookies: {
      title: "Cookie Policy",
      content: `Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

INTRODUCTION
This Cookie Policy explains how Civic Strategy Partners, LLC ("CSP") uses cookies and similar technologies on our website.

WHAT ARE COOKIES
Cookies are small text files stored on your device when you visit a website. They help websites function properly and provide information to website owners.

TYPES OF COOKIES WE USE

Essential Cookies
These cookies are necessary for the website to function and cannot be disabled:
• Session management
• Security features
• Basic functionality

Analytics Cookies
These cookies help us understand how visitors interact with our website:
• Page views and navigation patterns
• Time spent on pages
• Traffic sources
• Device and browser information

Functional Cookies
These cookies enable enhanced functionality:
• Remembering preferences
• Personalized content
• Form completion assistance

THIRD-PARTY COOKIES
We may use third-party services that set their own cookies:
• Analytics providers
• Social media platforms
• Marketing partners

MANAGING COOKIES
You can control cookies through your browser settings:
• Block all cookies
• Block third-party cookies
• Delete existing cookies
• Receive notifications when cookies are set

Note: Disabling cookies may affect website functionality.

YOUR CONSENT
By using our website, you consent to our use of cookies as described in this policy.

UPDATES
We may update this Cookie Policy periodically. Changes will be posted on this page with an updated revision date.

CONTACT
For questions about our Cookie Policy:
Civic Strategy Partners, LLC
Email: info@civicstrategypartners.com`
    },
    accessibility: {
      title: "Accessibility Statement",
      content: `COMMITMENT TO ACCESSIBILITY

Civic Strategy Partners, LLC ("CSP") is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.

CONFORMANCE STATUS
We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities.

MEASURES TO SUPPORT ACCESSIBILITY
CSP takes the following measures to ensure accessibility:
• Include accessibility as part of our mission statement
• Integrate accessibility into our procurement practices
• Provide continual accessibility training for our staff
• Include people with disabilities in our design processes

TECHNICAL SPECIFICATIONS
Our website relies on the following technologies:
• HTML
• CSS
• JavaScript

These technologies are used in conformance with WCAG 2.1 standards.

LIMITATIONS AND ALTERNATIVES
Despite our efforts, some limitations may exist:
• Third-party embedded content may not be fully accessible
• Legacy documents may not meet current standards
• Some features may require JavaScript enabled

We are actively working to address these limitations.

FEEDBACK
We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers, please contact us:

Civic Strategy Partners, LLC
Email: info@civicstrategypartners.com
Phone: Contact through website inquiry form

We aim to respond to accessibility feedback within 5 business days.

ASSESSMENT
We regularly assess our website's accessibility through:
• Self-evaluation
• External accessibility audits
• User testing with people with disabilities

FORMAL COMPLAINTS
If you are not satisfied with our response to your accessibility concerns, you have the right to file a formal complaint with:
• U.S. Department of Justice
• Your local civil rights office

UPDATES
This statement was last updated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and will be reviewed regularly.`
    }
  };

  const openLegalModal = (type: 'privacy' | 'terms' | 'disclaimer' | 'cookies' | 'accessibility') => {
    setLegalModalContent(legalContent[type]);
    setLegalModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLegalModal = () => {
    setLegalModalOpen(false);
    setLegalModalContent(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalOpen) closeModal();
        if (legalModalOpen) closeLegalModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [modalOpen, legalModalOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
          margin-top: 100px;
        }

        @keyframes wave-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-video {
          position: relative;
          width: 100%;
          min-height: 80vh;
          height: auto;
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
          .hero-video {
            min-height: 70vh;
          }

          .hero-content h1 {
            font-size: clamp(20px, 5.5vw, 52px);
            letter-spacing: -0.03em;
            white-space: normal;
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
        }

        .insights-section {
          background: #ffffff;
          padding: 80px 24px;
          position: relative;
        }

        .insights-section h2 {
          font-size: 42px;
          font-weight: 800;
          color: #1e3a5f;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 18px;
          color: #6B7280;
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
          background: #ffffff;
          backdrop-filter: blur(10px);
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 32px;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .insight-card:hover {
          background: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          border-color: #d1d5db;
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

        /* === ORBITAL SERVICES LAYOUT === */
        .logo-glow-breathe {
          animation: logo-breathe 4s ease-in-out infinite;
        }

        @keyframes logo-breathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.8;
          }
        }

        /* Orbital Card Hover Effects */
        .orbital-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(30, 58, 95, 0.15) !important;
          border: 2px solid transparent !important;
          background-image: linear-gradient(white, white), linear-gradient(135deg, #1e3a5f, #c9a227) !important;
          background-origin: border-box !important;
          background-clip: padding-box, border-box !important;
        }

        .orbital-card-middle-left:hover {
          transform: translateY(-50%) translateY(-8px) scale(1.02) !important;
        }

        .orbital-card-middle-right:hover {
          transform: translateY(-50%) translateY(-8px) scale(1.02) !important;
        }

        .orbital-card:hover .card-cta-text {
          color: #c9a227;
        }

        .orbital-card:hover .card-arrow {
          transform: translateX(6px);
        }

        .card-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
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

        /* ========== DESKTOP OPTIMIZATIONS FOR SERVICE MODALS ========== */
        @media (min-width: 1024px) {
          .service-modal-container {
            max-width: 900px;
          }

          .service-modal-content {
            padding: 40px;
          }

          .service-modal-title {
            font-size: 28px;
            margin-bottom: 20px;
          }

          .service-modal-description {
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 24px;
          }

          .service-modal-outcomes {
            padding: 20px;
          }

          .service-modal-outcomes h3 {
            font-size: 20px;
            margin-bottom: 14px;
          }

          .outcomes-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px 20px;
            font-size: 14px;
            line-height: 1.6;
          }

          .outcomes-list li {
            margin-bottom: 0;
          }

          /* Article Modal Desktop Optimizations */
          .article-modal-container {
            max-width: 850px;
          }

          .article-modal-title {
            font-size: 28px;
            margin: 32px 32px 12px;
          }

          .article-modal-content {
            font-size: 16px;
            line-height: 1.7;
            margin: 0 32px;
            padding-bottom: 24px;
          }

          .article-modal-content p {
            margin-bottom: 20px;
          }
        }

        /* ========== COMPREHENSIVE MOBILE RESPONSIVE STYLES ========== */

        @media (max-width: 768px) {

          /* === NAVIGATION === */
          nav {
            padding: 12px 16px !important;
            height: 64px !important;
          }

          nav .logo-button img {
            height: 52px !important;
          }

          nav .logo-button div {
            display: none !important;
          }

          nav button,
          nav a {
            font-size: 14px !important;
          }

          nav .premium-cta {
            padding: 8px 16px !important;
            font-size: 14px !important;
          }

          .mobile-contact-btn {
            font-size: 12px !important;
            padding: 6px 12px !important;
          }

          /* === WAVE BARS === */
          .wave-bar {
            height: 60px !important;
          }

          .wave-bar-top {
            margin-top: 64px !important;
          }

          /* === HERO SECTION === */
          .hero-video {
            min-height: calc(100vh - 60px - 120px) !important;
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

          footer .flex {
            flex-direction: column !important;
            gap: 40px !important;
          }

          /* === FOOTER LEGAL LINKS - MOBILE === */
          .legal-links-container {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 6px !important;
          }

          .legal-link {
            font-size: 13px !important;
            padding: 3px 0 !important;
            line-height: 1.3 !important;
          }

          /* Hide first separator after Privacy Policy */
          .legal-link:nth-child(1) + .legal-separator {
            display: none !important;
          }

          /* Row 2: Terms + Separator + Disclaimer */
          .legal-link:nth-child(3),
          .legal-link:nth-child(3) + .legal-separator,
          .legal-link:nth-child(5) {
            display: inline !important;
          }

          /* Hide separator after Disclaimer */
          .legal-link:nth-child(5) + .legal-separator {
            display: none !important;
          }

          /* Row 3: Cookie + Separator + Accessibility */
          .legal-link:nth-child(7),
          .legal-link:nth-child(7) + .legal-separator,
          .legal-link:nth-child(9) {
            display: inline !important;
          }

          .legal-separator {
            margin: 0 8px !important;
          }

          /* === SERVICE MODAL === */
          .service-modal-container {
            max-width: 95vw !important;
          }

          .service-modal-content {
            padding: 24px !important;
          }

          .service-modal-title {
            font-size: 24px !important;
            margin-bottom: 16px !important;
          }

          .service-modal-description {
            font-size: 14px !important;
            margin-bottom: 20px !important;
          }

          .service-modal-outcomes {
            padding: 16px !important;
          }

          .outcomes-list {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
            font-size: 13px !important;
          }

          /* === ARTICLE MODAL === */
          .article-modal-container {
            max-width: 95vw !important;
          }

          .article-modal-title {
            font-size: 22px !important;
            margin: 24px 20px 12px !important;
          }

          .article-modal-content {
            font-size: 15px !important;
            margin: 0 20px !important;
            padding-bottom: 20px !important;
          }

          .article-modal-content p {
            margin-bottom: 16px !important;
          }

          /* === WHY CSP SECTION === */
          .why-csp-card svg {
            width: 40px !important;
            height: 40px !important;
          }

          .why-csp-card h3 {
            font-size: 18px !important;
          }

          .why-csp-card p {
            font-size: 14px !important;
          }

          .why-csp-card {
            padding: 24px !important;
          }

          /* === CONTACT SECTION === */
          .contact-card {
            padding: 32px !important;
          }

          .contact-icon {
            width: 40px !important;
            height: 40px !important;
          }

          .contact-card-title {
            font-size: 20px !important;
          }

          .contact-promise-line {
            font-size: 20px !important;
          }

          /* Very small mobile screens - reduce to 18px to keep on one line */
          @media (max-width: 480px) {
            .contact-promise-line {
              font-size: 18px !important;
            }
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

        /* === MOBILE RESPONSIVE FIXES === */
        @media (max-width: 767px) {
          /* WHAT WE DO SECTION - HIDE ORBITAL, SHOW SIMPLE STACK */
          #services .logo-accent-mobile {
            display: flex !important;
            position: relative !important;
            z-index: 10 !important;
            animation: fadeInDown 0.6s ease-out;
          }

          #services .logo-accent-mobile > div {
            backdrop-filter: blur(10px);
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          #services .center-logo-hub {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }

          #services .relative.w-full.mx-auto {
            height: auto !important;
            max-width: 100% !important;
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }

          #services svg {
            display: none !important;
            visibility: hidden !important;
          }

          #services .absolute.cursor-pointer {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            transform: none !important;
            margin-bottom: 0 !important;
            padding: 20px 18px !important;
            z-index: 1 !important;
          }

          #services .absolute.cursor-pointer h3 {
            font-size: 1.1rem !important;
            line-height: 1.3 !important;
          }

          #services .absolute.cursor-pointer p {
            font-size: 0.85rem !important;
            line-height: 1.4 !important;
          }

          #services .absolute.cursor-pointer button {
            font-size: 0.8rem !important;
            padding: 8px 14px !important;
          }

          /* SERVICES SECTION - AGGRESSIVE SCALING */
          .services-section {
            padding: 2.5rem 1rem !important;
          }

          .services-header {
            margin-bottom: 2rem !important;
          }

          .services-header p:first-child {
            font-size: 0.75rem !important;
          }

          .services-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.75rem !important;
          }

          .services-subtitle {
            font-size: 0.85rem !important;
          }

          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          .service-card {
            padding: 18px 16px !important;
          }

          .service-card-header {
            margin-bottom: 10px !important;
          }

          .service-card-title {
            font-size: 1rem !important;
            line-height: 1.3 !important;
            padding-right: 8px !important;
          }

          .service-card-star {
            width: 38px !important;
            height: 38px !important;
          }

          .service-card-star svg {
            width: 24px !important;
            height: 24px !important;
          }

          .service-card-description {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
            margin-bottom: 12px !important;
          }

          .service-card-receive {
            margin-bottom: 12px !important;
            padding: 12px !important;
          }

          .service-card-receive-label {
            font-size: 0.65rem !important;
            margin-bottom: 8px !important;
          }

          .service-card-receive ul {
            gap: 6px !important;
          }

          .service-card-receive li {
            font-size: 0.7rem !important;
            line-height: 1.3 !important;
            padding-left: 18px !important;
          }

          .service-card-outcome {
            margin-top: 12px !important;
            padding-top: 12px !important;
          }

          .service-card-outcome-number {
            font-size: 1.2rem !important;
          }

          .service-card-outcome-label {
            font-size: 0.7rem !important;
          }

          /* REPRESENTATIVE OUTCOMES SECTION */
          .glass-card {
            padding: 20px !important;
          }

          .glass-card h3 {
            font-size: 1.1rem !important;
            margin-bottom: 12px !important;
          }

          .glass-card p {
            font-size: 0.8rem !important;
            line-height: 1.5 !important;
          }

          section[style*="py-24"],
          section[style*="py-32"] {
            padding-top: 2.5rem !important;
            padding-bottom: 2.5rem !important;
          }

          section h2 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }

          section p {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
        }

        /* === TABLET RESPONSIVE (768px - 1023px) === */
        @media (min-width: 768px) and (max-width: 1023px) {
          /* WHAT WE DO SECTION - Show small logo, hide large center logo */
          #services .logo-accent-mobile {
            display: flex !important;
            position: relative !important;
            z-index: 10 !important;
            animation: fadeInDown 0.6s ease-out;
          }

          #services .logo-accent-mobile > div {
            backdrop-filter: blur(10px);
          }

          #services .center-logo-hub {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }

          #services .relative.w-full.mx-auto {
            position: relative !important;
            z-index: 1 !important;
          }

          .services-title {
            font-size: 2rem !important;
          }

          .services-subtitle {
            font-size: 0.9rem !important;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }

          .service-card-title {
            font-size: 1.15rem !important;
          }

          .service-card-description {
            font-size: 0.8rem !important;
          }

          .service-card-receive li {
            font-size: 0.8rem !important;
          }

          section h2 {
            font-size: 1.75rem !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 premium-nav z-50 transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : ''
        }`}
        style={{ height: '100px' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="logo-button flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/CSP Simple No Background.png"
              alt="Civic Strategy Partners Logo"
              className="h-[85px] w-auto object-contain"
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

          <div className="md:hidden flex items-center gap-3">
            <a
              href="mailto:info@civicstrategypartners.com?subject=Consultation Request"
              className="mobile-contact-btn text-white font-semibold text-[12px] px-3 py-1.5 rounded-md transition-all"
              style={{
                background: 'linear-gradient(135deg, #b8860b 0%, #daa520 100%)',
                boxShadow: '0 2px 8px rgba(184, 134, 11, 0.3)'
              }}
            >
              Contact
            </a>
            <button
              className="text-[#0F172A]"
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
              className="premium-cta text-center"
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
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg"
          style={{ opacity: isClient ? 1 : 0, transition: 'opacity 0.3s ease-in' }}
        >
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

      {/* What We Do Section - Orbital Layout */}
      {/* What We Do Section - Orbital Layout with Expandable Modals */}
      <section id="services" className="pt-12 pb-16 px-6 bg-[#f0f4f8] fade-in-section">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            {/* Small Logo Accent - Mobile/Tablet Only */}
            <div className="logo-accent-mobile" style={{
              display: 'none',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 4px 16px rgba(30, 58, 95, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <img
                  src="/Civic Strategy Partners Minus LLC.png"
                  alt="Civic Strategy Partners"
                  style={{
                    width: '100px',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
            </div>

            <h2 className="text-[2.75rem] font-bold text-[#1e3a5f] mb-3" style={{ fontFamily: 'Merriweather, serif', fontWeight: 700 }}>
              What We Do
            </h2>
            <p className="text-[1rem] text-[#6B7280]" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
              Core services designed to diagnose, fix, and optimize your federal sales posture
            </p>
          </div>

          {/* Orbital Layout Container */}
          <div className="relative w-full mx-auto" style={{ height: '800px', maxWidth: '1200px' }}>

            {/* SVG Connection Lines Layer */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              viewBox="0 0 1200 800"
              preserveAspectRatio="xMidYMid meet"
              style={{ zIndex: 1 }}
            >
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'rgba(201, 162, 39, 0.1)' }} />
                  <stop offset="50%" style={{ stopColor: 'rgba(201, 162, 39, 0.4)' }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(201, 162, 39, 0.1)' }} />
                </linearGradient>

                <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feFlood floodColor="#c9a227" floodOpacity="0.6"/>
                  <feComposite in2="blur" operator="in"/>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <filter id="pulseGlowNavy" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feFlood floodColor="#2c5282" floodOpacity="0.5"/>
                  <feComposite in2="blur" operator="in"/>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{ stopColor: 'rgba(201, 162, 39, 0.15)' }} />
                  <stop offset="100%" style={{ stopColor: 'transparent' }} />
                </radialGradient>
              </defs>

              <circle cx="600" cy="400" r="140" fill="url(#hubGlow)" opacity="0.5">
                <animate attributeName="r" values="140;155;140" dur="4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.5;0.7;0.5" dur="4s" repeatCount="indefinite"/>
              </circle>

              <circle cx="600" cy="400" r="220" fill="none" stroke="rgba(30, 58, 95, 0.05)" strokeWidth="1" />
              <circle cx="600" cy="400" r="180" fill="none" stroke="rgba(201, 162, 39, 0.1)" strokeWidth="1.5" strokeDasharray="4 8">
                <animateTransform attributeName="transform" type="rotate" from="0 600 400" to="360 600 400" dur="60s" repeatCount="indefinite"/>
              </circle>
              <circle cx="600" cy="400" r="150" fill="none" stroke="rgba(30, 58, 95, 0.08)" strokeWidth="1" strokeDasharray="2 6">
                <animateTransform attributeName="transform" type="rotate" from="0 600 400" to="-360 600 400" dur="45s" repeatCount="indefinite"/>
              </circle>

              <path id="path1" d="M 180 89 Q 350 222 600 356" fill="none" stroke="rgba(30, 58, 95, 0.08)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 180 89 Q 350 222 600 356" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="6 14" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="15s" repeatCount="indefinite"/>
              </path>

              <path id="path2" d="M 1020 89 Q 850 222 600 356" fill="none" stroke="rgba(30, 58, 95, 0.08)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 1020 89 Q 850 222 600 356" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="6 14" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="-40" to="-240" dur="15s" repeatCount="indefinite"/>
              </path>

              <path id="path3" d="M 20 400 Q 280 400 520 400" fill="none" stroke="rgba(30, 58, 95, 0.08)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 20 400 Q 280 400 520 400" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="6 14" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="-80" to="-280" dur="15s" repeatCount="indefinite"/>
              </path>

              <path id="path4" d="M 1180 400 Q 920 400 680 400" fill="none" stroke="rgba(30, 58, 95, 0.08)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 1180 400 Q 920 400 680 400" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="6 14" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="-120" to="-320" dur="15s" repeatCount="indefinite"/>
              </path>

              <path id="path5" d="M 180 711 Q 350 578 600 444" fill="none" stroke="rgba(30, 58, 95, 0.08)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 180 711 Q 350 578 600 444" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="6 14" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="-160" to="-360" dur="15s" repeatCount="indefinite"/>
              </path>

              <path id="path6" d="M 1020 711 Q 850 578 600 444" fill="none" stroke="rgba(30, 58, 95, 0.08)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M 1020 711 Q 850 578 600 444" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="6 14" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="-200" to="-400" dur="15s" repeatCount="indefinite"/>
              </path>

              {/* Pulse Dots */}
              <circle r="7" fill="#c9a227" filter="url(#pulseGlow)" opacity="0">
                <animateMotion dur="2.8s" repeatCount="indefinite"><mpath href="#path1"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite"/>
              </circle>
              <circle r="7" fill="#c9a227" filter="url(#pulseGlow)" opacity="0">
                <animateMotion dur="3.2s" repeatCount="indefinite" begin="0.6s"><mpath href="#path2"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" repeatCount="indefinite" begin="0.6s"/>
              </circle>
              <circle r="7" fill="#c9a227" filter="url(#pulseGlow)" opacity="0">
                <animateMotion dur="2.4s" repeatCount="indefinite" begin="1.2s"><mpath href="#path3"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" begin="1.2s"/>
              </circle>
              <circle r="7" fill="#c9a227" filter="url(#pulseGlow)" opacity="0">
                <animateMotion dur="2.4s" repeatCount="indefinite" begin="1.8s"><mpath href="#path4"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="indefinite" begin="1.8s"/>
              </circle>
              <circle r="7" fill="#c9a227" filter="url(#pulseGlow)" opacity="0">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin="2.4s"><mpath href="#path5"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" begin="2.4s"/>
              </circle>
              <circle r="7" fill="#c9a227" filter="url(#pulseGlow)" opacity="0">
                <animateMotion dur="3.2s" repeatCount="indefinite" begin="3s"><mpath href="#path6"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" repeatCount="indefinite" begin="3s"/>
              </circle>

              <circle r="5" fill="#2c5282" filter="url(#pulseGlowNavy)" opacity="0">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s"><mpath href="#path1"/></animateMotion>
                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.8s" repeatCount="indefinite" begin="1.4s"/>
              </circle>
              <circle r="5" fill="#2c5282" filter="url(#pulseGlowNavy)" opacity="0">
                <animateMotion dur="3.2s" repeatCount="indefinite" begin="2.2s"><mpath href="#path2"/></animateMotion>
                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="3.2s" repeatCount="indefinite" begin="2.2s"/>
              </circle>
              <circle r="5" fill="#2c5282" filter="url(#pulseGlowNavy)" opacity="0">
                <animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#path3"/></animateMotion>
                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.4s" repeatCount="indefinite"/>
              </circle>
              <circle r="5" fill="#2c5282" filter="url(#pulseGlowNavy)" opacity="0">
                <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.6s"><mpath href="#path4"/></animateMotion>
                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.4s" repeatCount="indefinite" begin="0.6s"/>
              </circle>
              <circle r="5" fill="#2c5282" filter="url(#pulseGlowNavy)" opacity="0">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.8s"><mpath href="#path5"/></animateMotion>
                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.8s" repeatCount="indefinite" begin="0.8s"/>
              </circle>
              <circle r="5" fill="#2c5282" filter="url(#pulseGlowNavy)" opacity="0">
                <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.5s"><mpath href="#path6"/></animateMotion>
                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="3.2s" repeatCount="indefinite" begin="1.5s"/>
              </circle>
            </svg>

            {/* Center Logo Hub */}
            <div
              className="absolute center-logo-hub"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
            >
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '320px',
                  height: '320px',
                  background: 'radial-gradient(circle, rgba(201, 162, 39, 0.12) 0%, transparent 70%)',
                  animation: 'logo-breathe 4s ease-in-out infinite',
                  zIndex: -1
                }}
              />

              <div
                className="relative"
                style={{
                  width: '260px',
                  height: '260px',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: '28px',
                  border: '2px solid rgba(30, 58, 95, 0.06)',
                  boxShadow: '0 10px 50px rgba(30, 58, 95, 0.12), 0 2px 10px rgba(30, 58, 95, 0.06), inset 0 2px 0 rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '28px', height: '28px', border: '2.5px solid #c9a227', borderRight: 'none', borderBottom: 'none', borderRadius: '8px 0 0 0', opacity: 0.6 }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', width: '28px', height: '28px', border: '2.5px solid #c9a227', borderLeft: 'none', borderBottom: 'none', borderRadius: '0 8px 0 0', opacity: 0.6 }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '28px', height: '28px', border: '2.5px solid #c9a227', borderRight: 'none', borderTop: 'none', borderRadius: '0 0 0 8px', opacity: 0.6 }} />
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '28px', height: '28px', border: '2.5px solid #c9a227', borderLeft: 'none', borderTop: 'none', borderRadius: '0 0 8px 0', opacity: 0.6 }} />

                <img src="/Civic Strategy Partners Minus LLC.png" alt="Civic Strategy Partners" style={{ width: '180px', height: 'auto', objectFit: 'contain' }} />
              </div>
            </div>

            {/* Service Cards - CLICKABLE */}
            {[
              { position: { top: '20px', left: '10px' }, service: services[0] },
              { position: { top: '20px', right: '10px' }, service: services[1] },
              { position: { top: '50%', left: '0', transform: 'translateY(-50%)' }, service: services[2] },
              { position: { top: '50%', right: '0', transform: 'translateY(-50%)' }, service: services[3] },
              { position: { bottom: '20px', left: '10px' }, service: services[4] },
              { position: { bottom: '20px', right: '10px' }, service: services[5] }
            ].map(({ position, service }, idx) => (
              <div
                key={service.id}
                className="absolute cursor-pointer"
                style={{
                  ...position,
                  width: '250px',
                  height: '240px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '26px 22px',
                  border: '1px solid rgba(30, 58, 95, 0.06)',
                  boxShadow: '0 4px 24px rgba(30, 58, 95, 0.08)',
                  zIndex: 10,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => setExpandedService(service.id)}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  const isMiddle = position.transform === 'translateY(-50%)';
                  el.style.transform = isMiddle ? 'translateY(-50%) translateY(-10px) scale(1.03)' : 'translateY(-10px) scale(1.03)';
                  el.style.boxShadow = '0 20px 60px rgba(30, 58, 95, 0.15)';
                  el.style.border = '2px solid transparent';
                  el.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), linear-gradient(135deg, #1e3a5f, #c9a227)';
                  el.style.backgroundOrigin = 'border-box';
                  el.style.backgroundClip = 'padding-box, border-box';
                  const cta = el.querySelector('[data-cta]');
                  if (cta) (cta as HTMLElement).style.color = '#c9a227';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  const isMiddle = position.transform === 'translateY(-50%)';
                  el.style.transform = isMiddle ? 'translateY(-50%)' : '';
                  el.style.boxShadow = '0 4px 24px rgba(30, 58, 95, 0.08)';
                  el.style.border = '1px solid rgba(30, 58, 95, 0.06)';
                  el.style.backgroundImage = '';
                  const cta = el.querySelector('[data-cta]');
                  if (cta) (cta as HTMLElement).style.color = '#1e3a5f';
                }}
              >
                <h3 style={{
                  fontFamily: 'Merriweather, serif',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#1e3a5f',
                  lineHeight: 1.3
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontFamily: 'Source Sans Pro, sans-serif',
                  fontSize: '0.875rem',
                  color: '#4a5568',
                  lineHeight: 1.6
                }}>
                  {service.teaser}
                </p>
                <div data-cta style={{
                  fontFamily: 'Source Sans Pro, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#1e3a5f',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.3s ease'
                }}>
                  Learn More <span>→</span>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Modal Overlay - Shows when card is clicked */}
        {expandedService !== null && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setExpandedService(null)}
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <div
              className="bg-white rounded-2xl service-modal-container w-full max-h-[85vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 24px 80px rgba(0, 0, 0, 0.3)',
                maxWidth: '900px'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedService(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                style={{ zIndex: 10 }}
              >
                <span style={{ fontSize: '1.5rem', color: '#4a5568' }}>×</span>
              </button>

              {/* Modal Content */}
              <div className="service-modal-content" style={{ padding: '40px' }}>
                {services.filter(s => s.id === expandedService).map(service => (
                  <div key={service.id}>
                    <h2 className="service-modal-title" style={{
                      fontFamily: 'Merriweather, serif',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#1e3a5f',
                      marginBottom: '20px',
                      lineHeight: 1.2
                    }}>
                      {service.title}
                    </h2>

                    <div className="service-modal-description" style={{
                      fontFamily: 'Source Sans Pro, sans-serif',
                      fontSize: '15px',
                      color: '#374151',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                      marginBottom: '24px'
                    }}>
                      {service.fullDescription}
                    </div>

                    <div className="service-modal-outcomes" style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.05), rgba(201, 162, 39, 0.05))',
                      borderRadius: '16px',
                      borderLeft: '4px solid #c9a227'
                    }}>
                      <h3 style={{
                        fontFamily: 'Merriweather, serif',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#1e3a5f',
                        marginBottom: '14px'
                      }}>
                        Key Outcomes
                      </h3>
                      <ul className="outcomes-list" style={{
                        fontFamily: 'Source Sans Pro, sans-serif',
                        fontSize: '14px',
                        color: '#374151',
                        lineHeight: 1.6,
                        paddingLeft: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '8px 20px'
                      }}>
                        {service.outcomes.map((outcome, idx) => (
                          <li key={idx} style={{ marginBottom: '0' }}>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
                      <button
                        onClick={() => setExpandedService(null)}
                        style={{
                          fontFamily: 'Source Sans Pro, sans-serif',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#ffffff',
                          background: 'linear-gradient(135deg, #1e3a5f, #2c5282)',
                          padding: '14px 32px',
                          borderRadius: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 12px rgba(30, 58, 95, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(30, 58, 95, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 95, 0.2)';
                        }}
                      >
                        Contact Us About This Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Premium Gold Separator Bar */}
      <div style={{
        height: '6px',
        background: 'linear-gradient(90deg, rgba(184,134,11,0) 0%, rgba(184,134,11,0.3) 15%, #b8860b 50%, rgba(184,134,11,0.3) 85%, rgba(184,134,11,0) 100%)',
        boxShadow: '0 2px 12px rgba(184,134,11,0.4), 0 -2px 12px rgba(184,134,11,0.4)',
        maxWidth: '100%',
        margin: '0'
      }}></div>

      {/* Why CSP Section - Navy Silk Gradient Background */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        {/* Corner Decorations */}
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

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p style={{
              fontFamily: 'Source Sans Pro, sans-serif',
              fontSize: '0.875rem',
              color: '#c9a227',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
              marginBottom: '0.75rem'
            }}>
              WHY CIVIC STRATEGY PARTNERS
            </p>
            <h2 className="text-[32px] md:text-[42px] font-bold text-white mb-4" style={{
              fontWeight: 700,
              textShadow: '0 2px 8px rgba(0,0,0,0.2)',
              lineHeight: '1.2'
            }}>
              Built Different. Proven Results.
            </h2>
            <p className="text-[16px] md:text-[18px] text-white/90 max-w-[800px] mx-auto" style={{ lineHeight: '1.6' }}>
              CSP brings credentials, methodology, and direct access that generic consultants can't match.
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card 1 - Former GSA Contract Specialist */}
            <div className="why-csp-card" style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              e.currentTarget.style.border = '1px solid rgba(201,162,39,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <h3 style={{
                fontFamily: 'Merriweather, serif',
                fontSize: '20px',
                fontWeight: 700,
                color: '#1e3a5f',
                marginBottom: '12px'
              }}>
                Former GSA Contract Specialist
              </h3>
              <p style={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: '1.6'
              }}>
                Kevin Martin worked inside GSA's MAS program—reviewing offers, auditing contracts, and understanding exactly how the system works from the inside.
              </p>
            </div>

            {/* Card 2 - Marine Corps Veteran */}
            <div className="why-csp-card" style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              e.currentTarget.style.border = '1px solid rgba(201,162,39,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <h3 style={{
                fontFamily: 'Merriweather, serif',
                fontSize: '20px',
                fontWeight: 700,
                color: '#1e3a5f',
                marginBottom: '12px'
              }}>
                Marine Corps Veteran
              </h3>
              <p style={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: '1.6'
              }}>
                CSP operates with Marine-grade discipline: structured methodology, direct communication, and mission-focused execution. No fluff, no excuses.
              </p>
            </div>

            {/* Card 3 - MAS Doctrine & Methodology */}
            <div className="why-csp-card" style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              e.currentTarget.style.border = '1px solid rgba(201,162,39,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <h3 style={{
                fontFamily: 'Merriweather, serif',
                fontSize: '20px',
                fontWeight: 700,
                color: '#1e3a5f',
                marginBottom: '12px'
              }}>
                MAS Doctrine & Methodology
              </h3>
              <p style={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: '1.6'
              }}>
                Our Civic Strategy Method and MAS Doctrine frameworks bring clarity to federal acquisition—not generic advice, but structured approaches that work.
              </p>
            </div>

            {/* Card 4 - Direct Principal Access */}
            <div className="why-csp-card" style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              e.currentTarget.style.border = '1px solid rgba(201,162,39,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <h3 style={{
                fontFamily: 'Merriweather, serif',
                fontSize: '20px',
                fontWeight: 700,
                color: '#1e3a5f',
                marginBottom: '12px'
              }}>
                Direct Principal Access
              </h3>
              <p style={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '15px',
                color: '#4B5563',
                lineHeight: '1.6'
              }}>
                You work directly with Kevin Martin—not junior staff, not account managers. Your strategy comes from the expert who built it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Gold Separator Bar */}
      <div style={{
        height: '6px',
        background: 'linear-gradient(90deg, rgba(184,134,11,0) 0%, rgba(184,134,11,0.3) 15%, #b8860b 50%, rgba(184,134,11,0.3) 85%, rgba(184,134,11,0) 100%)',
        boxShadow: '0 2px 12px rgba(184,134,11,0.4), 0 -2px 12px rgba(184,134,11,0.4)',
        maxWidth: '100%',
        margin: '0'
      }}></div>

      {/* Services Section - Compact Grid Layout */}
      <section className="services-section" style={{ background: '#f0f4f8', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Section Header */}
          <div className="services-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{
              fontFamily: 'Source Sans Pro, sans-serif',
              fontSize: '0.875rem',
              color: '#c9a227',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
              marginBottom: '0.5rem'
            }}>
              Results That Matter
            </p>
            <h2 className="services-title" style={{
              fontFamily: 'Merriweather, serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#1e3a5f',
              marginBottom: '1rem',
              textShadow: '0 2px 4px rgba(30, 58, 95, 0.1)'
            }}>
              The Services That Get You There
            </h2>
            <p className="services-subtitle" style={{
              fontFamily: 'Source Sans Pro, sans-serif',
              fontSize: '1rem',
              color: '#6B7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Each engagement is built around deliverables and measurable outcomes
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            maxWidth: '1400px'
          }}>
            {[
              {
                title: 'MAS Contract Diagnosis',
                description: 'Find out exactly why your contract isn\'t performing',
                whatYouReceive: [
                  'Comprehensive contract health audit',
                  'SIN alignment analysis',
                  'Pricing structure review',
                  'Documentation gap assessment'
                ],
                outcomeNumber: '30-Day',
                outcomeLabel: 'Actionable correction roadmap'
              },
              {
                title: 'Federal Readiness Roadmap',
                description: 'Navigate the federal marketplace with confidence',
                whatYouReceive: [
                  'Market fit assessment',
                  'NAICS/PSC alignment',
                  'SAM.gov profile optimization',
                  'Certification guidance'
                ],
                outcomeNumber: '90-Day',
                outcomeLabel: 'Clear path to federal revenue'
              },
              {
                title: 'MAS Advisory & Offer Support',
                description: 'Expert guidance through the MAS process',
                whatYouReceive: [
                  'Proposal structure guidance',
                  'Pricing strategy development',
                  'Documentation review',
                  'GSA submission package prep'
                ],
                outcomeNumber: '98%',
                outcomeLabel: 'Submission-ready package'
              },
              {
                title: 'Post-Award Compliance',
                description: 'Keep your contract healthy and audit-ready',
                whatYouReceive: [
                  'Quarterly compliance monitoring',
                  'IFF filing support',
                  'Price list maintenance',
                  'Annual reporting assistance'
                ],
                outcomeNumber: 'Zero',
                outcomeLabel: 'Compliance violations'
              },
              {
                title: 'Retainer-Based Support',
                description: 'Ongoing strategic partnership',
                whatYouReceive: [
                  'Direct principal access',
                  'Priority response times',
                  'Monthly strategy calls',
                  'Proactive contract monitoring'
                ],
                outcomeNumber: 'Direct Access',
                outcomeLabel: 'Continuous federal growth'
              },
              {
                title: 'À La Carte Mod Support',
                description: 'Targeted modifications when you need them',
                whatYouReceive: [
                  'SIN additions/deletions',
                  'Price adjustments (EPA)',
                  'Labor category updates',
                  'Mass mod compliance'
                ],
                outcomeNumber: '30-60 Day',
                outcomeLabel: 'Fast, compliant modifications'
              }
            ].map((service, index) => {
              const isOdd = index % 2 === 0; // 0,2,4 are odd cards (1st, 3rd, 5th)
              const accentColor = isOdd ? '#c9a227' : '#2c5282'; // gold or navy
              const accentRgba = isOdd ? 'rgba(201, 162, 39' : 'rgba(44, 82, 130';

              return (
              <div
                key={index}
                className="service-card"
                style={{
                  background: '#ffffff',
                  border: '2px solid rgba(30, 58, 95, 0.08)',
                  borderTop: `3px solid ${accentColor}`,
                  borderRadius: '20px',
                  padding: '27px 23px',
                  boxShadow: '0 4px 16px rgba(30, 58, 95, 0.08), 0 2px 8px rgba(30, 58, 95, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(30, 58, 95, 0.12), 0 4px 12px rgba(30, 58, 95, 0.06)';
                  e.currentTarget.style.borderColor = `${accentRgba}, 0.25)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(30, 58, 95, 0.08), 0 2px 8px rgba(30, 58, 95, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(30, 58, 95, 0.08)';
                }}
              >
                {/* Header Section - Title and Star on Same Line */}
                <div className="service-card-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  {/* Title */}
                  <h3 className="service-card-title" style={{
                    fontFamily: 'Merriweather, serif',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#1e3a5f',
                    lineHeight: 1.3,
                    margin: 0,
                    paddingRight: '12px',
                    flex: 1
                  }}>
                    {service.title}
                  </h3>

                  {/* Star Icon with Background Circle - Unified Gold */}
                  <div className="service-card-star" style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.12), rgba(201, 162, 39, 0.06))',
                    border: '1.5px solid rgba(201, 162, 39, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="#c9a227" style={{ filter: 'drop-shadow(0 2px 4px rgba(201, 162, 39, 0.3))' }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>

                {/* Description */}
                <p className="service-card-description" style={{
                  fontFamily: 'Source Sans Pro, sans-serif',
                  fontSize: '0.9rem',
                  color: '#6B7280',
                  lineHeight: 1.5,
                  marginBottom: '16px'
                }}>
                  {service.description}
                </p>

                {/* What You Receive */}
                <div className="service-card-receive" style={{
                  marginBottom: '16px',
                  background: `linear-gradient(135deg, ${accentRgba}, 0.03), ${accentRgba}, 0.015))`,
                  padding: '16px',
                  borderRadius: '8px',
                  borderLeft: `2px solid ${accentColor}`
                }}>
                  <p className="service-card-receive-label" style={{
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontSize: '0.75rem',
                    color: '#1e3a5f',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                    marginBottom: '12px'
                  }}>
                    What You Receive
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {service.whatYouReceive.map((item, idx) => (
                      <li key={idx} className="service-card-bullet" style={{
                        fontFamily: 'Source Sans Pro, sans-serif',
                        fontSize: '0.875rem',
                        color: '#4a5568',
                        marginBottom: '8px',
                        paddingLeft: '1.5rem',
                        position: 'relative',
                        lineHeight: 1.5
                      }}>
                        <Check style={{
                          position: 'absolute',
                          left: 0,
                          top: '2px',
                          width: '18px',
                          height: '18px',
                          color: '#c9a227'
                        }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome Metric - pushed to bottom */}
                <div className="service-card-outcome" style={{
                  marginTop: '18px',
                  padding: '20px',
                  background: `linear-gradient(135deg, ${accentRgba}, 0.04), ${accentRgba}, 0.02))`,
                  borderLeft: `3px solid ${accentColor}`,
                  borderRadius: '12px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}>
                  <p className="service-card-outcome-number" style={{
                    fontFamily: 'Merriweather, serif',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#1e3a5f',
                    marginBottom: '4px',
                    letterSpacing: '-0.02em'
                  }}>
                    {service.outcomeNumber}
                  </p>
                  <p className="service-card-outcome-label" style={{
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontSize: '0.8rem',
                    color: '#6B7280',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {service.outcomeLabel}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes logo-breathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.7;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Results Section - Blue Silk Gradient Background */}
      <section id="results" className="py-16 md:py-20 lg:py-24 px-6 relative overflow-hidden fade-in-section">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        {/* Corner Decorations */}
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

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-bold text-white mb-4" style={{ fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              Representative Outcomes & Typical Engagement Results
            </h2>
            <p className="text-[18px] text-white/90 max-w-[800px] mx-auto" style={{ lineHeight: '1.6' }}>
              CSP engagements are confidential, and many clients come to us early in their federal journey. Instead of publishing sensitive details, we highlight representative scenarios that reflect the types of challenges we solve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div className="glass-card p-8" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <h3 className="text-[20px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                MAS Structure Correction & Performance Alignment
              </h3>
              <p className="text-[#4B5563] text-[16px]" style={{ lineHeight: '1.6' }}>
                A services contractor with minimal MAS sales sought clarity on why their schedule wasn't gaining traction. Analysis revealed misaligned SINs, outdated labor categories, and pricing inconsistencies tied to older solicitation refreshes. CSP provided a corrective action roadmap to rebuild the contract's structure, restore compliance, and position the company for visibility with agency buyers.
              </p>
            </div>

            <div className="glass-card p-8" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <h3 className="text-[20px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Federal Readiness Roadmap for a Growing Technology Firm
              </h3>
              <p className="text-[#4B5563] text-[16px]" style={{ lineHeight: '1.6' }}>
                A tech company exploring federal sales needed to understand market fit, competitive posture, and whether MAS should be part of their strategy. CSP built a Federal Readiness Roadmap assessing capabilities, NAICS alignment, SAM/DSBS posture, agency targets, and contract vehicle pathways. Leadership gained clarity on their federal entry points and a structured path toward future MAS alignment.
              </p>
            </div>

            <div className="glass-card p-8" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
              <h3 className="text-[20px] font-bold text-[#1e3a5f] mb-4" style={{ fontWeight: 700 }}>
                Compliance Intervention for a Low-Activity MAS Holder
              </h3>
              <p className="text-[#4B5563] text-[16px]" style={{ lineHeight: '1.6' }}>
                A small business with a quiet MAS contract faced the risk of falling below minimum sales thresholds. CSP conducted a comprehensive compliance and lifecycle review, identifying missing mods, outdated pricing files, and structural issues impacting visibility. Recommendations allowed the company to reestablish compliance, protect their contract, and begin rebuilding a real revenue pathway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insights & Expertise Section - White Background */}
      <section id="insights" className="insights-section fade-in-section">
        <div>
          <h2>Civic Strategy Briefing</h2>
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
      {/* HIDDEN - Can be restored later if needed */}
      {false && (
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
      )}

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
          </div>
        </div>
      </section>

      {/* About the Founder Section - White Background */}
      <section className="py-24 md:py-32 lg:py-[120px] px-6 bg-white fade-in-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Portrait Image */}
            <div className="order-2 md:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/1743701547902.jpeg"
                  alt="Kevin Martin - Founder of Civic Strategy Partners"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '600px', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Right: Biography */}
            <div className="order-1 md:order-2">
              <h2 className="text-[42px] font-bold text-[#1e3a5f] mb-6" style={{ fontWeight: 700, lineHeight: '1.2' }}>
                About the Founder
              </h2>
              <div className="text-[16px] text-[#374151] space-y-4" style={{ lineHeight: '1.7' }}>
                <p>
                  Kevin Martin is a Marine Corps veteran, former GSA Contract Specialist, and federal acquisition strategist. After serving in Iraq and transitioning into federal contracting, he worked inside GSA's Multiple Award Schedule (MAS) program, where he reviewed proposals, audited contract files, and saw firsthand how companies succeeded or failed in the federal space.
                </p>
                <p>
                  That experience shaped his approach: federal contracting is not about cutting corners or gaming the system. It's about building capability, maintaining compliance, and operating with discipline. Too many companies treat GSA MAS as a checkbox or a badge—then wonder why they don't win work. Kevin founded Civic Strategy Partners to help businesses approach federal contracting the right way: with structure, readiness, and a commitment to long-term performance.
                </p>
                <p>
                  CSP's methodology is grounded in the Civic Strategy Method and MAS Doctrine—frameworks designed to bring clarity to federal acquisition and help contractors build sustainable federal practices. Whether diagnosing a failing MAS contract, guiding a company toward federal readiness, or providing strategic advisory support, Kevin's work is direct, structured, and focused on results.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/in/kevinmartinmba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0a66c2] hover:text-[#004182] transition-colors text-[15px] font-medium"
                  style={{ textDecoration: 'none' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect with Kevin on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section - Navy Background */}
      <section id="contact" className="py-24 md:py-32 lg:py-[120px] px-6 relative overflow-hidden fade-in-section">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        {/* Corner Decorations */}
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

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[42px] font-bold text-white mb-4" style={{
              fontWeight: 700,
              lineHeight: '1.2',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              Get in Touch with Civic Strategy Partners
            </h2>
            <div className="max-w-[750px] mx-auto">
              {/* PART 1 - Supporting Text */}
              <p className="contact-supporting-text" style={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '18px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.6',
                display: 'block',
                textAlign: 'center',
                marginBottom: '16px',
                hyphens: 'none',
                wordBreak: 'normal'
              }}>
                Whether you need MAS diagnosis, federal readiness guidance, or strategic advisory support...
              </p>
              {/* PART 2 - Promise Line */}
              <p className="contact-promise-line" style={{
                fontFamily: 'Merriweather, serif',
                fontSize: '24px',
                color: '#c9a227',
                fontStyle: 'italic',
                fontWeight: 500,
                display: 'block',
                textAlign: 'center',
                marginTop: '12px',
                whiteSpace: 'nowrap',
                textShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}>
                We're here to help you move with clarity and purpose.
              </p>
            </div>
          </div>

          {/* Dual CTA Cards */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-[900px] mx-auto">
            {/* LEFT CARD - Send Us a Message */}
            <div
              className="contact-card flex-1"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                padding: '40px',
                maxWidth: '400px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.border = '1px solid rgba(201,162,39,0.4)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a227"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: '24px' }}
                className="contact-icon"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <h3 style={{
                fontFamily: 'Merriweather, serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
                lineHeight: '1.3'
              }}
              className="contact-card-title">
                Send Us a Message
              </h3>
              <p style={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '16px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.6',
                marginBottom: '28px',
                flexGrow: 1
              }}>
                Not sure where to start? Tell us about your situation and we'll respond within 24 hours.
              </p>
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="premium-cta"
                style={{
                  width: '100%',
                  fontFamily: 'Inter, sans-serif'
                }}
                aria-label="Open inquiry form"
              >
                Start a Conversation
              </button>
            </div>

            {/* RIGHT CARD - Schedule Consultation */}
            <div
              className="contact-card flex-1"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                padding: '40px',
                maxWidth: '400px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.border = '1px solid rgba(201,162,39,0.4)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a227"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: '24px' }}
                className="contact-icon"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <h3 style={{
                fontFamily: 'Merriweather, serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
                lineHeight: '1.3'
              }}
              className="contact-card-title">
                Schedule Consultation
              </h3>
              <p style={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontSize: '16px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.6',
                marginBottom: '28px',
                flexGrow: 1
              }}>
                Ready to discuss your federal strategy? Book time directly with our team.
              </p>
              <button
                onClick={() => setSchedulingModalOpen(true)}
                className="premium-cta"
                style={{
                  width: '100%',
                  fontFamily: 'Inter, sans-serif'
                }}
                aria-label="Open scheduling tool"
              >
                Book a Time
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Gold Separator Bar */}
      <div style={{
        height: '6px',
        background: 'linear-gradient(90deg, rgba(184,134,11,0) 0%, rgba(184,134,11,0.3) 15%, #b8860b 50%, rgba(184,134,11,0.3) 85%, rgba(184,134,11,0) 100%)',
        boxShadow: '0 2px 12px rgba(184,134,11,0.4), 0 -2px 12px rgba(184,134,11,0.4)',
        maxWidth: '100%',
        margin: '0'
      }}></div>

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
            className="bg-white rounded-xl article-modal-container max-h-[85vh] overflow-y-auto relative shadow-2xl"
            style={{
              background: 'white',
              maxWidth: '850px',
              maxHeight: '85vh',
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
                height: '200px',
                objectFit: 'cover',
                borderRadius: '12px 12px 0 0'
              }}
            />

            <h1
              className="article-modal-title text-[28px] font-semibold text-[#0F2847] mx-10 mt-8 mb-3"
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '28px',
                color: '#0F2847',
                lineHeight: '1.2',
                margin: '32px 32px 12px'
              }}
            >
              {currentArticle.title}
            </h1>

            <p
              className="text-[14px] text-[#6B7280] mx-10 mb-6"
              style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                color: '#6B7280',
                margin: '0 32px 24px'
              }}
            >
              {formatDate(currentArticle.date)} | {calculateReadTime(currentArticle.content)}
            </p>

            <div
              className="article-modal-content text-[16px] text-[#374151] mx-10 pb-6"
              style={{
                fontFamily: 'Inter',
                fontSize: '16px',
                color: '#374151',
                lineHeight: '1.7',
                margin: '0 32px',
                paddingBottom: '24px'
              }}
            >
              {currentArticle.content.split('\n\n').map((paragraph, i) => (
                <p key={i} style={{ marginBottom: '20px' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              style={{
                textAlign: 'center',
                marginTop: '24px',
                paddingBottom: '32px'
              }}
            >
              <a
                href="https://www.linkedin.com/company/civic-strategy-partners-llc/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  color: '#1e3a5f',
                  textDecoration: 'none',
                  transition: 'text-decoration 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Read more on LinkedIn →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Legal Modal Popup */}
      {legalModalOpen && legalModalContent && (
        <div
          onClick={closeLegalModal}
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
              onClick={closeLegalModal}
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

            <div className="p-10">
              <h1
                className="text-[32px] font-semibold text-[#0F2847] mb-8"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '32px',
                  color: '#0F2847',
                  lineHeight: '1.2',
                  marginBottom: '32px'
                }}
              >
                {legalModalContent.title}
              </h1>

              <div
                className="text-[16px] text-[#374151]"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  color: '#374151',
                  lineHeight: '1.8'
                }}
              >
                {legalModalContent.content.split('\n\n').map((section, i) => (
                  <p key={i} style={{ marginBottom: '24px', whiteSpace: 'pre-line' }}>
                    {section}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {inquiryModalOpen && (
        <div
          onClick={() => setInquiryModalOpen(false)}
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-[1000] p-6"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-[600px] w-full relative shadow-2xl"
            style={{
              background: 'white',
              maxWidth: '600px',
              width: '100%',
              borderRadius: '16px',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
            }}
          >
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 bg-white border-2 border-gray-200 rounded-full w-10 h-10 text-2xl text-gray-600 cursor-pointer z-10 hover:bg-gray-50 transition-colors"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'white',
                border: '2px solid #E5E7EB',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                color: '#6B7280',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1'
              }}
              aria-label="Close inquiry modal"
            >
              ×
            </button>

            <div className="p-8">
              <h2
                className="text-[28px] font-bold text-[#1e3a5f] mb-4"
                style={{
                  fontFamily: 'Merriweather, serif',
                  fontWeight: 700,
                  fontSize: '28px',
                  color: '#1e3a5f',
                  lineHeight: '1.2',
                  marginBottom: '16px'
                }}
              >
                Send Us a Message
              </h2>
              <p
                className="text-[16px] text-gray-600 mb-8"
                style={{
                  fontFamily: 'Source Sans Pro, sans-serif',
                  fontSize: '16px',
                  color: '#6B7280',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}
              >
                Tell us about your situation and we'll respond within 24 hours.
              </p>

              <div
                className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
                style={{
                  background: '#F9FAFB',
                  border: '2px dashed #D1D5DB',
                  borderRadius: '12px',
                  padding: '48px',
                  textAlign: 'center'
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    margin: '0 auto 24px',
                    opacity: 0.6
                  }}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <p
                  style={{
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontSize: '18px',
                    color: '#6B7280',
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}
                >
                  HubSpot Form Integration
                </p>
                <p
                  style={{
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontSize: '14px',
                    color: '#9CA3AF',
                    lineHeight: '1.5'
                  }}
                >
                  HubSpot form will be embedded here
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scheduling Modal */}
      {schedulingModalOpen && (
        <div
          onClick={() => setSchedulingModalOpen(false)}
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-[1000] p-6"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-[600px] w-full relative shadow-2xl"
            style={{
              background: 'white',
              maxWidth: '600px',
              width: '100%',
              borderRadius: '16px',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
            }}
          >
            <button
              onClick={() => setSchedulingModalOpen(false)}
              className="absolute top-4 right-4 bg-white border-2 border-gray-200 rounded-full w-10 h-10 text-2xl text-gray-600 cursor-pointer z-10 hover:bg-gray-50 transition-colors"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'white',
                border: '2px solid #E5E7EB',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                color: '#6B7280',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1'
              }}
              aria-label="Close scheduling modal"
            >
              ×
            </button>

            <div className="p-8">
              <h2
                className="text-[28px] font-bold text-[#1e3a5f] mb-4"
                style={{
                  fontFamily: 'Merriweather, serif',
                  fontWeight: 700,
                  fontSize: '28px',
                  color: '#1e3a5f',
                  lineHeight: '1.2',
                  marginBottom: '16px'
                }}
              >
                Schedule Consultation
              </h2>
              <p
                className="text-[16px] text-gray-600 mb-8"
                style={{
                  fontFamily: 'Source Sans Pro, sans-serif',
                  fontSize: '16px',
                  color: '#6B7280',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}
              >
                Book time directly with our team to discuss your federal strategy.
              </p>

              <div
                className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
                style={{
                  background: '#F9FAFB',
                  border: '2px dashed #D1D5DB',
                  borderRadius: '12px',
                  padding: '48px',
                  textAlign: 'center'
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    margin: '0 auto 24px',
                    opacity: 0.6
                  }}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <p
                  style={{
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontSize: '18px',
                    color: '#6B7280',
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}
                >
                  HubSpot Scheduling Integration
                </p>
                <p
                  style={{
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontSize: '14px',
                    color: '#9CA3AF',
                    lineHeight: '1.5'
                  }}
                >
                  HubSpot scheduling tool will be embedded here
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Silk Flag Gradient */}
      <footer className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 silk-gradient"></div>
        <div className="absolute inset-0 silk-overlay"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center md:justify-center gap-12 md:gap-[120px] mb-12 text-center md:text-left">
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
                (202) 796-7987
              </p>
              <p className="text-[14px] mt-4" style={{ fontFamily: 'Inter' }}>
                <a href="https://www.linkedin.com/company/civic-strategy-partners-llc/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                  LinkedIn →
                </a>
              </p>
            </div>
          </div>

          {/* Legal Links Section */}
          <div className="border-t border-white/20 pt-8 pb-6 text-center">
            <div className="legal-links-container mb-6 text-[14px]">
              <button
                onClick={() => openLegalModal('privacy')}
                className="legal-link text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                style={{ fontFamily: 'Inter', textDecoration: 'none' }}
              >
                Privacy Policy
              </button>
              <span className="legal-separator text-white/40">|</span>
              <button
                onClick={() => openLegalModal('terms')}
                className="legal-link text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                style={{ fontFamily: 'Inter', textDecoration: 'none' }}
              >
                Terms of Service
              </button>
              <span className="legal-separator text-white/40">|</span>
              <button
                onClick={() => openLegalModal('disclaimer')}
                className="legal-link text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                style={{ fontFamily: 'Inter', textDecoration: 'none' }}
              >
                Disclaimer
              </button>
              <span className="legal-separator text-white/40">|</span>
              <button
                onClick={() => openLegalModal('cookies')}
                className="legal-link text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                style={{ fontFamily: 'Inter', textDecoration: 'none' }}
              >
                Cookie Policy
              </button>
              <span className="legal-separator text-white/40">|</span>
              <button
                onClick={() => openLegalModal('accessibility')}
                className="legal-link text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                style={{ fontFamily: 'Inter', textDecoration: 'none' }}
              >
                Accessibility Statement
              </button>
            </div>
            <p className="text-[14px] text-white/60" style={{ fontFamily: 'Inter' }} suppressHydrationWarning>
              © {new Date().getFullYear()} Civic Strategy Partners, LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Return to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#1e3a5f] text-white border-none rounded-full w-14 h-14 text-2xl cursor-pointer hover:scale-110 transition-transform z-50 flex items-center justify-center"
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
