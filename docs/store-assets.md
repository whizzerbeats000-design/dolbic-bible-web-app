# DOLBIC Bible — Store Assets & Packaging

## Generated Assets

**PWA Icons (public/icons/):**
- `icon-192.png` — 192x192, transparent DOLBIC logo on #0B2E68, for manifest `any`
- `icon-512.png` — 512x512, transparent DOLBIC logo, for manifest `any` + OG image
- `icon-maskable-192.png` — 192x192, safe-area padded for maskable purpose
- `icon-maskable-512.png` — 512x512, maskable

**Manifest:** `app/manifest.ts` → `/manifest.webmanifest` (Next.js generates)
- `name: "DOLBIC Bible"`, `short_name: "DOLBIC Bible"`, `theme_color: "#0B2E68"`, `background_color: "#FFFFFF"`, `display: "standalone"`, `orientation: "portrait"`

**Sitemap/Robots:** `app/sitemap.ts` → `/sitemap.xml` (/, /bible, /daily, /plans, /prayer + 10 core bible books), `app/robots.ts` → `/robots.txt`

## Capacitor Integration

**Installed:** `@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`, `@capacitor/android` (add via `npm install` if network was unavailable during setup)

**Init:**
```bash
npx cap init "DOLBIC Bible" "com.dolbic.bible" --web-dir=out
npx cap add android
npx cap add ios
```

**Config:** `capacitor.config.ts` — `appId: com.dolbic.bible`, `webDir: out`, SplashScreen `launchShowDuration: 3000`, StatusBar `DARK #0B2E68`

**Sync:**
```bash
npm run build # next build → out/
npx cap sync # copies web assets to android/ios, updates native plugins
# Verify: npx cap sync — should output "✔ copy finished" with 0 errors
```

**Platform Folders:**
- `/android` — Android Studio project (Gradle), `app/src/main/assets/public` holds web assets after sync
- `/ios` — Xcode project `App/App.xcodeproj`, `App/public` holds web assets

## Building Store Bundles

**Android (Google Play .aab):**
```bash
npx cap sync
npx cap open android # or cd android && ./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
# Upload to Google Play Console → Production → Create new release
```

**iOS (Apple App Store .ipa):**
```bash
npx cap sync
npx cap open ios # Opens Xcode
# In Xcode: Product → Archive → Distribute App → App Store Connect
# Output: .xcarchive → .ipa via Organizer
```

**Store Listing Assets (screenshots to generate):**
- Play Store: 2 phone screenshots (390x844), 1 tablet (1440x900), feature graphic 1024x500, icon 512x512
- App Store: 6.5" (1284x2778) and 5.5" (1242x2208) screenshots, app icon 1024x1024, privacy nutrition label (no tracking)

**Verification:**
- `curl http://localhost:3000/sitemap.xml` → 200, contains /, /bible, /daily
- `curl http://localhost:3000/manifest.webmanifest` → 200, JSON with theme_color #0B2E68
- `npx cap sync` → 0 errors
