# Vantage Clinical Strategy Ltd — Corporate Website

A single-page corporate website for **Vantage Clinical Strategy Ltd**, positioned for UK CEOs, HR Directors and board-level risk owners. The site frames psychosocial risk as a legal-defensibility exercise — not a wellbeing initiative — and is built around a forensic audit offer.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York)
- **Fonts:** Fraunces (serif headings), Inter (body) via `next/font`
- **Icons:** Lucide React
- **Package manager:** Bun

## Local development

```bash
bun install
bun run dev      # http://localhost:3000
bun run lint     # ESLint
bun run build    # Production build (output: standalone)
```

## Project structure

```
src/
  app/
    layout.tsx     # Root layout + fonts + metadata
    page.tsx       # Single-page site — all sections
    globals.css    # Corporate theme (ink / ivory / oxblood / gold)
  components/ui/   # shadcn/ui primitives
  hooks/           # use-toast, use-mobile
public/
  logo.svg
  robots.txt
.github/
  workflows/
    deploy-vercel.yml   # Primary CI/CD — auto-deploys main to Vercel
    deploy-netlify.yml  # Alternative — auto-deploys main to Netlify
vercel.json              # Vercel build config
netlify.toml             # Netlify build config + security headers
```

## Site sections

1. Hero — Psychosocial Risk Audit headline + key legal stats
2. Reframe — "Not a wellbeing initiative. A legal defensibility exercise."
3. Legal Position — HSE duty, 5+ recording rule, Jan 2027 uncapped awards, £51bn / £24bn cost figures
4. Board Risk Map — 6 risk categories (Legal/Tribunal, Director, Absence, Turnover, Reputation, Insurance)
5. Services — 3 offers (Defensibility Audit, Leadership Upskilling, Action Plan & Review Cycle)
6. Risks We Manage — 8-row risk-intervention table
7. Commercial ROI — 3 cost buckets (Claims / Workforce / Reputation)
8. Buyer Questions — 5-item accordion
9. One-Page Corporate Message
10. Why Vantage — clinical pedigree narrative
11. Contact form — board briefing request
12. Footer — full legal disclaimer

## Deployment

This repo ships with GitHub Actions workflows for both **Vercel** (primary) and **Netlify** (alternative). Both run on every push to `main`. Pick one and disable the other.

### Option A — Vercel (recommended for Next.js)

**One-time setup:**

1. Install the Vercel CLI locally and link the project:
   ```bash
   npm i -g vercel
   vercel login
   vercel link     # follow the prompts to create/select a project
   ```
2. Read the project identifiers Vercel just wrote:
   ```bash
   cat .vercel/project.json
   # → { "orgId": "team_xxx", "projectId": "prj_xxx", ... }
   ```
3. Create a Vercel access token: <https://vercel.com/account/tokens>
4. In the GitHub repo, go to **Settings → Secrets and variables → Actions → New repository secret** and add three secrets:
   | Secret name          | Value                              |
   | -------------------- | ---------------------------------- |
   | `VERCEL_TOKEN`       | your personal access token         |
   | `VERCEL_ORG_ID`      | `orgId` from `.vercel/project.json`|
   | `VERCEL_PROJECT_ID`  | `projectId` from `.vercel/project.json` |
5. Push to `main`. The workflow will install, lint, build and deploy automatically. Production URL will be `https://<your-project>.vercel.app`.

To disable the Netlify workflow if you don't want it running, either delete `.github/workflows/deploy-netlify.yml` or add `if: false` at the top of the `deploy` job.

### Option B — Netlify

**One-time setup:**

1. Create a Netlify site: <https://app.netlify.com/start> → "Import an existing project" → pick this GitHub repo. Netlify will detect `netlify.toml` and build with Bun.
2. Grab the site ID from **Site settings → General → Site details → Site ID**.
3. Create a Netlify personal access token: **User settings → Applications → Personal access tokens**.
4. Add two GitHub repo secrets:
   | Secret name          | Value                          |
   | -------------------- | ------------------------------ |
   | `NETLIFY_AUTH_TOKEN` | your personal access token     |
   | `NETLIFY_SITE_ID`    | site ID from step 2            |
5. Disable the Vercel workflow (delete the file or add `if: false` to its `deploy` job).
6. Push to `main`.

`netlify.toml` already includes security headers suitable for a corporate B2B site (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).

## Important notes

- **Contact form** — currently submits client-side with a success toast. To receive enquiries, wire it to an API route (Next.js Route Handler at `src/app/api/contact/route.ts`) that forwards to your email/CRM. This will work on both Vercel and Netlify.
- **No legal advice** — Vantage Clinical Strategy Ltd provides clinical and operational psychosocial risk audit services, not legal advice as a solicitor. The footer disclaimer reflects this and must remain on every deployed version.
- **Legislation references** — all references to the Employment Rights Act reforms, October 2026 tribunal time-limit changes, and January 2027 uncapped compensatory awards reflect the UK government's April 2026 implementation update. Review before each deploy in case guidance changes.

## License

Proprietary — © Vantage Clinical Strategy Ltd. All rights reserved.
