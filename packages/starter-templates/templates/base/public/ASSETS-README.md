# Public assets

Files in this directory are served at the site root (e.g. `/logo.png`, `/favicon.ico`).

## Placeholder assets

The following files are **placeholders**. Replace them with your own assets for production:

### Email and branding

- **`logo.png`** – Logo used in email layout (e.g. 230×55px). Used by `app/components/emails/components/layout.tsx`.
- **`linkedin.png`**, **`x.png`**, **`facebook.png`** – Social icons for email footer (e.g. 32×32px). Used by `app/components/emails/components/footer.tsx`.

### Favicons

The template uses **`logo-square.svg`** as the primary favicon (modern browsers); **`favicon.ico`** is used as a fallback. You can keep these SVGs as-is or replace them.

- **`logo.svg`** – Full logo (horizontal). Optional; used if you need it for sharing or other contexts.
- **`logo-square.svg`** – Square logo used as the default favicon in `app/root.tsx`.
- **`favicon.ico`** – Legacy browser tab icon (fallback).
- **`favicons/apple-touch-icon.png`** – iOS home screen (e.g. 180×180px). Can be exported from `logo-square.svg`.
- **`favicons/favicon-32x32.png`**, **`favicons/favicon-16x16.png`** – Standard favicon sizes.
- **`favicons/android-chrome-192x192.png`**, **`favicons/android-chrome-512x512.png`** – Android/PWA icons (see `site.webmanifest`).

## Reference assets

All reference illustrations and images (including higher-quality logo and social icons) can be found in **`@edulinksng/app/assets/`**. Copy the needed files from there into this `public/` directory (and into `public/favicons/` for favicon assets) to replace the placeholders.

Auth-page illustrations (SVGs) live in **`app/assets/images/`** and are imported by route components; replace those in place or update the imports if you use different assets from `@edulinksng/app/assets/`.
