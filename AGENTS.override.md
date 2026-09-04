# Only for PI Agent

---

description: Invomaker brand & UI standards for components and designs
globs: "\*_/_.{tsx,css}"
alwaysApply: false

---

# Invomaker branding

Light-first freemium SaaS. White/gray canvas, emerald accents, Inter. Match existing marketing + dashboard UI — do not invent a new visual system.

## Identity

- Product: **Invomaker** (never InvoMaker / Invo Maker)
- Domain / wordmark text: `invomaker.com` (`APP_NAME` from `app/constants/index.ts`)
- Logo: `/images/logo.jpg` only (not `logo.png`)
- Voice: clear, benefit-led, freemium — “free to get started”, send/track/get paid. No hype fluff.

## Color

| Role          | Use                                                                          |
| ------------- | ---------------------------------------------------------------------------- |
| Accent / CTA  | `emerald-600` fill, `emerald-500` highlights, `emerald-50`–`200` chips/wells |
| Canvas        | `white`, section bands `gray-50` / `gray-50/80`                              |
| Text          | `gray-900` headings, `gray-600` body, `gray-500` labels                      |
| Borders       | `gray-100` / `gray-200`                                                      |
| App chrome    | white surfaces, `md:bg-gray-50` dashboard shell                              |
| Destructive   | shadcn `destructive` / red                                                   |
| Charts unpaid | amber `#f59e0b`; paid emerald `#10b981`                                      |

```tsx
// ✅ marketing / product CTA
className = 'bg-emerald-600 text-white hover:bg-emerald-700'

// ❌ do not use as brand accent
className = 'bg-[#0090b0]' // logo teal
className = 'bg-darkish' / 'bg-maroon' / 'bg-yellowish' // legacy tokens
className = 'bg-purple-600' // avoid purple-as-brand
```

- Prefer Tailwind `emerald-*` + `gray-*` over new hex.
- shadcn `primary` is near-black — fine for default Button; brand CTAs override with emerald classes.
- Light mode only. Do not add dark theme unless asked.

## Typography

- Font: **Inter** only (`app/layout.tsx`). No second display/serif family.
- Headings: `font-semibold` / `tracking-tight`
- Body: `text-sm leading-relaxed text-gray-600`
- Micro-labels: `text-xs font-semibold uppercase tracking-wide text-gray-500`

## Shape & elevation

- Radius: `--radius: 0.5rem`; marketing cards often `rounded-2xl`; controls `rounded-md` / `rounded-lg`
- Borders + `shadow-sm` over heavy multi-layer shadows
- Badges/chips: `rounded-full` with emerald tint OK
- Motion: light hover/focus only — no glow, pulse-as-decoration, or motion-led heroes

## Components & layout

- Stack: shadcn/ui (new-york, neutral) + Radix + `lucide-react`. Reuse `components/ui/*` and existing `ui/*` before inventing primitives.
- Public shell: `Header2` → main → `Footer2` (`app/AppWrapper.tsx`)
- App shell: collapsible Sidebar + `h-14` top bar (`dashboard/layout.tsx`)
- Sections: one job each; alternate `bg-white` / `bg-gray-50`; `border-t border-gray-100`
- Icons: Lucide in soft emerald/gray wells — not emoji

## Do not

- Purple-glow, cream/serif editorial, or broadsheet layouts
- Cards-for-decoration (border/shadow only when it aids interaction or grouping)
- New fonts, new accent colors, or dark-mode scaffolding
- Mixing `logo.png` or legacy Header/Footer v1 into new UI
