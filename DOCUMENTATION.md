# Soni Web Solutions Website Documentation

This document describes the architecture, operation, and maintenance model for this repository. It is based only on the repository contents as inspected: source files, configuration, existing README content, inline comments, and project structure.

## 1. Project Overview

### What Problem The Project Solves

This project implements a production-quality marketing website for **Soni Web Solutions**, a web design and development agency. The site presents the studio's services, process, portfolio, case studies, testimonials, pricing, FAQs, blog content, and contact options.

The repository is designed so most business-facing content can be updated from a single JSON file rather than by editing many React components.

### High-Level System Description

The system is a Next.js App Router application built with TypeScript, React, Tailwind CSS v4, Radix-based UI primitives, Framer Motion, next-themes, React Three Fiber, and Resend.

At a high level:

- Public pages are rendered from typed content stored in `data/mock.json`.
- Reusable components in `components/` provide layout, UI primitives, sections, animation wrappers, theme controls, and the 3D homepage hero.
- Dynamic routes for portfolio items, blog posts, and case studies are generated from slugs in the JSON content.
- A serverless route handler at `app/api/contact/route.ts` validates contact form submissions and sends email through Resend.
- SEO metadata, sitemap generation, and robots configuration are also driven by repository content.

### Target Users And Use Cases

Primary users:

- Prospective clients evaluating Soni Web Solutions' services.
- Business stakeholders reviewing pricing, process, credibility, and examples of work.
- Site maintainers updating marketing copy, service details, portfolio entries, FAQs, and blog content.
- Developers extending the frontend, form workflow, or content model.

Primary use cases:

- Browse services, pricing, process, testimonials, portfolio, and case studies.
- Filter portfolio projects by tag.
- Read blog posts and case studies from generated detail routes.
- Submit a project inquiry through the contact form.
- Toggle light, dark, or system theme behavior.

## 2. Architecture Overview

### High-Level Architecture

The project follows a **single-application, data-driven frontend architecture** using Next.js App Router. It is not organized as microservices; it is a monolithic web application with one server-side API endpoint for contact form email delivery.

```text
Browser
  |
  | renders pages, submits contact form
  v
Next.js App Router application
  |
  | imports typed content
  v
data/mock.json  --->  lib/get-site-data.ts  --->  app/* pages and components
  |
  | provides content for routes, SEO, nav, cards, FAQs, pricing, contact details
  v
Reusable UI and section components

Contact form flow:

Browser ContactForm
  |
  | POST /api/contact JSON
  v
app/api/contact/route.ts
  |
  | zod validation + HTML escaping
  v
Resend email API
```

### Major Components And Responsibilities

| Component Area | Responsibility |
| --- | --- |
| `app/` | App Router pages, layouts, route handlers, metadata, sitemap, robots rules. |
| `data/mock.json` | Single source of truth for site copy and structured marketing data. |
| `types/site.ts` | TypeScript interfaces that describe the JSON content model. |
| `lib/get-site-data.ts` | Central content accessor plus slug lookup helpers. |
| `components/layout/` | Header, navigation, footer, mobile menu behavior. |
| `components/sections/` | Reusable marketing sections and cards. |
| `components/ui/` | shadcn/ui-style primitives built on Radix UI and local styling conventions. |
| `components/forms/contact-form.tsx` | Client-side contact form state, validation, submission, and user feedback. |
| `app/api/contact/route.ts` | Server-side contact submission validation and Resend email integration. |
| `components/3d/` | Client-only React Three Fiber hero visualization and fallback handling. |
| `app/globals.css` | Tailwind v4 imports, CSS variables, design tokens, utility classes, reduced-motion defaults. |

### Component Interaction And Data Flow

