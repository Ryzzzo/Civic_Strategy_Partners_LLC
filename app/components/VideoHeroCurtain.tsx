'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface VideoHeroCurtainProps {
  videoSrc: string;
  mobileFallbackSrc: string;
  mobileFallbackWidth: number;
  mobileFallbackHeight: number;
  logoSrc?: string; // Optional logo to show during loading
  children: React.ReactNode;
}

/**
 * VideoHeroCurtain Component
 *
 * Professional theater curtain reveal effect that completely masks video loading.
 * Creates a cinematic entrance that turns loading time into a feature, not a bug.
 *
 * Features:
 * - Elegant curtain opening animation
 * - Smooth parallax reveal effect
 * - Brand logo display during load (optional)
 * - Automatic timing coordination
 * - Fallback for failed loads
 * - Mobile-optimized
 */
export default function VideoHeroCurtain({
  videoSrc,
  mobileFallbackSrc,
  mobileFallbackWidth,
  mobileFallbackHeight,
  logoSrc,
  children
}: VideoHeroCurtainProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const minLoadTimeRef = useRef<boolean>(false);

  useEffect(() => {
    // Ensure curtain stays closed for minimum aesthetic duration (1.5s)
    const minTimer = setTimeout(() => {
      minLoadTimeRef.current = true;
      checkReadyToOpen();
    }, 1500);

    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoReady(true);
      checkReadyToOpen();
    };

    const handleError = () => {
      console.warn('Video failed to load, proceeding with fallback');
      setVideoReady(true);
      checkReadyToOpen();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.load();

    return () => {
      clearTimeout(minTimer);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Only open curtain when both video is ready AND minimum time has elapsed
  const checkReadyToOpen = () => {
    if (videoReady && minLoadTimeRef.current) {
      // Start curtain animation
      setCurtainOpen(true);

      // Show content after curtain starts opening
      setTimeout(() => {
        setShowContent(true);
      }, 400);
    }
  };

  // Re-check whenever dependencies update
  useEffect(() => {
    if (videoReady && minLoadTimeRef.current && !curtainOpen) {
      checkReadyToOpen();
    }
  }, [videoReady]);

  return (
    <section className="hero-video-curtain">
      {/* Video Background - Desktop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hero-video-bg hidden md:block"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Static Background - Mobile */}
      <div className="block md:hidden absolute inset-0 w-full h-full">
        <Image
          src={mobileFallbackSrc}
          alt="Hero Background"
          width={mobileFallbackWidth}
          height={mobileFallbackHeight}
          priority
          quality={90}
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(8px) brightness(0.4)',
            opacity: 0.3
          }}
        />
      </div>

      {/* Overlay */}
      <div
        className="video-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1
        }}
      />

      {/* Theater Curtain Left Panel */}
      <div
        className={`curtain-panel curtain-left ${curtainOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50%',
          height: '100vh',
          background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
          zIndex: 100,
          transform: curtainOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 1.2s cubic-bezier(0.83, 0, 0.17, 1)',
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.5)',
          borderRight: '2px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Decorative curtain texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.03) 10px,
            rgba(255, 255, 255, 0.03) 20px
          )`,
          opacity: 0.5
        }} />
      </div>

      {/* Theater Curtain Right Panel */}
      <div
        className={`curtain-panel curtain-right ${curtainOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '50%',
          height: '100vh',
          background: 'linear-gradient(270deg, #0f172a 0%, #1e293b 100%)',
          zIndex: 100,
          transform: curtainOpen ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 1.2s cubic-bezier(0.83, 0, 0.17, 1)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Decorative curtain texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.03) 10px,
            rgba(255, 255, 255, 0.03) 20px
          )`,
          opacity: 0.5
        }} />
      </div>

      {/* Center Content During Load */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 101,
          textAlign: 'center',
          opacity: curtainOpen ? 0 : 1,
          transition: 'opacity 0.5s ease-out',
          pointerEvents: curtainOpen ? 'none' : 'auto'
        }}
      >
        {/* Optional Logo Display */}
        {logoSrc && (
          <div style={{
            marginBottom: '40px',
            animation: 'fadeInScale 0.8s ease-out'
          }}>
            <Image
              src={logoSrc}
              alt="Logo"
              width={300}
              height={150}
              priority
              style={{
                maxWidth: '280px',
                height: 'auto',
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>
        )}

        {/* Elegant Loading Animation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          marginTop: '20px'
        }}>
          <div className="dot-pulse" style={{ animationDelay: '0s' }} />
          <div className="dot-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="dot-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '13px',
          fontWeight: '300',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '30px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          Preparing Experience
        </p>
      </div>

      {/* Hero Content - Reveals after curtain opens */}
      <div
        className="hero-content"
        style={{
          position: 'relative',
          zIndex: 10,
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}
      >
        {children}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .dot-pulse {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .hero-video-curtain {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #0f172a;
        }
      `}</style>
    </section>
  );
}
