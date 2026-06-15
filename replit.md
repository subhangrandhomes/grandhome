# Grandhome Investments

A luxury real estate website where you can list and browse properties for sale or rent.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/grandhome run dev` — run the frontend (port 19947)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Cormorant Garamond + Montserrat fonts
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/properties.ts` — Properties DB schema
- `artifacts/api-server/src/routes/properties.ts` — Property CRUD routes
- `artifacts/grandhome/src/components/` — React components
  - `layout/` — Navbar, Footer
  - `sections/` — Hero, FeaturedListings, WhoWeAre, StatsBand, PropertySearch, CTAStrip
  - `properties/` — PropertyCard, ListPropertyModal
- `artifacts/grandhome/src/pages/Home.tsx` — Main page

## Architecture decisions

- Single-page scrolling site with anchor-based navigation
- Properties stored in PostgreSQL; photos stored as JSON-serialized base64 data URLs in a `text` column (no separate object storage needed for MVP)
- Featured listings endpoint returns 6 most recent; full listing endpoint supports filter params (beds, type, mode, maxPrice, search)
- Stats are computed live from the DB on each request (small dataset, no caching needed)

## Product

- Browse luxury property listings (House, Condo, Townhouse, Apartment)
- Filter by bedrooms, location, property type, and max price
- List a new property via modal (address, price, beds/baths/sqft, photos)
- Remove listings on hover
- Stats band shows live listing counts

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Photos are stored as base64 data URLs in the `photos` text column (JSON array string)
- Always serialize/deserialize `photos` column with `JSON.parse`/`JSON.stringify`
- The `price_value` column stores numeric value for filtering; display uses the `price` text field

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
