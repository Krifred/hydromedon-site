# Hydromedon — Official Website

The source code for [hydromedon.com](https://www.hydromedon.com) — the official site for Hydromedon, an independent faith-based music project publishing original compositions, sheet music, and merchandise.

Live site: **[hydromedon.com](https://www.hydromedon.com)**  
Deployed via: **[Vercel](https://vercel.com)**  
Store: **[store.hydromedon.com](https://store.hydromedon.com)**

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Runtime | React 19 |
| Deployment | Vercel |
| Physical merch | [Fourthwall](https://fourthwall.com) |
| Sheet music | [store.hydromedon.com](https://store.hydromedon.com) |
| Analytics | Custom analytics provider (see `app/providers/analytics.tsx`) |

---

## Project structure

```
hydromedon-site/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   ├── global.css              # Global styles
│   ├── about/                  # About page + recommended sites
│   ├── album/[slug]/           # Album detail pages
│   ├── api/subscribe/          # Newsletter subscribe endpoint
│   ├── lyrics/[slug]/          # Lyrics pages
│   ├── merch/                  # Merch index + category pages
│   │   ├── wearables/
│   │   ├── kitchen/
│   │   ├── computerware/
│   │   └── [slug]/             # Individual merch item pages
│   ├── music/                  # Music library index
│   │   └── [slug]/             # Single/album detail pages
│   ├── sheet-music/            # Sheet music catalog
│   │   └── [slug]/             # Composition detail + resources
│   ├── single/[slug]/          # Single release pages
│   └── video/[slug]/           # Video release pages
│
├── components/                 # Shared UI components
│   ├── Hero.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MusicPreview.tsx
│   ├── MusicCard.tsx
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── StatementOfFaithSection.tsx
│   ├── SmartPlayerBar.tsx
│   ├── AtmosphereBackground.tsx
│   ├── Starfield.tsx
│   ├── FadeIn.tsx
│   ├── MobileNav.tsx
│   ├── NavBar.tsx
│   ├── Breadcrumbs.tsx
│   ├── SectionDivider.tsx
│   ├── merch/                  # Merch-specific components
│   └── sheet-music/            # Sheet music-specific components
│
├── data/
│   └── compositions.ts         # Sheet music catalog data
│
├── lib/                        # Data fetching, types, utilities
│   ├── releases.ts             # Music release catalog
│   ├── types.ts                # Shared TypeScript types
│   ├── merch-catalog.ts        # Merch catalog definitions
│   ├── collectionCovers.ts     # Collection cover image map
│   ├── lyrics.ts               # Lyrics data
│   ├── hydrateRelease.ts       # Release hydration utility
│   ├── getTrackWithLyrics.ts
│   ├── fourthwall.ts           # Fourthwall API integration
│   ├── fourthwall/             # Fourthwall client + types
│   ├── gumroad/catalog.ts      # Sheet music + object catalog
│   ├── shopify/                # Shopify client (legacy/reserved)
│   └── schema/sheetMusic.ts    # JSON-LD schema builders
│
├── public/
│   ├── brand/                  # Logos and wordmarks (SVG + PNG)
│   ├── covers/                 # Album/single cover artwork
│   ├── icons/                  # Favicon and touch icons
│   ├── og/                     # Open Graph images
│   ├── samples/                # Sheet music sample page images
│   └── textures/               # Background textures
│
├── scripts/
│   └── generateCollectionCovers.ts
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Getting started

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)

### Install dependencies

```sh
npm install
```

### Environment variables

Create a `.env.local` file in the project root with the following variables:

```
# Fourthwall — physical merch store integration
FOURTHWALL_STOREFRONT_TOKEN=your_token_here

# Newsletter subscription endpoint (if applicable)
SUBSCRIBE_API_KEY=your_key_here
```

> These values are not required to run the site locally — pages that depend on them will gracefully degrade or show empty states.

### Run the development server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```sh
npm run build
npm run start
```

### Lint

```sh
npm run lint
```

---

## Content management

This site does not use a CMS. All content is managed directly in source code:

| Content type | File |
|---|---|
| Music releases (singles, albums, videos) | `lib/releases.ts` |
| Sheet music compositions | `data/compositions.ts` |
| Physical merch & sheet music catalog | `lib/gumroad/catalog.ts` |
| Merch category configuration | `lib/merch-catalog.ts` |
| Lyrics | `lib/lyrics.ts` |
| About copy | `components/AboutSection.tsx` |
| Statement of Faith | `components/StatementOfFaithSection.tsx` |

### Adding a new release

Add an entry to the `releases` array in `lib/releases.ts` with the appropriate `type` (`"Single"`, `"Album"`, or `"Video"`), cover image path, Spotify/YouTube links, and release date. The homepage Music Preview and Music library page update automatically.

### Adding sheet music for a composition

Add an entry to the `compositions` array in `data/compositions.ts`. Each entry includes technical details (key, tempo, time signature, difficulty), lyrics, sample image/PDF paths, and `scores` array with purchase URLs. The sheet music index page (`/sheet-music`) and individual composition pages (`/sheet-music/[slug]`) render automatically from this data.

---

## Deployment

The site deploys automatically to [Vercel](https://vercel.com) on every push to the `master` branch. No manual deployment steps are required.

Production URL: [https://www.hydromedon.com](https://www.hydromedon.com)  
Preview deployments are created automatically for pull requests.

---

## SEO & structured data

Each page implements JSON-LD structured data using schema builders in `lib/schema/sheetMusic.ts`. The following schema types are in use:

- `MusicComposition` — on individual composition pages
- `Product` — on sheet music score listings
- `BreadcrumbList` — on all content pages
- `ItemList` — on the sheet music and merch index pages
- `WebPage` / `CollectionPage` — on index pages

---

## License

All source code in this repository is proprietary.  
All music, lyrics, artwork, and compositions are © Hydromedon. All rights reserved.  
Sheet music may not be reproduced or distributed without a valid purchase license.
