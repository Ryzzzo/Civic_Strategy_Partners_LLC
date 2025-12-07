'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface VideoHeroPreloadProps {
  videoSrc: string;
  mobileFallbackSrc: string;
  mobileFallbackWidth: number;
  mobileFallbackHeight: number;
  children: React.ReactNode;
}

/**
 * VideoHeroPreload Component
 *
 * Professional video background with aggressive preloading and smooth loading states.
 * Eliminates FOUC by ensuring video is ready before revealing content.
 *
 * Features:
 * - Preloads video metadata before rendering
 * - Smooth fade-in transitions
 * - Error handling with fallback
 * - Mobile-optimized with static image
 * - Loading state management
 */
export default function VideoHeroPreload({
  videoSrc,
  mobileFallbackSrc,
  mobileFallbackWidth,
  mobileFallbackHeight,
  children
}: VideoHeroPreloadProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Preload video immediately on mount
    const video = videoRef.current;
    if (!video) return;

    // Set up event listeners before loading
    const handleLoadedMetadata = () => {
      // Set slow motion playback like original
      video.playbackRate = 0.5;
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
      // Small delay to ensure smooth transition
      setTimeout(() => setIsReady(true), 100);
    };

    const handleError = () => {
      console.warn('Video failed to load, using fallback');
      setVideoError(true);
      setIsReady(true); // Show content anyway
    };

    const handleLoadedData = () => {
      // Video has loaded enough data to play
      setVideoLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Trigger load
    video.load();

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section className="hero-video">
      {/* Loading State - Shows while video loads */}
      <div
        className={`loading-state ${isReady ? 'fade-out' : ''}`}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          zIndex: 50,
          transition: 'opacity 0.6s ease-out',
          opacity: isReady ? 0 : 1,
          pointerEvents: isReady ? 'none' : 'auto'
        }}
      >
        {/* Subtle loading indicator */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div className="loading-spinner" />
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            fontWeight: '300',
            letterSpacing: '0.05em'
          }}>
            Loading Experience...
          </p>
        </div>
      </div>

      {/* Background - Slate for instant render */}
      <div className="absolute inset-0 bg-slate-900 z-0"></div>

      {/* Video Background - Desktop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`hero-video-bg ${videoLoaded ? 'loaded' : ''} hidden md:block`}
        style={{
          opacity: videoLoaded && isReady ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out'
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
          className="w-full h-full object-cover opacity-30"
          style={{ filter: 'blur(8px) brightness(0.4)' }}
        />
      </div>

      {/* Overlay - Blue theme matching original */}
      <div className="video-overlay"></div>

      {/* Content - Fades in with video */}
      <div
        className="hero-content"
        style={{
          opacity: isReady ? 1 : 0,
          transform: isReady ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s'
        }}
      >
        {children}
      </div>

      {/* Loading Spinner Styles */}
      <style jsx>{`
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
