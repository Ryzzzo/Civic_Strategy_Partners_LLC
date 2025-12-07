/**
 * Video Performance Monitoring Utility
 * Tracks and logs video loading performance metrics
 */

export interface VideoPerformanceMetrics {
  quality: string;
  loadTime: number;
  fileSize?: number;
  connectionType?: string;
  deviceMemory?: number;
  success: boolean;
  error?: string;
  timestamp: number;
}

class VideoPerformanceMonitor {
  private metrics: VideoPerformanceMetrics[] = [];
  private maxStoredMetrics = 50;

  logMetric(metric: VideoPerformanceMetrics) {
    this.metrics.push(metric);

    if (this.metrics.length > this.maxStoredMetrics) {
      this.metrics.shift();
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('video_performance_metrics', JSON.stringify(this.metrics));
      } catch (e) {
        console.warn('Failed to store performance metrics', e);
      }
    }

    console.log('Video Performance:', {
      quality: metric.quality,
      loadTime: `${metric.loadTime}ms`,
      success: metric.success,
      connectionType: metric.connectionType
    });
  }

  getMetrics(): VideoPerformanceMetrics[] {
    return [...this.metrics];
  }

  getAverageLoadTime(quality?: string): number {
    const filtered = quality
      ? this.metrics.filter(m => m.quality === quality && m.success)
      : this.metrics.filter(m => m.success);

    if (filtered.length === 0) return 0;

    const total = filtered.reduce((sum, m) => sum + m.loadTime, 0);
    return Math.round(total / filtered.length);
  }

  getSuccessRate(quality?: string): number {
    const filtered = quality
      ? this.metrics.filter(m => m.quality === quality)
      : this.metrics;

    if (filtered.length === 0) return 0;

    const successful = filtered.filter(m => m.success).length;
    return Math.round((successful / filtered.length) * 100);
  }

  generateReport(): string {
    const report = {
      totalAttempts: this.metrics.length,
      successRate: `${this.getSuccessRate()}%`,
      averageLoadTime: `${this.getAverageLoadTime()}ms`,
      byQuality: {
        desktop: {
          attempts: this.metrics.filter(m => m.quality === 'desktop').length,
          successRate: `${this.getSuccessRate('desktop')}%`,
          avgLoadTime: `${this.getAverageLoadTime('desktop')}ms`
        },
        high: {
          attempts: this.metrics.filter(m => m.quality === 'high').length,
          successRate: `${this.getSuccessRate('high')}%`,
          avgLoadTime: `${this.getAverageLoadTime('high')}ms`
        },
        low: {
          attempts: this.metrics.filter(m => m.quality === 'low').length,
          successRate: `${this.getSuccessRate('low')}%`,
          avgLoadTime: `${this.getAverageLoadTime('low')}ms`
        }
      }
    };

    return JSON.stringify(report, null, 2);
  }

  clearMetrics() {
    this.metrics = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('video_performance_metrics');
    }
  }

  loadStoredMetrics() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem('video_performance_metrics');
        if (stored) {
          this.metrics = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Failed to load stored performance metrics', e);
      }
    }
  }
}

export const videoPerformanceMonitor = new VideoPerformanceMonitor();

if (typeof window !== 'undefined') {
  videoPerformanceMonitor.loadStoredMetrics();

  (window as any).getVideoPerformanceReport = () => {
    console.log(videoPerformanceMonitor.generateReport());
  };
}
