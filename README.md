# team-15-project
COMPSCI 399 project repository for Team 15 - SOS

# Roster Converter

Roster Converter is a local-development monorepo for a future roster processing product. It contains a Next.js frontend and a FastAPI backend, wired together for local development with pnpm, Turborepo, and uv.

The initial goal of this repository is to provide a clean working foundation, not to implement roster extraction, AI fallback logic, authentication, or persistence yet.

## Repository Structure

```text
roster-converter/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # FastAPI backend
├── packages/
│   └── types/       # Shared TypeScript types
├── docs/
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## Prerequisites

- Node.js and pnpm
- Python 3.12 or newer
- uv

## Install Dependencies

Install the JavaScript workspace dependencies from the repository root:

```bash
pnpm install
```

`pnpm install` also bootstraps the Python backend by syncing `apps/api` through the root postinstall hook.

If you need to resync the backend manually, run:

```bash
pnpm sync:api
```

## Start Development

Start both services from the repository root:

```bash
pnpm dev
```

Turbo will run the frontend and backend development commands in parallel.

## URLs

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)
- FastAPI docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## How the Pieces Fit Together

- The frontend lives in `apps/web` and uses the App Router.
- The backend lives in `apps/api` and exposes a thin FastAPI surface.
- Shared TypeScript types live in `packages/types` so the frontend can reuse response and domain shapes later.
- The frontend reads the backend base URL from `NEXT_PUBLIC_API_URL`.
- FastAPI CORS is centralized in the backend config so the allowed origins can be changed later without touching route handlers.
- Deterministic spreadsheet processing is intentionally left for the frontend in a future iteration; if that fails, the original file can later be handed off to the backend for AI-assisted fallback processing.

## Environment Variables

Copy `.env.example` to the appropriate local files when needed.

- `NEXT_PUBLIC_API_URL`: Base URL for the FastAPI backend used by the frontend.
- `API_CORS_ORIGINS`: Comma-separated list of allowed frontend origins for FastAPI CORS.

## Notes

- Do not commit secrets.
- The backend development server runs with hot reload.
- The initial homepage is only a connectivity check and setup indicator.