1. `data/mock.json` stores the site's content sections: site metadata, brand, navigation, hero, logos, services, process, portfolio, case studies, testimonials, pricing, FAQ, blog, contact, footer, social links, CTA, about content, and SEO content.
2. `lib/get-site-data.ts` imports the JSON and exposes `getSiteData()` plus lookup helpers such as `getPortfolioBySlug()`, `getCaseStudyBySlug()`, and `getBlogPostBySlug()`.
3. App Router pages call `getSiteData()` or slug helpers to render page sections.
4. Section components receive typed content objects and render cards, accordions, stats, or other page blocks.
5. Dynamic detail pages call `generateStaticParams()` from JSON slugs and use `notFound()` when a slug lookup fails.
6. Root metadata, per-page metadata, `sitemap.ts`, and `robots.ts` read site and SEO data from the same content source.
7. The contact form validates in the browser, submits JSON to `/api/contact`, and the route handler validates again before sending email.

### Key Architectural Patterns

- **Data-driven rendering:** Most user-facing content comes from `data/mock.json`.
- **Typed content model:** `types/site.ts` documents the expected JSON shape and keeps data usage type-aware.
- **Component composition:** Pages are thin compositions of reusable section, layout, UI, and motion components.
- **Server/client split:** Most pages are server components; client components are used where browser state or APIs are required, such as the portfolio filter, contact form, theme controls, motion wrappers, and 3D canvas.
- **Progressive enhancement:** The 3D hero uses a CSS fallback before client readiness, when WebGL is unavailable, and for reduced-motion scenarios.
- **Serverless integration:** Email delivery is isolated to a Next.js route handler.

### External Dependencies And Integrations

Core runtime dependencies include:

- `next` 16.2.10 and React 19.2.4 for the application framework.
- `tailwindcss` v4 and `tw-animate-css` for styling.
- `@radix-ui/*` packages for accessible UI primitives.
- `class-variance-authority`, `clsx`, and `tailwind-merge` for component variants and class merging.
- `next-themes` for light/dark/system theme state.
- `framer-motion` for reveal and stagger animations.
- `three`, `@react-three/fiber`, and `@react-three/drei` for the homepage 3D hero.
- `react-hook-form`, `@hookform/resolvers`, and `zod` for client form validation.
- `resend` for email delivery from the contact API route.
- `lucide-react` for icons.

## 3. Repository Structure

