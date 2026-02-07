---
name: backend-patterns
description: Backend architecture patterns, API design, Node.js/Express server patterns, security headers, rate limiting, and server-side best practices. Use when building or modifying server.js, API routes, or backend logic.
---

# Backend Development Patterns

Backend patterns for Node.js servers (plain http, Express, or similar) and scalable server-side logic.

## When to Apply

- Designing or changing API structure
- Adding or modifying server.js (or Express) routes and middleware
- Implementing rate limiting, security headers, or error handling
- Database access, caching, or background jobs
- Authentication, authorization, or input validation

---

## API Design

### RESTful Structure

- Resource-based URLs: `GET/POST /api/resources`, `GET/PUT/PATCH/DELETE /api/resources/:id`
- Query params for filtering, sorting, pagination: `?status=active&limit=20&offset=0`
- Consistent response envelope: `{ success, data?, error?, meta? }`

### Response Envelope

```javascript
// Success
{ success: true, data: { ... }, meta?: { total, page, limit } }

// Error
{ success: false, error: "message" }
```

---

## Node.js Server Patterns

### Security Headers

Set on every response (e.g. in server.js):

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` (tune for your domains and scripts)
- `Strict-Transport-Security` in production

### Rate Limiting

- Per-IP (or per-user) limits; sliding or fixed window
- Return 429 with `Retry-After` when exceeded
- Prefer a single middleware/handler that runs before route logic

### Static vs Dynamic

- Static assets: `Cache-Control: public, max-age=604800, immutable` (or similar)
- HTML/API: `Cache-Control: no-store` or short cache as needed

### MIME Types

- Serve correct `Content-Type` per extension (html, css, js, json, images)
- Prefer a small map (e.g. `.html` → `text/html; charset=utf-8`) and default to `text/plain` for unknown

---

## Data Access & Business Logic

### Repository Pattern

- Encapsulate data access behind an interface: `findAll`, `findById`, `create`, `update`, `delete`
- Handlers call the repository; keep HTTP and business logic separate from storage details

### Service Layer

- Put business rules in a service; service uses repository(ies)
- Keep route handlers thin: validate input → call service → format response

### N+1 Prevention

- Prefer batch loads (e.g. load related entities by ID list) instead of one query per item in a loop

---

## Error Handling

- Validate at boundaries (query, body, headers); fail fast with clear messages
- Never expose stack traces or internal details to clients
- Use consistent status codes: 400 validation, 401/403 auth, 404 not found, 429 rate limit, 500 server error
- Log errors server-side with context (request id, path, user if any)

---

## Security Checklist (Backend)

- No hardcoded secrets; use environment variables and validate at startup
- All user input validated (length, type, allowlist)
- Parameterized queries / safe APIs only (no string-concatenated SQL)
- Rate limiting on all public endpoints
- Sensitive routes protected (auth/session as needed)

For full security review flow, use the **security-review** skill when adding auth, payments, or sensitive data.
