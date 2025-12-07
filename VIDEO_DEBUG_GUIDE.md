# Video Playback Debug Guide

## Issue: Video Not Playing on Any Platform

I've identified and fixed several critical issues that were preventing the video from playing. Here's what was wrong and what I fixed:

---

## Root Causes Found

### 1. Missing Video Source Tags
**Problem:** The video element was being rendered but had NO source tags in certain quality scenarios.

**Example:** When video quality was determined as 'low' but no `videoSrcMobileLow` was provided, the video element would render with zero `<source>` tags, resulting in a blank video element.

**Fixed:** Now all quality levels have proper fallback sources:
- `desktop` → uses `videoSrc`
- `high` → uses `videoSrcMobileHigh` OR fallback to `videoSrc`
- `low` → uses `videoSrcMobileLow` OR `videoSrcMobileHigh` OR `videoSrc`

### 2. Mobile Medium Quality Returns 'none'
**Problem:** When browsers don't support the Network Information API (Firefox, Safari, older browsers), the connection quality defaults to 'medium'. The old logic would return video quality 'none' for mobile users with medium connection quality.

**Fixed:** Mobile users with medium connection quality now get 'low' video quality, which will use the video file with proper fallback.

### 3. No Debug Logging
**Problem:** No way to see what quality was detected or if video loading failed.

**Fixed:** Added comprehensive console logging to track:
- Detected quality level
- Connection information
- Device capabilities
- Video load success/failure
- Video source paths

---

## Debug Console Output

When you load the page now, you'll see in the browser console:

### On Page Load
```javascript
Video Performance: {
  quality: 'desktop',  // or 'high', 'low', 'none'
  connection: {
    quality: 'medium',
    effectiveType: '4g',
    downlink: 3.5,
    saveData: false
  },
  device: {
    memory: 8,
    cores: 8,
    isMobile: false,
    prefersReducedMotion: false
  }
}
```

### On Video Success
```javascript
Video loaded successfully: {
  quality: 'desktop',
  loadTime: 2845
}
```

### On Video Failure
```javascript
Video failed to load: {
  quality: 'desktop',
  videoSrc: '/dc_at_dusk.mp4',
  videoSrcMobileHigh: '/dc_at_dusk.mp4',
  videoSrcMobileLow: undefined,
  error: [Event object]
}
```

---

## Testing Steps

### Step 1: Clear Cache
1. Open browser DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. This ensures you're testing with fresh files

### Step 2: Check Console for Quality Detection
1. Open the Console tab
2. Look for the `Video Performance:` log
3. Verify the detected quality:
   - Desktop should show `quality: 'desktop'`
   - Mobile on WiFi should show `quality: 'high'` or `quality: 'low'`

### Step 3: Check Video Element
1. Open Elements/Inspector tab
2. Find the `<video>` element
3. Verify it has a `<source>` tag with `src="/dc_at_dusk.mp4"`
4. Right-click the source src and open in new tab to verify the video file loads

### Step 4: Check Network Tab
1. Open Network tab
2. Filter by "Media" or search for "mp4"
3. Look for `dc_at_dusk.mp4`
4. Check if it:
   - Loads successfully (Status 200)
   - Has the correct size (should be several MB)
   - Doesn't show 404 or other errors

---

## Common Issues & Solutions

### Issue: Video file returns 404
**Symptoms:** Network tab shows `dc_at_dusk.mp4` with status 404
**Solution:** The video file is missing from the `/public` folder
**Action:**
1. Verify file exists at `/tmp/cc-agent/60283001/project/public/dc_at_dusk.mp4`
2. Check file permissions
3. Restart the dev server

### Issue: Video loads but doesn't play
**Symptoms:** Video element exists, source loads, but video is frozen
**Solution:** Check browser autoplay policy
**Action:**
1. Verify video has `muted` attribute (required for autoplay)
2. Check browser console for autoplay policy errors
3. Try clicking on the page first (some browsers require user interaction)

### Issue: Infinite loading spinner
**Symptoms:** "Loading Experience..." shows forever
**Console shows:** No "Video loaded successfully" message
**Solution:** Video is trying to load but failing
**Action:**
1. Check console for error messages
2. Verify video codec compatibility (should be H.264)
3. Try different browser

### Issue: Quality detection shows 'none'
**Symptoms:** Console shows `quality: 'none'`
**Solution:** System determined video shouldn't play
**Action:**
1. Check if "Reduce Motion" is enabled in OS accessibility settings
2. Verify not on extremely slow connection (2G)
3. Check if Data Saver mode is enabled

---

## Browser Compatibility Testing

### Desktop Browsers

**Chrome/Edge:**
- Network API: ✅ Supported
- Expected quality: 'desktop'
- Should see video immediately

**Firefox:**
- Network API: ⚠️ Limited support
- Expected quality: 'desktop'
- Should see video immediately
- May default to 'medium' connection