```text
app/
  layout.tsx                  Root layout, global metadata, fonts, theme provider, header/footer
  page.tsx                    Homepage composition
  globals.css                 Tailwind v4 theme tokens, utilities, reduced-motion defaults
  api/contact/route.ts        Contact form route handler
  robots.ts                   robots.txt generation
  sitemap.ts                  sitemap.xml generation
  about/                      About page
  blog/                       Blog index and slug detail route
  case-studies/               Case study index and slug detail route
  contact/                    Contact page
  faq/                        FAQ page
  portfolio/                  Portfolio index, layout, and slug detail route
  pricing/                    Pricing page
  process/                    Process page
  services/                   Services page
  testimonials/               Testimonials page

components/
  3d/                         Homepage 3D hero canvas and scene
  forms/                      Contact form client component
  layout/                     Header and footer
  sections/                   Marketing cards, headings, stats, accordions, section containers
  ui/                         Local shadcn/ui-style primitives
  motion.tsx                  Framer Motion wrappers
  page-hero.tsx               Shared interior page hero
  theme-provider.tsx          next-themes provider wrapper
  theme-toggle.tsx            Theme selection control

data/
  mock.json                   Site content source of truth

lib/
  get-site-data.ts            Content accessors and slug lookup helpers
  icon-map.tsx                String-to-Lucide icon mapping
  utils.ts                    `cn()` class merging helper

types/
  site.ts                     TypeScript interfaces for `data/mock.json`

public/
  *.svg                       Static public assets from the default Next.js scaffold

Configuration:
  package.json                Scripts and dependencies
  tsconfig.json               TypeScript compiler settings and `@/*` path alias
  eslint.config.mjs           Next.js ESLint configuration
  next.config.ts              Next.js configuration placeholder
  postcss.config.mjs          PostCSS configuration for Tailwind
  .env.example                Resend-related environment variables
```

### Entry Points And Critical Modules

- `app/layout.tsx` is the root layout. It sets fonts, global metadata, `ThemeProvider`, skip link, `Header`, `Footer`, and the main content region.
- `app/page.tsx` is the homepage. It composes the hero, logo cloud, services, why-us, process, portfolio highlights, testimonials, pricing, FAQ, blog, and CTA sections.
- `data/mock.json` is the content source. The existing README explicitly states that all user-facing copy is intended to live there.
- `lib/get-site-data.ts` is the sanctioned accessor for content and slug lookups.
- `app/api/contact/route.ts` is the only backend-like module in the repository.
- `app/globals.css` defines the project's design tokens and utility classes.

## 4. Key Design Decisions

### Single JSON Content Source

The project centralizes content in `data/mock.json`. This makes copy and structured content easy to update without modifying many React files.

Trade-offs:

- Positive: Simple maintenance, no database, no CMS runtime dependency, easy static generation.
- Negative: Content updates require code repository access and redeployment. There is no editorial workflow, permissions model, or live preview CMS.

### Typed Static Content Rather Than Runtime Fetching

Content is imported directly and cast to `SiteData`. Pages render synchronously from local data.

Trade-offs:

- Positive: Fast local reads, simple builds, predictable deployment behavior.
- Negative: Runtime content changes are not possible without rebuilding/redeploying.

### App Router With Mostly Server Components

Pages are generally server components. Client components are introduced only for browser state or client-only APIs.

Examples:

- `app/portfolio/page.tsx` is a client component because it manages active tag filtering.
- `components/forms/contact-form.tsx` is a client component because it manages form state and `fetch()` submission.
- `components/3d/hero-canvas.tsx` is client-only because it checks `window`, media queries, and WebGL support.

### Server-Side Revalidation For Contact Form

The contact form validates with zod in the browser and validates again in `app/api/contact/route.ts`.

Trade-offs:

- Positive: Better user feedback and stronger server-side trust boundary.
- Negative: The schema is duplicated between client and server files. Future changes must keep both schemas aligned unless the schema is extracted into a shared module.

### Progressive 3D Enhancement

The homepage hero uses React Three Fiber for a decorative 3D visual, but falls back to CSS visuals when needed.

Trade-offs:

- Positive: Richer visual experience without making the page dependent on WebGL.
- Positive: Reduced-motion and unsupported-browser paths are handled explicitly.
- Negative: Three.js adds bundle/runtime complexity for a decorative element.

### CSS Variable Theme Tokens

Light and dark palettes are defined in `app/globals.css` using OKLCH color values, mapped into Tailwind v4's inline theme.

Trade-offs:

- Positive: Theme values are centralized and used consistently by Tailwind classes.
- Negative: Token changes require CSS knowledge and careful testing across light/dark modes.

## 5. Core Workflows

### Page Rendering Workflow

1. A request reaches a route under `app/`.
2. The page imports `getSiteData()` or a slug helper from `lib/get-site-data.ts`.
3. The page selects relevant content from `data/mock.json`.
4. The page composes reusable components from `components/sections`, `components/ui`, `components/layout`, and `components/motion`.
5. Next.js renders the route and applies metadata from `generateMetadata()` where present.

### Dynamic Detail Route Workflow

Applies to portfolio projects, blog posts, and case studies.

1. `generateStaticParams()` maps the relevant JSON collection to `{ slug }` entries.
2. `generateMetadata()` receives route params, looks up the content item by slug, and returns item-specific title/description when found.
3. The page component looks up the same item.
4. If no item exists, the page calls `notFound()`.
5. If found, the page renders the detail content and related CTA.

### Portfolio Filtering Workflow

1. `app/portfolio/page.tsx` reads all portfolio tags from `data.portfolio` and prepends `All`.
2. The page stores `activeTag` in React state.
3. Filter buttons update `activeTag` and expose `aria-pressed` for state.
4. The displayed project list is filtered by matching tags.
5. If no projects match, the page renders an empty-state message.

### Contact Form Workflow

```text
Visitor fills form
  |
  v
React Hook Form + zod client validation
  |
  v
POST /api/contact
  |
  v
Server parses JSON
  |
  v
zod server validation
  |
  +-- invalid JSON --> 400
  +-- invalid fields --> 422
  +-- missing RESEND_API_KEY --> 500
  |
  v
Escape submitted values for HTML email
  |
  v
Resend email send
  |
  +-- Resend failure --> 502
  +-- success --> { success: true }
```

Client states:

- `idle`: default editable form state.
- `success`: confirmation panel with option to send another message.
- `error`: inline failure message that suggests retrying or emailing directly.
- `isSubmitting`: disables submit button and shows a spinner.

### Theme Workflow

1. `app/layout.tsx` wraps the app with `ThemeProvider` from `components/theme-provider.tsx`.
2. The provider is configured with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `disableTransitionOnChange`.
3. CSS variables in `:root` and `.dark` determine the actual color palette.
4. The theme toggle updates persisted browser preference through `next-themes`.

### 3D Hero Workflow

1. `HeroCanvas` renders a static CSS fallback before browser-only checks complete.
2. On mount, it reads `prefers-reduced-motion` and checks WebGL support.
3. If WebGL is unavailable, it keeps the CSS fallback.
4. If WebGL is available, it lazy-loads `HeroScene` with SSR disabled.
5. `HeroScene` renders a glowing orb, wireframe shapes, lights, sparkles, and environment lighting.
6. Reduced-motion mode disables continuous animation by using `frameloop="demand"` and lower material motion.

### Error Handling And Edge Cases

- Dynamic routes call `notFound()` for unknown slugs.
- Contact API returns structured JSON errors for invalid JSON, validation failure, missing email service configuration, and Resend failures.
- Contact email HTML escapes submitted user values before interpolation.
- `robots.ts` disallows `/api/` crawling.
- The 3D hero handles unsupported WebGL and reduced-motion users.
- A skip link is present in the root layout for keyboard navigation.

## 6. Configuration & Environment

### Scripts

From `package.json`:

```bash
npm run dev     # start the Next.js development server
npm run build   # create a production build
npm run start   # run the production build
npm run lint    # run ESLint
```

### TypeScript Configuration

`tsconfig.json` enables strict type checking, App Router support through the Next.js plugin, JSON imports, JSX via `react-jsx`, and the path alias:

```text
@/* -> ./*
```

### Next.js Configuration

`next.config.ts` currently exports an empty `NextConfig` object. No custom Next.js behavior is configured there.

### ESLint Configuration

`eslint.config.mjs` composes:

- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- default global ignores for `.next`, `out`, `build`, and `next-env.d.ts`

### Environment Variables

`.env.example` defines the email integration variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key used by `app/api/contact/route.ts` to send email through Resend. |
| `RESEND_TO_EMAIL` | No | Inbox that receives contact submissions. Defaults to `contact.email` in `data/mock.json`. |
| `RESEND_FROM_EMAIL` | No | Sender address. Defaults to `onboarding@resend.dev`, which is intended for testing and should be replaced with a verified Resend domain in production. |

### Build, Run, And Deployment Overview

Local setup uses npm. Deployment is expected to work on Vercel or another Node-compatible host that supports Next.js.

Before production deployment:

- Set `data.mock.json`'s `site.url` to the production URL. The repository currently uses `https://soniwebsolutions.com`.
- Configure `RESEND_API_KEY`.
- Configure a verified `RESEND_FROM_EMAIL` for production email sending.
- Optionally configure `RESEND_TO_EMAIL` if submissions should go somewhere other than the contact email in the JSON content.

## 7. Development Guide (Internal)

### Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

### Running Validation

```bash
npm run lint
npm run build
```

Observed repository state during documentation generation:

- `npm run lint` completed with no errors.
- `npm run lint` reported one warning in `components/forms/contact-form.tsx` related to React Compiler skipping memoization because React Hook Form's `watch()` API is considered incompatible for compiler memoization.
- No first-party test files were found in the app source tree.

### Debugging

Useful starting points:

- Page rendering issues: inspect the route under `app/` and the data it reads from `data/mock.json`.
- Content issues: inspect `data/mock.json`, `types/site.ts`, and `lib/get-site-data.ts`.
- Styling issues: inspect `app/globals.css`, the relevant component, and shared UI primitives under `components/ui/`.
- Contact form issues: inspect `components/forms/contact-form.tsx`, `app/api/contact/route.ts`, and Resend environment variables.
- Theme issues: inspect `components/theme-provider.tsx`, `components/theme-toggle.tsx`, and `.dark` variables in `app/globals.css`.
- 3D hero issues: inspect `components/3d/hero-canvas.tsx` and `components/3d/hero-scene.tsx`.

### Coding Conventions And Patterns

- Prefer `getSiteData()` rather than importing `data/mock.json` directly in application code.
- Keep `types/site.ts` synchronized with the JSON shape.
- Keep user-facing content in `data/mock.json` unless a component-specific label is intentionally static.
- Use the `@/*` import alias for repository-root imports.
- Use existing section components and UI primitives before adding new styling patterns.
- Use `cn()` from `lib/utils.ts` when merging Tailwind classes conditionally.
- Add icons by name in `data/mock.json` only if they exist in `lib/icon-map.tsx`.
- Preserve accessibility patterns already present, including labels, `aria-invalid`, `role="alert"`, `aria-pressed`, semantic links/buttons, and the skip link.

### Adding Or Updating Content

1. Edit the relevant section in `data/mock.json`.
2. If the JSON structure changes, update `types/site.ts`.
3. If a new icon name is introduced, update `lib/icon-map.tsx`.
4. If a new dynamic content type requires detail pages, add lookup helpers in `lib/get-site-data.ts` and route files under `app/`.
5. Run `npm run lint` and `npm run build`.

### Adding A New Page

1. Add a folder and `page.tsx` under `app/`.
2. Add SEO content to `data/mock.json` if the page needs dynamic metadata.
3. Add a `generateMetadata()` function following existing pages.
4. Reuse `PageHero`, `SectionContainer`, `SectionHeading`, cards, and motion wrappers.
5. Add navigation/footer links in `data/mock.json` if the page should be discoverable globally.
6. Add the route to `app/sitemap.ts` if it should be indexed.

### Adding A New Portfolio, Blog, Or Case Study Item

1. Add the item to the relevant array in `data/mock.json`.
2. Ensure the `slug` is unique in that collection.
3. Match the fields required by `types/site.ts`.
4. For portfolio tags, the portfolio page automatically picks up new tags from `project.tags`.
5. Run lint/build validation.

## 8. Non-Functional Aspects

### Performance Considerations

- Local JSON content avoids runtime content-fetch latency.
- Dynamic detail routes can be statically generated from JSON slugs.
- The 3D hero is dynamically imported client-side with SSR disabled, preventing server rendering of WebGL code.
- The hero canvas limits device pixel ratio with `dpr={[1, 1.75]}`.
- Reduced-motion mode uses `frameloop="demand"` instead of continuous rendering.
- Homepage sections use reusable components and content slicing for previews, such as featured portfolio projects and the first few testimonials/FAQs.

### Security Considerations

- Contact form payloads are validated server-side with zod.
- User-submitted values are escaped before being embedded in HTML email.
- API secrets are expected to come from environment variables and are not committed in `.env.example`.
- The contact API returns generic failure messages to clients while logging server-side details.
- `robots.ts` disallows crawling `/api/`.

Potential security gaps:

- There is no rate limiting, CAPTCHA, CSRF protection, or spam prevention visible in the repository.
- There is no authentication or admin surface, which is appropriate for the current static marketing site but means content editing happens through source control.

### Scalability And Reliability Notes

- The static JSON model is reliable and simple for small to moderate content volumes.
- The model may become harder to manage if blog, portfolio, or case study content grows substantially.
- Contact form reliability depends on Resend availability and correct environment configuration.
- There is no retry queue for failed email delivery; failures return `502` immediately.

### Accessibility Notes

- The app includes a skip link to `#main-content`.
- Form fields use labels, validation states, and alert roles for errors.
- Portfolio filter buttons use `aria-pressed`.
- The decorative hero canvas is marked `aria-hidden`.
- Reduced-motion preferences are respected globally in CSS and in the 3D hero implementation.

### Logging And Monitoring

The repository uses `console.error()` in the contact API route for missing Resend configuration and Resend failures. No dedicated logging, analytics, tracing, uptime monitoring, or error-reporting integration is present in the repository.

## 9. Limitations & Known Gaps

- No first-party automated tests were found.
- The contact form schema is duplicated in client and server files.
- There is no CMS or database; content changes require editing `data/mock.json` and redeploying.
- There is no visible image/content asset strategy for the mock `image` fields beyond default SVGs in `public/`.
- There is no rate limiting or spam protection for the contact endpoint.
- There is no dedicated deployment configuration such as `vercel.json`, Dockerfile, or CI workflow in the inspected repository.
- `next.config.ts` is effectively empty.
- Runtime observability is limited to console errors in the contact route.
- Existing lint validation reports one warning related to React Hook Form `watch()` usage and React Compiler compatibility.

## 10. Appendix

### Glossary

- **App Router:** Next.js routing system based on the `app/` directory.
- **Route Handler:** A server-side endpoint in the App Router, such as `app/api/contact/route.ts`.
- **Server Component:** A React component rendered on the server by default in the App Router.
- **Client Component:** A React component marked with `"use client"` that can use browser APIs, state, and effects.
- **Static Params:** Route parameters generated at build time for dynamic routes.
- **SEO Metadata:** Page title, description, Open Graph, Twitter, and robots data used by browsers and crawlers.
- **Resend:** The email delivery service used by the contact form route.
- **Radix UI:** Accessible unstyled UI primitives used under local UI components.
- **shadcn/ui-style components:** Local reusable UI components following the composition and styling style popularized by shadcn/ui.
- **OKLCH:** A perceptual color space used for theme tokens in `app/globals.css`.
- **WebGL:** Browser graphics API used by Three.js and React Three Fiber for the 3D hero.

### Assumptions Made During Documentation

- The README statement that `data/mock.json` is the single source of truth for user-facing copy is treated as the intended content model.
- The site is intended for deployment to Vercel or a Node-compatible Next.js host, based on the README and package scripts.
- The contact route is intended to run in a serverless or Node-capable Next.js runtime where environment variables are available.
- The default SVG files in `public/` appear to be scaffold assets; no custom media library was visible in the inspected tree.

### Open Questions For Maintainers

- Should the project introduce automated tests for the contact API, content lookups, and key page rendering paths?
- Should the duplicated contact validation schema be extracted to a shared module?
- Should spam protection or rate limiting be added to `/api/contact` before production use?
- Should portfolio and case study `image` fields point to real assets, remote URLs, or a future CMS/media system?
- Should CI run `npm run lint` and `npm run build` on pull requests?
- Should production monitoring or error tracking be added for failed contact submissions?
- Should the React Hook Form `watch()` lint warning be resolved by switching to a compiler-compatible pattern if React Compiler optimization matters for this component?