'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  detectConnectionQuality,
  detectDeviceCapability,
  determineVideoQuality,
  type VideoQuality
} from '@/lib/connection-detector';
import { videoPerformanceMonitor } from '@/lib/video-performance-monitor';

interface VideoHeroPreloadProps {
  videoSrc: string;
  videoSrcMobileLow?: string;
  videoSrcMobileHigh?: string;
  mobileFallbackSrc: string;
  mobileFallbackWidth: number;
  mobileFallbackHeight: number;
  children: React.ReactNode;
}

/**
 * VideoHeroPreload Component - Adaptive Loading Edition
 *
 * Professional video background with intelligent quality selection.
 * Adapts to network conditions and device capabilities.
 *
 * Features:
 * - Connection quality detection (3G/4G/5G/WiFi)
 * - Device capability assessment
 * - Adaptive video quality selection
 * - Smooth fade-in transitions
 * - Comprehensive fallback system
 * - Performance monitoring
 */
export default function VideoHeroPreload({
  videoSrc,
  videoSrcMobileLow,
  videoSrcMobileHigh,
  mobileFallbackSrc,
  mobileFallbackWidth,
  mobileFallbackHeight,
  children
}: VideoHeroPreloadProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>('none');
  const [loadStartTime, setLoadStartTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const connectionInfo = detectConnectionQuality();
    const deviceInfo = detectDeviceCapability();
    const quality = determineVideoQuality(connectionInfo, deviceInfo);

    console.log('Video Performance:', {
      quality,
      connection: connectionInfo,
      device: deviceInfo
    });

    setSelectedQuality(quality);

    if (quality === 'none') {
      setIsReady(true);
      return;
    }

    const video = videoRef.current;
    if (!video) {
      setIsReady(true);
      return;
    }

    const startTime = Date.now();
    setLoadStartTime(startTime);

    const handleLoadedMetadata = () => {
      video.playbackRate = 0.5;
    };

    const handleCanPlay = () => {
      const loadTime = Date.now() - startTime;

      console.log('Video loaded successfully:', { quality, loadTime });

      videoPerformanceMonitor.logMetric({
        quality,
        loadTime,
        connectionType: connectionInfo.effectiveType,
        deviceMemory: deviceInfo.memory,
        success: true,
        timestamp: Date.now()
      });

      setVideoLoaded(true);
      setTimeout(() => setIsReady(true), 100);
    };

    const handleError = (e: Event) => {
      const loadTime = Date.now() - startTime;

      console.error('Video failed to load:', {
        quality,
        videoSrc,
        videoSrcMobileHigh,
        videoSrcMobileLow,
        error: e
      });

      videoPerformanceMonitor.logMetric({
        quality,
        loadTime,
        connectionType: connectionInfo.effectiveType,
        deviceMemory: deviceInfo.memory,
        success: false,
        error: 'Video load failed',
        timestamp: Date.now()
      });

      console.warn('Video failed to load, using fallback');
      setVideoError(true);
      setIsReady(true);
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [loadStartTime]);

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

      {/* Video Background - Adaptive Quality */}
      {selectedQuality !== 'none' && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`hero-video-bg ${videoLoaded ? 'loaded' : ''} ${
            selectedQuality === 'desktop' ? 'hidden md:block' : ''
          }`}
          style={{
            opacity: videoLoaded && isReady ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out'
          }}
        >
          {selectedQuality === 'desktop' && (
            <source src={videoSrc} type="video/mp4" />
          )}
          {selectedQuality === 'high' && (
            <source src={videoSrcMobileHigh || videoSrc} type="video/mp4" />
          )}
          {selectedQuality === 'low' && (
            <source src={videoSrcMobileLow || videoSrcMobileHigh || videoSrc} type="video/mp4" />
          )}
        </video>
      )}

      {/* Static Background - Fallback for no video or mobile */}
      {(selectedQuality === 'none' || selectedQuality === 'desktop') && (
        <div className={selectedQuality === 'desktop' ? 'block md:hidden absolute inset-0 w-full h-full' : 'absolute inset-0 w-full h-full'}>
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
      )}

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
