# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`packageManager` pinned in package.json).

- `pnpm dev` — start dev server (Next.js, port 3000)
- `pnpm build` — production build (runs `next-sitemap` afterwards via `postbuild`)
- `pnpm start` — run production build
- `pnpm lint` — `next lint`

There is no test suite in this repo (no test runner configured, no `*.test.*`/`*.spec.*` files) and no standalone typecheck script — use `pnpm build` (or your editor's TS server) to catch type errors.

## Architecture

Invomaker is a Next.js 15 (App Router) invoice generator/SaaS: public marketing + free invoice tool, plus an authenticated dashboard for paid invoice history/client management. It is entirely a frontend against a separate backend API (base URL from `NEXT_PUBLIC_API_ENDPOINT` via `app/helpers/config.ts`); there is no local database — the only `app/api/*` route is a small analytics passthrough.

### Route groups (`app/`)

- `(public-routes)` — marketing pages, SEO content, blog, the free `create-invoice`/`edit-invoice` tools, `tools/*` (currency/timezone converters), `pricing`, etc. Wrapped by `app/AppWrapper.tsx` (`Header2` → `main` → `Footer2`).
- `(private-routes)/dashboard` — authenticated app shell (`dashboard/layout.tsx`): collapsible `ui/Sidebar.tsx` + `h-14` top bar. Sub-routes: `my-invoices`, `clients`, `subscription`, `profile`, `my-referrals`, `my-usage`, `feedback`.
- Route protection is **not** enforced by `middleware.ts` — the token-expiry redirect logic there is commented out. Auth gating happens client-side via `useAuthContext`.

### Auth & user state

- `app/context/useAuthContext.tsx` is the source of truth for `isLoggedIn`, `currentUser`, `isPremium` (derived from `currentUser.activeSubscription.planCode === PLAN_CODES.STARTER`). It calls `${API_BASE_URL}/users/me` with `credentials: 'include'` on mount (cookie-based session), and `doLogout` posts to `/auth/logout`.
- `app/context/useAppContext.tsx` holds other cross-cutting UI/app state.
- Both providers are wired in `app/Providers.tsx` alongside `QueryClientProvider`, `GoogleOAuthProvider`, `TooltipProvider`, and `PostHogProvider`.
- `middleware.ts` reads the access token cookie key from `app/helpers/local-storage.ts` (`LOCAL_KEYS.ACCESS_TOKEN`) but currently just passes every request through.

### Data fetching pattern

- All backend calls go through the shared axios instance in `app/helpers/request.ts` (`getRequest`/`postRequest`/`putRequest`/`delRequest`/`patchRequest`), which auto-redirects to `/auth?session=expired` on a 401.
- Feature-specific hooks live in `app/hooks/backend/*.hook.ts` (e.g. `invoice.hook.ts`, `invoice-client.hook.ts`, `user.hook.ts`) and wrap `@tanstack/react-query` (`useQuery`/`useInfiniteQuery`) around those helpers.
- Endpoint paths are centralized in `app/constants/api-routes.ts` (`API_ROUTES`); query cache keys in `app/constants/query-keys.ts` (`QUERY_KEYS`). Add new endpoints/keys there rather than inlining strings in hooks.
- Direct file upload uses `getS3SignedUrl` + `uploadUsingSignedUrl` from `request.ts` (client requests a signed URL from the backend, then PUTs the file straight to storage).

### Plans & feature gating

- `app/constants/plan.ts` defines `PLAN_CODES`, `FeatureKey`, and `PLAN_FEATURES` (per-plan limits like invoice email limit, client limit, logo size) plus `SUBSCRIPTION_PLANS` display data. Treat `PLAN_FEATURES` as reference/display data — actual enforcement happens on the backend.
- `app/constants/index.ts` holds app-wide constants: `APP_PATHS` (route map used instead of hardcoded hrefs), `INVOICE_STATUS`, `NAV_LINKS`, ad slot IDs, SEO defaults, etc.

### UI components

- Two component locations: shadcn/ui primitives in `components/ui/*` (generated via `components.json`, style `new-york`, base color `neutral`) and hand-rolled shared widgets in `ui/*` (e.g. `Sidebar.tsx`, `TanstackTable.tsx`, `InvoiceActionDropdown.tsx`, `GlobalModal.tsx`). Prefer reusing from both before adding new primitives.
- Feature-area components live under `app/components/{Invoice,Header,Footer,Card,Buttons,Paid,Referral,common}`.
- Path aliases: `@/*` maps to repo root (`tsconfig.json`); shadcn aliases (`@/components`, `@/lib/utils`, `@/components/ui`, `@/hooks`) are defined in `components.json`.

### Branding constraints (`.cursor/rules/branding.mdc`)

- Light-mode only, no dark theme. Brand accent is `emerald-600`/`emerald-500` on a white/`gray-50` canvas; do not introduce new accent colors (no purple, no legacy hex tokens) or a second font (Inter only).
- Reuse `components/ui/*` and `ui/*` before inventing new primitives; keep the public shell as `Header2`/`Footer2` and the app shell as the sidebar + `h-14` top bar layout already in `dashboard/layout.tsx`.
- Product name is always **Invomaker** (not "InvoMaker"/"Invo Maker"); logo asset is `/images/logo.jpg`, not `.png`.

### Known legacy/unused code

`app/store/*.ts` (`useAppStore`, `useFilesStore`) and `app/constants/schema.ts` (`PersonalDetailsSchema`, `ContactDetailsSchema`) are leftovers from a different (passport-application) project this repo was bootstrapped from — they're about passports/personal details, not invoices, and have no importers. Don't extend or "fix" them as if they're part of the invoice domain; if touching this area, prefer deleting rather than reusing.
