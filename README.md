# College Events Website — Automate Boring Task & QuantFinance

A single-page, mobile-first, 60fps event website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP + ScrollTrigger**, **Framer Motion**, **Lenis**, **Supabase**, and **Cloudflare Turnstile**.

## Features
- **Single Source of Truth**: All event data, placeholders, rules, FAQs, prizes, and contact info live in `content/events.ts`.
- **Scoped Data-Theme System**: `data-theme="automate"` (blueprint grid, hazard stripe, robotic arm + terminal) and `data-theme="quant"` (candlestick chart, charging bull, ticker tape) share layout skeletons cleanly.
- **Static CDN Page + Race-Safe Backend**: The landing page is statically generated (`force-static`). Only `/api/seats` (15s CDN cache) and `/api/register` (Postgres `pg_advisory_xact_lock` seat-cap enforcement) hit the backend.
- **Bot & Abuse Protection**: Cloudflare Turnstile verification, Zod schema validation (client + server), and per-IP rate limiting.
- **Accessibility & Performance**: Keyboard-trapped modals, `prefers-reduced-motion` support, >=44px tap targets, `env(safe-area-inset-*)` mobile sticky bar, and SEO JSON-LD structured data.

---

## 1. Setup & Environment Variables

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```
   Required variables:
   - `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — Server-side service role key (**never** expose to client)
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key
   - `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key
   - `ADMIN_EXPORT_SECRET` — Secret token for `GET /api/admin/export`

3. Run the database schema in **Supabase SQL Editor**:
   - Open `supabase/schema.sql` and execute it in your Supabase project. This creates the `registrations` table, enables Row Level Security (no public read), and installs `register_team_safe` + `get_event_seat_counts`.

4. Start local development:
   ```bash
   npm run dev
   ```

---

## 2. Editing Event Content (Placeholders)

Open `content/events.ts` and replace all bracketed `[PLACEHOLDER]` values:
- `ORGANISER_INFO`: Club/branch name, college name, logo text/URL, UPI ID, contact email/phone, social links.
- `EVENTS.automate` & `EVENTS.quant`: Dates (`dateISO`, `dateDisplay`), venue, entry fee, seat cap, prize pool, podium rewards, rounds, rules, FAQs, and coordinator contacts.

---

## 3. Admin CSV Export

Export registrations as CSV using your `ADMIN_EXPORT_SECRET`:
```bash
curl -H "x-admin-secret: YOUR_ADMIN_EXPORT_SECRET" \
  "https://your-domain.vercel.app/api/admin/export" \
  -o registrations.csv
```
Optional filter: `?event=automate` or `?event=quant`.

---

## 4. Load Testing (k6)

Verify race-safe seat caps under 200 concurrent submissions:
```bash
k6 run -e BASE_URL=https://your-domain.vercel.app scripts/k6-register-loadtest.js
```

---

## 5. Deploying to Vercel

1. Push this repository to GitHub/GitLab.
2. Import the project in **Vercel**.
3. Add all environment variables from `.env.example` in **Project Settings → Environment Variables**.
4. Use Supabase's **Connection Pooler** URL if connecting directly, or the HTTPS Supabase JS client (already configured in `lib/supabase.ts`).
5. Deploy!

