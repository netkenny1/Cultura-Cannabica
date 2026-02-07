---
name: frontend-patterns
description: Frontend patterns for vanilla HTML/CSS/JS and React: components, state, forms, accessibility, and performance. Use when building or changing UI, pages, or client-side behavior.
---

# Frontend Development Patterns

Patterns for both vanilla JavaScript (current project) and React (future use).

## When to Apply

- Building or updating pages, components, or UI flows
- Handling forms, validation, or client-side state
- Improving accessibility, responsiveness, or performance
- Adding animations, loading states, or error UIs

---

## Vanilla HTML/CSS/JS (Current Stack)

### Structure

- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer`, `button`, `label`, `input`
- One primary JS entry (e.g. app.js) with small modules for cart, checkout, product logic
- CSS: consistent naming (BEM or single convention), variables for colors/spacing, mobile-first media queries

### DOM and State

- Prefer single source of truth (e.g. cart in one object/array); derive DOM from state
- Use `data-*` attributes for component configuration; avoid inline scripts for behavior
- Attach listeners once (event delegation where it helps) and clean up if needed (SPA-like transitions)

### Forms

- Always associate `label` with `input` (id/for or wrapping)
- Validate on submit; show inline errors next to fields
- Disable submit while submitting; show loading/feedback
- Never trust client-only validation for security; backend must re-validate

### Accessibility

- Focus order and visible focus styles
- Sufficient color contrast (WCAG AA)
- Images: meaningful `alt`; decorative images: `alt=""` or CSS background
- Buttons/links: clear purpose; avoid "click here"

---

## React Patterns (Future Use)

### Components

- Prefer composition over inheritance; small, focused components
- Props: explicit types (TypeScript) or PropTypes; avoid prop drilling (use context or state lifting when needed)

### State

- Local state for UI-only (e.g. modal open); lift state only when multiple components need it
- Async data: loading, error, and data states; avoid stale state after unmount (cleanup in useEffect)

### Forms

- Controlled inputs: value + onChange; single state object or per-field
- Validation: on blur and onSubmit; display errors next to fields
- Consider a small form library (e.g. React Hook Form) as forms grow

### Performance

- `useMemo` for expensive derived values; `useCallback` for stable callbacks passed to children
- Lazy load heavy components with `React.lazy` + `Suspense`
- Long lists: virtualize (e.g. react-window) instead of rendering thousands of DOM nodes

---

## Shared Principles

- No `console.log` in production; use a logging approach or strip in build
- Prefer immutable updates (spread/new array) when changing state
- Loading and error states for every async flow; clear, user-facing messages
- Responsive: test small viewports first; use relative units and flexible layouts
