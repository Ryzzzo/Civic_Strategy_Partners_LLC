/**
 * Connection Quality Detection Utility
 * Determines optimal video quality based on network and device capabilities
 */

export type ConnectionQuality = 'high' | 'medium' | 'low' | 'offline';
export type VideoQuality = 'none' | 'low' | 'high' | 'desktop';

interface ConnectionInfo {
  quality: ConnectionQuality;
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
}

interface DeviceCapability {
  memory?: number;
  cores?: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function detectConnectionQuality(): ConnectionInfo {
  if (typeof window === 'undefined') {
    return { quality: 'medium' };
  }

  const nav = navigator as any;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

  if (!connection) {
    return { quality: 'medium' };
  }

  const effectiveType = connection.effectiveType;
  const downlink = connection.downlink;
  const saveData = connection.saveData;

  if (saveData) {
    return { quality: 'low', effectiveType, downlink, saveData };
  }

  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return { quality: 'offline', effectiveType, downlink, saveData };
  }

  if (effectiveType === '3g' || (downlink && downlink < 1.5)) {
    return { quality: 'low', effectiveType, downlink, saveData };
  }

  if (effectiveType === '4g' && downlink && downlink >= 5) {
    return { quality: 'high', effectiveType, downlink, saveData };
  }

  if (effectiveType === '4g') {
    return { quality: 'medium', effectiveType, downlink, saveData };
  }

  return { quality: 'medium', effectiveType, downlink, saveData };
}

export function detectDeviceCapability(): DeviceCapability {
  if (typeof window === 'undefined') {
    return { isMobile: false, prefersReducedMotion: false };
  }

  const nav = navigator as any;
  const memory = nav.deviceMemory;
  const cores = nav.hardwareConcurrency;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  return { memory, cores, isMobile, prefersReducedMotion };
}

export function determineVideoQuality(
  connectionInfo: ConnectionInfo,
  deviceInfo: DeviceCapability
): VideoQuality {
  if (deviceInfo.prefersReducedMotion) {
    return 'none';
  }

  if (!deviceInfo.isMobile) {
    return 'desktop';
  }

  if (connectionInfo.quality === 'offline' || connectionInfo.saveData) {
    return 'none';
  }

  if (connectionInfo.quality === 'low') {
    return 'none';
  }

  if (connectionInfo.quality === 'high') {
    if (deviceInfo.memory && deviceInfo.memory >= 4) {
      return 'high';
    }
    return 'low';
  }

  if (connectionInfo.quality === 'medium') {
    return 'low';
  }

  return 'none';
}

export function shouldLoadVideo(): boolean {
  const connection = detectConnectionQuality();
  const device = detectDeviceCapability();
  const quality = determineVideoQuality(connection, device);

  return quality !== 'none';
}