**Safari:**
- Network API: ❌ Not supported
- Expected quality: 'desktop'
- Should see video immediately
- Will default to 'medium' connection

### Mobile Browsers

**Chrome Mobile:**
- Network API: ✅ Supported
- Expected quality: 'high' (WiFi) or 'low' (4G)
- May see brief loading spinner

**Safari iOS:**
- Network API: ⚠️ Limited support
- Expected quality: 'low' (defaults to medium)
- May see brief loading spinner
- Requires first interaction for autoplay

**Firefox Mobile:**
- Network API: ⚠️ Limited support
- Expected quality: 'low'
- May see brief loading spinner

---

## Verification Checklist

Use this checklist to verify video is working:

### Desktop
- [ ] Open site in Chrome
- [ ] Clear cache and hard reload
- [ ] Console shows `quality: 'desktop'`
- [ ] Loading spinner appears briefly
- [ ] Video fades in and plays at slow motion
- [ ] No console errors

### Mobile - WiFi
- [ ] Open site on phone via WiFi
- [ ] Clear cache
- [ ] Console shows `quality: 'high'` or `quality: 'low'`
- [ ] Loading spinner appears briefly
- [ ] Video fades in and plays

### Mobile - 4G
- [ ] Open site on phone via 4G
- [ ] Console shows `quality: 'low'` or `quality: 'none'`
- [ ] If 'low': Video plays
- [ ] If 'none': Static image shows

---

## What Changed

### Files Modified

**1. `/app/components/VideoHeroPreload.tsx`**
```diff
+ Added debug console logging
+ Fixed source tag fallback logic
+ Now always provides a source tag for each quality level
```

**2. `/lib/connection-detector.ts`**
```diff
+ Added 'medium' quality handling for mobile
+ Mobile medium quality now returns 'low' instead of 'none'
```

**3. `/app/page.tsx`**
```diff
+ Added videoSrcMobileHigh prop to VideoHeroPreload component
```

---

## Performance Monitoring

Access performance data in console:

```javascript
window.getVideoPerformanceReport()
```

**Sample Output:**
```json
{
  "totalAttempts": 10,
  "successRate": "100%",
  "averageLoadTime": "2456ms",
  "byQuality": {
    "desktop": {
      "attempts": 8,
      "successRate": "100%",
      "avgLoadTime": "2234ms"
    },
    "high": {
      "attempts": 2,
      "successRate": "100%",
      "avgLoadTime": "3123ms"
    }
  }
}
```

---

## Next Steps If Still Not Working

If video still doesn't work after these fixes:

### 1. Verify Video File
```bash
# Check if file exists
ls -lh /tmp/cc-agent/60283001/project/public/dc_at_dusk.mp4

# Check file size (should be 5-30MB)
# If file is 0 bytes or doesn't exist, that's the problem
```

### 2. Test Video File Directly
Open in browser: `http://localhost:3000/dc_at_dusk.mp4`
- Should download or play the video
- If 404: File is missing or misnamed
- If plays: File is good, issue is in component

### 3. Check Video Codec
```bash
# If you have ffmpeg installed
ffmpeg -i public/dc_at_dusk.mp4

# Look for:
# Video: h264 (High) ← Good
# Video: hevc ← May not work in all browsers
```

### 4. Simplify for Testing
Temporarily edit `VideoHeroPreload.tsx` to force desktop quality:

```typescript
// In useEffect, replace:
const quality = determineVideoQuality(connectionInfo, deviceInfo);

// With:
const quality = 'desktop';
```

This will force video playback on all devices for testing.

---

## Expected Behavior After Fixes

### Desktop Users
1. Page loads with loading spinner
2. Console logs show `quality: 'desktop'`
3. Video file begins downloading (check Network tab)
4. After 2-4 seconds, video fades in
5. Video plays at 0.5x speed (slow motion)
6. Content overlays appear

### Mobile WiFi Users
1. Page loads with loading spinner
2. Console logs show `quality: 'high'` or `quality: 'low'`
3. Video file begins downloading
4. After 2-5 seconds, video fades in
5. Video plays at 0.5x speed

### Mobile 4G Users
1. Page loads with loading spinner
2. Console logs show `quality: 'low'` or `quality: 'none'`
3. If 'low': Video loads (may take 5-10 seconds)
4. If 'none': Static image shows immediately

---

## Summary

**What was broken:**
- Video element had no source tags in certain scenarios
- Mobile medium connection quality returned 'none' instead of loading video
- No debug logging to diagnose issues

**What's fixed:**
- All quality levels now have proper source fallbacks
- Mobile users with medium quality get video
- Comprehensive console logging for debugging
- Build verified and passing

**Next actions:**
1. Clear browser cache
2. Check console for "Video Performance:" log
3. Verify quality detection
4. Check Network tab for video file loading
5. Report back with console output if still not working
