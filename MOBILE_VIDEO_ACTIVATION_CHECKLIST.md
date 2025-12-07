# Mobile Video Activation Checklist

## Status: Ready for Phase 2 Implementation

### ✅ Phase 1 Complete: Smart Loading System
The adaptive video loading infrastructure is now fully implemented and tested:

- **Connection Quality Detection** - Detects 2G/3G/4G/5G/WiFi
- **Device Capability Assessment** - Checks device memory and preferences
- **Adaptive Quality Selection** - Automatically chooses optimal video quality
- **Performance Monitoring** - Tracks load times and success rates
- **Graceful Fallbacks** - Falls back to static images when needed

### 🔄 Phase 2: Video Asset Creation & Deployment

To activate mobile video on the live site, complete these steps:

## Step 1: Create Mobile Video Files (30 minutes)

### Option A: Using FFmpeg (Recommended)
```bash
# Navigate to project directory
cd /path/to/project

# Create low quality (480p) - for 4G connections
ffmpeg -i public/dc_at_dusk.mp4 \
  -vf "scale=854:480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 -preset slow -crf 28 -maxrate 1000k -bufsize 2000k \
  -r 24 -pix_fmt yuv420p -movflags +faststart -an \
  public/dc_at_dusk_mobile_low.mp4

# Create high quality (720p) - for WiFi/5G connections
ffmpeg -i public/dc_at_dusk.mp4 \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 -preset slow -crf 25 -maxrate 2500k -bufsize 5000k \
  -r 30 -pix_fmt yuv420p -movflags +faststart -an \
  public/dc_at_dusk_mobile_high.mp4

# Verify files were created
ls -lh public/dc_at_dusk*.mp4
```

### Option B: Using Online Tool
1. Go to https://cloudconvert.com/mp4-converter
2. Upload `dc_at_dusk.mp4`
3. Create two versions with these settings:

**Low Quality:**
- Resolution: 854x480
- Codec: H.264
- Bitrate: 1000 Kbps
- Frame Rate: 24fps
- Filename: `dc_at_dusk_mobile_low.mp4`

**High Quality:**
- Resolution: 1280x720
- Codec: H.264
- Bitrate: 2500 Kbps
- Frame Rate: 30fps
- Filename: `dc_at_dusk_mobile_high.mp4`

4. Download and save both files to `/public` folder

## Step 2: Update page.tsx (5 minutes)

Open `/app/page.tsx` and find the `VideoHeroPreload` component (around line 2615).

**Current code:**
```typescript
<VideoHeroPreload
  videoSrc="/dc_at_dusk.mp4"
  mobileFallbackSrc="/CSP_WIDE_Larger_Text.png"
  mobileFallbackWidth={1277}
  mobileFallbackHeight={715}
>
```

**Updated code:**
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

## Step 3: Test Locally (15 minutes)

### Test Desktop
```bash
npm run dev
```
Open http://localhost:3000
- Verify desktop video loads correctly
- Check smooth playback at 0.5x speed

### Test Mobile Simulation
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select "iPhone 12 Pro"
4. Reload page

**Network Throttling Tests:**
- **Fast 3G** → Should show static image only
- **4G** → Should show low quality video (check console logs)
- **No throttling (WiFi)** → Should show high quality video

### Verify in Console
Check browser console for logs:
```
Video Performance: {
  quality: "high",
  loadTime: "1842ms",
  success: true,
  connectionType: "4g"
}
```

## Step 4: Performance Verification (10 minutes)

Open DevTools → Network tab and reload:

### Check File Sizes
- Desktop: `dc_at_dusk.mp4` should load (original size)
- Mobile Low: `dc_at_dusk_mobile_low.mp4` should be ~2-3MB
- Mobile High: `dc_at_dusk_mobile_high.mp4` should be ~5-7MB

### Check Load Times
- WiFi: Should load in <2 seconds
- 4G: Should load in <3 seconds
- 3G: Should show static image (no video download)

### Performance Report
Open browser console and run:
```javascript
window.getVideoPerformanceReport()
```

Should show metrics like:
```json
{
  "totalAttempts": 3,
  "successRate": "100%",
  "averageLoadTime": "1842ms",
  "byQuality": {
    "desktop": {...},
    "high": {...},
    "low": {...}
  }
}
```

## Step 5: Build & Deploy (10 minutes)

```bash
# Build production version
npm run build

# Verify build succeeds
# Check output for any errors

# Deploy to production
# (Your specific deployment command here)
```

## Step 6: Production Testing (20 minutes)

### Real Device Testing
Test on actual devices:

- [ ] iPhone (Safari) - WiFi connection
- [ ] iPhone (Safari) - 4G/5G connection
- [ ] Android (Chrome) - WiFi connection
- [ ] Android (Chrome) - 4G/5G connection
- [ ] iPad (Safari)

### Checklist for Each Device
- [ ] Page loads without errors
- [ ] Video plays smoothly (or shows appropriate fallback)
- [ ] No layout shift during load
- [ ] Content is readable and accessible
- [ ] Load time is acceptable (<3s)

## Step 7: Monitor & Optimize (Ongoing)

### First 24 Hours
- Monitor error rates in browser console
- Check analytics for bounce rate changes
- Collect user feedback

### Performance Monitoring
In browser console, run:
```javascript
window.getVideoPerformanceReport()
```

Track:
- Success rate (target: >95%)
- Average load time (target: <3s on 4G)
- Quality distribution

### If Issues Arise
**Quick Rollback:**
1. Remove mobile video props from page.tsx
2. Rebuild and redeploy
3. Site reverts to static images on mobile

## Adaptive Loading Behavior

The system will automatically:

| Scenario | Behavior | Reason |
|----------|----------|--------|
| User on 3G | Static image only | Slow connection, save data |
| User with data saver on | Static image only | Respect user preference |
| User prefers reduced motion | Static image only | Accessibility |
| Mobile on 4G | Low quality video | Balance quality & data usage |
| Mobile on WiFi/5G | High quality video | Fast connection available |
| Desktop (any connection) | Full quality video | Desktop has resources |
| Video fails to load | Static image fallback | Error handling |

## Expected Improvements

After activation:
- ✅ Consistent brand experience across desktop and mobile
- ✅ 60-80% reduction in mobile data usage vs. full video
- ✅ Maintained smooth performance (<3s load time)
- ✅ Improved mobile engagement metrics
- ✅ Automatic adaptation to connection quality

## Troubleshooting

### Video doesn't load on mobile
- Check that video files exist in `/public` folder
- Verify filenames match exactly in page.tsx
- Check browser console for errors

### Video is choppy/laggy
- May indicate insufficient device resources
- System should auto-detect and fall back to static image
- Check connection quality in console logs

### File sizes too large
- Re-encode with lower bitrate
- Reduce resolution further (360p for low, 540p for high)
- Consider shorter video duration

## Client Approval

Before deploying to production:
- [ ] Create video files and verify quality
- [ ] Test on multiple devices
- [ ] Demonstrate to client
- [ ] Get explicit approval
- [ ] Document any custom requirements
- [ ] Set up monitoring dashboard

## Support & Questions

For technical support or questions about implementation:
- Review `VIDEO_OPTIMIZATION_GUIDE.md` for detailed FFmpeg instructions
- Check connection-detector.ts for quality selection logic
- Review VideoHeroPreload.tsx for implementation details

## Success Criteria

Mobile video activation is successful when:
- ✅ Desktop experience unchanged
- ✅ Mobile loads appropriate quality based on connection
- ✅ Load times <3s on 4G
- ✅ Success rate >95%
- ✅ No increase in bounce rate
- ✅ Client approves final experience
