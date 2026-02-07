# Software Engineering — Reference

Extended guidance for design, architecture, stacks, and services. Use when the main SKILL.md points here for deeper detail.

---

## Visual Design & UX Patterns

### Typography

- **Primary font**: One sans or serif for headings and key UI (e.g. Inter, Geist, Source Sans, DM Sans).
- **Body font**: Same family or a paired serif/sans; keep x-height and readability high for long text.
- **Scale**: Use a type scale (e.g. 1.25 or 1.333) for consistent sizes (e.g. 12, 14, 16, 20, 24, 32px).
- **Line height**: ~1.4–1.6 for body; tighter for headings.
- **Line length**: ~45–75 characters for body blocks.

### Spacing & Layout

- **Base unit**: 4px or 8px; derive margins/padding from multiples (8, 16, 24, 32, 48, 64).
- **Grid**: 12-column or 8-column; consistent gutters (16–24px).
- **Component spacing**: Same padding inside similar components; consistent gaps in lists and forms.

### Color

- **Palette**: Primary (1–2), neutral (3–5), semantic (success, warning, error). Optional accent.
- **Contrast**: Text vs background ≥ 4.5:1 (AA); 7:1 for critical text (AAA).
- **Tokens**: Define as CSS variables or theme tokens (e.g. `--color-primary`, `--color-surface`) for light/dark and consistency.

### Components

- **Buttons**: Primary (filled), secondary (outline/ghost), danger; one clear primary per context.
- **Forms**: Labels above or floating; clear error states; optional inline validation.
- **Cards**: Consistent padding, subtle border or shadow; avoid heavy decoration.
- **Navigation**: Persistent pattern (top/side); active state; mobile-friendly (drawer or bottom).

### Motion

- **Duration**: 150–300ms for micro-interactions; 300–500ms for page/panel transitions.
- **Easing**: Prefer ease-out or custom curves (e.g. ease-out-expo) for snappy feel.
- **Reduce motion**: Respect `prefers-reduced-motion`; offer instant or minimal animation.

---

## Architecture Patterns

### Layered (N-tier)

```
ui/          → pages, components, API client
application/ → use cases, orchestration, DTOs
domain/      → entities, value objects, domain logic
data/        → repositories, DB, external APIs
```

- **Pros**: Clear separation, testable, familiar. **Cons**: Can become a “god layer” if application layer grows too large.
- **Use**: CRMs, dashboards, most web backends.

### Feature-based

```
features/
  auth/       → components, hooks, api, types
  orders/     → components, hooks, api, types
  reports/    → ...
shared/       → ui, utils, config
```

- **Pros**: Scales with team; features are self-contained. **Cons**: Need discipline to avoid duplication and keep shared code clean.
- **Use**: Medium-to-large frontends and full-stack apps.

### Clean / Hexagonal

```
domain/         → entities, ports (interfaces)
application/    → use cases, port implementations
adapters/
  web/          → HTTP, GraphQL
  persistence/   → DB, cache
  external/      → third-party APIs
```

- **Pros**: Domain and use cases independent of UI/DB; easy to add adapters. **Cons**: More boilerplate; overkill for simple apps.
- **Use**: Complex domain, multiple UIs or integrations, long-lived systems.

### API Design

- **REST**: Resource URLs, HTTP verbs, status codes. Use for CRUD and standard integrations.
- **GraphQL**: When clients need flexible queries and you want one endpoint; good for product UIs and mobile.
- **Versioning**: URL path (`/v1/`) or header; avoid breaking changes without a new version.
- **Errors**: Consistent shape (e.g. `{ code, message, details }`); use HTTP status correctly.

---

## Stacks and Frameworks

### Frontend

| Need | Option | Notes |
|------|--------|------|
| Full app, SEO, SSR | Next.js (React) | Default for many teams; Vercel ecosystem |
| Full app, Vue | Nuxt | Similar to Next; strong DX |
| Full app, minimal runtime | SvelteKit | Fast, small bundles |
| SPA only | React, Vue, Svelte | When SSR not required |
| Static / content | Astro, 11ty | Content-heavy; partial hydration |
| Simple site | HTML/CSS/JS | No framework; minimal tooling |

### Backend

| Need | Option | Notes |
|------|--------|------|
| JS/TS, APIs, realtime | Node (Fastify, Express) | Same language as frontend; huge ecosystem |
| CRUD, admin, rapid | Django (Python) | ORM, admin, auth out of the box |
| High-perf API, async | FastAPI (Python) | OpenAPI, async; good for services |
| Services, CLI, perf | Go (Fiber, Echo) | Simple deploys; smaller ecosystem |
| Enterprise, Windows | .NET (C#) | Strong typing; Microsoft ecosystem |

### Mobile

| Need | Option | Notes |
|------|--------|------|
| Web + mobile, one team | React Native | Share logic; native modules when needed |
| Single codebase, custom UI | Flutter | iOS/Android; no web reuse |
| Max platform leverage | Swift + Kotlin | Two codebases; best platform fit |
| Simple PWA | PWA + responsive | When install and push are enough |

### Database

| Need | Option | Notes |
|------|--------|------|
| Relational, general | PostgreSQL | Default for apps and CRMs |
| Embedded, single-instance | SQLite | Local, prototypes, embedded |
| Document, flexible schema | MongoDB | When data is document-shaped; watch transactions |
| Cache, sessions, queues | Redis | Complement to primary DB |

---

## Services and Tooling

### BaaS Comparison

| Criteria | Supabase | Firebase |
|----------|----------|----------|
| Database | Postgres (SQL) | Firestore (NoSQL) |
| Auth | Built-in, JWT | Built-in, Google ecosystem |
| Realtime | Postgres changes | Firestore listeners |
| Storage | S3-compatible | GCS-backed |
| Self-host | Yes (open source) | No |
| Best for | Relational data, flexibility, open source | Rapid prototype, mobile, Google stack |

### Auth Services

| Service | Best for |
|---------|----------|
| Supabase Auth / Firebase Auth | When using that BaaS |
| Clerk | React/Next; quick setup; many providers |
| Auth0 | Enterprise, many IdPs, compliance |
| NextAuth | Next.js; self-hosted; OAuth/database |
| Custom (sessions + DB) | Full control; more security responsibility |

### Hosting

| Type | Options | Best for |
|------|---------|----------|
| Static / serverless frontend | Vercel, Netlify | Next, Nuxt, SvelteKit, static sites |
| Full-stack / backend | Railway, Render, Fly.io | APIs, DBs, small-to-medium apps |
| Cloud | AWS, GCP, Azure | Scale, compliance, specific services |
| Edge | Vercel Edge, Cloudflare Workers | Low-latency, global logic |

### When to Choose Custom Backend vs BaaS

- **Choose BaaS (Supabase/Firebase)** when: speed to ship, small team, standard auth/storage/realtime, and data model fits (Supabase → relational, Firebase → document).
- **Choose custom backend** when: complex business rules, compliance, cost control at scale, or need to own data and infra. Prefer **Supabase** over Firebase when you want SQL, relational data, or self-hosting later.

---

## Summary

- **Design**: Consistent typography, spacing, color, and hierarchy; accessibility and motion with care.
- **Architecture**: Layered or feature-based by default; clean/hexagonal when domain is complex or multiple UIs.
- **Stacks**: Match to team and product (see tables); prefer Postgres for relational data; Node/Python/Go for backends.
- **Services**: Supabase or Firebase for speed; custom backend + Postgres when you need control, compliance, or scale.
