# Mobile Video Optimization Guide

## Overview

This guide provides instructions for creating mobile-optimized video variants of `dc_at_dusk.mp4` for adaptive loading on the Civic Strategy Partners website.

## Current Implementation Status

### Phase 1: Smart Loading System ✅
- Connection quality detection implemented
- Device capability assessment added
- Adaptive video selection logic created
- Performance monitoring hooks integrated

### Phase 2: Video Asset Creation 🔄
The adaptive loading system is ready. Mobile-optimized video files need to be created and added to the `/public` folder.

## Required Video Files

### Desktop (Existing)
- **File**: `dc_at_dusk.mp4`
- **Location**: `/public/dc_at_dusk.mp4`
- **Status**: Already exists

### Mobile Low Quality (To Create)
- **Filename**: `dc_at_dusk_mobile_low.mp4`
- **Target Resolution**: 854x480 (480p)
- **Target Bitrate**: 800-1000 Kbps
- **Target File Size**: ~2-3MB
- **Use Case**: 4G connections, devices with <4GB RAM

### Mobile High Quality (To Create)
- **Filename**: `dc_at_dusk_mobile_high.mp4`
- **Target Resolution**: 1280x720 (720p)
- **Target Bitrate**: 2000-2500 Kbps
- **Target File Size**: ~5-7MB
- **Use Case**: WiFi/5G connections, devices with ≥4GB RAM

## FFmpeg Commands

### Prerequisites
```bash
# Install FFmpeg if not already installed
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg
# Windows: Download from ffmpeg.org
```

### Step 1: Check Source Video Details
```bash
ffmpeg -i public/dc_at_dusk.mp4
```

### Step 2: Create Mobile Low Quality (480p)
```bash
ffmpeg -i public/dc_at_dusk.mp4 \
  -vf "scale=854:480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -maxrate 1000k \
  -bufsize 2000k \
  -r 24 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  public/dc_at_dusk_mobile_low.mp4
```

**Parameters Explained:**
- `scale=854:480` - Resize to 480p
- `-preset slow` - Better compression (takes longer)
- `-crf 28` - Quality level (higher = smaller file)
- `-maxrate 1000k` - Cap bitrate at 1Mbps
- `-r 24` - 24fps for smooth playback
- `-movflags +faststart` - Enable progressive download
- `-an` - Remove audio (not needed for background video)

### Step 3: Create Mobile High Quality (720p)
```bash
ffmpeg -i public/dc_at_dusk.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 \
  -preset slow \
  -crf 25 \
  -maxrate 2500k \
  -bufsize 5000k \
  -r 30 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  public/dc_at_dusk_mobile_high.mp4
```

**Parameters Explained:**
- `scale=1280:720` - Resize to 720p
- `-crf 25` - Higher quality than low variant
- `-maxrate 2500k` - Cap bitrate at 2.5Mbps
- `-r 30` - 30fps for smoother playback

### Step 4: Verify Output Files
```bash
# Check file sizes
ls -lh public/dc_at_dusk*.mp4

# Verify video properties
ffmpeg -i public/dc_at_dusk_mobile_low.mp4
ffmpeg -i public/dc_at_dusk_mobile_high.mp4
```

### Expected Results
```
dc_at_dusk.mp4              # Original (desktop)
dc_at_dusk_mobile_low.mp4   # ~2-3MB, 480p, 24fps
dc_at_dusk_mobile_high.mp4  # ~5-7MB, 720p, 30fps
```

## Update page.tsx

Once video files are created, update the VideoHeroPreload component call:

```typescript
<VideoHeroPreload
  videoSrc="/dc_at_dusk.mp4"
  videoSrcMobileLow="/dc_at_dusk_mobile_low.mp4"
  videoSrcMobileHigh="/dc_at_dusk_mobile_high.mp4"
  mobileFallbackSrc="/CSP_WIDE_Larger_Text.png"
  mobileFallbackWidth={1277}
  mobileFallbackHeight={715}
>
```

## Testing Strategy

### 1. Desktop Testing
- Open in Chrome/Safari/Firefox
- Verify full-quality video loads
- Check smooth playback at 0.5x speed

### 2. Mobile Testing (Chrome DevTools)
- Open DevTools → Toggle device toolbar
- Test different devices:
  - iPhone 12/13/14 (Safari simulation)
  - Samsung Galaxy S21
  - iPad Air
- Throttle network:
  - Fast 3G → Should show static image
  - 4G → Should show low quality video
  - WiFi → Should show high quality video

### 3. Real Device Testing
- Test on actual iPhone/Android devices
- Verify smooth playback
- Monitor data usage
- Check loading times

## Adaptive Loading Logic

The system automatically selects video quality based on:

| Connection | Device Memory | Video Quality | File Served |
|------------|---------------|---------------|-------------|
| 2G/3G | Any | None | Static image |
| 4G | <4GB | Low | mobile_low.mp4 |
| 4G | ≥4GB | Low | mobile_low.mp4 |
| 4G (fast) | ≥4GB | High | mobile_high.mp4 |
| 5G/WiFi | ≥4GB | High | mobile_high.mp4 |
| Desktop | Any | Desktop | dc_at_dusk.mp4 |

## Performance Targets

- **Load Time**: <3 seconds on 4G
- **Data Usage**: <5MB on mobile
- **Smooth Playback**: No stuttering/lag
- **CLS**: <0.1 (no layout shift)
- **LCP**: <2.5s

## Rollback Plan

If issues occur, the system automatically falls back to static images. To manually disable mobile video:

1. Remove mobile video props from page.tsx:
```typescript
<VideoHeroPreload
  videoSrc="/dc_at_dusk.mp4"
  // Remove these lines:
  // videoSrcMobileLow="/dc_at_dusk_mobile_low.mp4"
  // videoSrcMobileHigh="/dc_at_dusk_mobile_high.mp4"
  mobileFallbackSrc="/CSP_WIDE_Larger_Text.png"
  ...
>
```

## Alternative: Use Online Video Compression

If FFmpeg is not available, use online tools:
- **CloudConvert**: https://cloudconvert.com/mp4-converter
- **HandBrake**: https://handbrake.fr/ (Free GUI application)

Settings for online tools:
- **Low Quality**: 854x480, H.264, 800-1000 Kbps, 24fps
- **High Quality**: 1280x720, H.264, 2000-2500 Kbps, 30fps

## Next Steps

1. ✅ Phase 1 complete - Smart loading system implemented
2. 🔄 Create mobile video files using FFmpeg commands above
3. ⏳ Update page.tsx with new video props
4. ⏳ Test on multiple devices and connections
5. ⏳ Monitor performance metrics
6. ⏳ Seek client approval before production deployment

## Questions or Issues?

Contact the development team if you encounter:
- Video encoding errors
- Performance issues on specific devices
- Unexpected fallback behavior
- File size concerns
