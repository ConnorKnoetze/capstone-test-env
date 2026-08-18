# team-15-project

COMPSCI 399 project repository for Team 15 - SOS

# Roster Converter

Roster Converter is a local-development monorepo for a future roster processing product. It contains a Next.js frontend and FastAPI backend, wired together for local development with pnpm, Turborepo, and uv.

The initial goal of this repository is to provide a clean working foundation, not to implement roster extraction, AI fallback logic, authentication, or persistence yet.

## Repository Structure

```text
roster-converter/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # FastAPI backend
├── packages/
│   └── types/        # Shared TypeScript types
├── docs/
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## Prerequisites

The following software is required to run the project locally:

* Node.js 20 or newer
* pnpm
* Python 3.12 or newer
* uv

Installation instructions for Windows and Linux are provided below.

### Windows

#### Node.js

Install Node.js using [nvm-windows](https://github.com/coreybutler/nvm-windows). This is recommended because it allows developers to switch between Node.js versions.

After installing nvm-windows, open a new PowerShell or Command Prompt and run:

```powershell id="7n7d7x"
nvm install lts
nvm use lts
```

Verify the installation:

```powershell id="7q0m2w"
node --version
```

#### pnpm

Enable Corepack:

```powershell id="v3dyxg"
corepack enable
```

Verify the installation:

```powershell id="k0x6a8"
pnpm --version
```

If Corepack is unavailable, pnpm can instead be installed using:

```powershell id="j7e5de"
npm install --global pnpm
```

#### Python

Install Python 3.12 or newer from the [official Python website](https://www.python.org/downloads/).

During installation, make sure to enable:

```text
Add python.exe to PATH
```

Verify the installation in PowerShell:

```powershell id="u0b4m1"
python --version
```

The output should show Python 3.12 or newer.

#### uv

Install uv using PowerShell:

```powershell id="x8x0bz"
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Restart PowerShell after the installation and verify:

```powershell id="4o8jgc"
uv --version
```

If `uv` is not recognized, restart the terminal so that the updated PATH is loaded.

### Linux

#### Node.js

Install Node.js using [nvm](https://github.com/nvm-sh/nvm). This is recommended because it allows developers to easily switch between Node.js versions.

Run:

```bash id="r3ckq8"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Restart the terminal or reload the shell configuration:

```bash id="kq8z7e"
source ~/.bashrc
```

Install and use the latest Node.js LTS release:

```bash id="h2s3fk"
nvm install --lts
nvm use --lts
```

Verify the installation:

```bash id="z6x4gv"
node --version
```

#### pnpm

Enable Corepack:

```bash id="x1v7cx"
corepack enable
```

Verify the installation:

```bash id="8z1f2d"
pnpm --version
```

If Corepack is unavailable, pnpm can instead be installed using:

```bash id="f5q7yz"
npm install --global pnpm
```

#### Python

On Ubuntu/Debian:

```bash id="0k4c1a"
sudo apt update
sudo apt install python3 python3-venv
```

Verify the installation:

```bash id="1y8q7w"
python3 --version
```

The output should show Python 3.12 or newer.

#### uv

Install uv using the official installer:

```bash id="5x6f8j"
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Reload the shell:

```bash id="7b3m2n"
source ~/.bashrc
```

Verify the installation:

```bash id="0c8v4p"
uv --version
```

If `uv` is installed but the command cannot be found, add `~/.local/bin` to your PATH:

```bash id="3w9n5r"
export PATH="$HOME/.local/bin:$PATH"
```

To make this permanent:

```bash id="6h2j8k"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Install Dependencies

Clone the repository and navigate to the repository root:

```bash
git clone <repository-url>
cd team-15-project
```

Install the JavaScript workspace dependencies:

```bash
pnpm install
```

The `postinstall` hook automatically runs the backend setup using `uv` and creates/synchronizes the Python virtual environment in `apps/api/.venv`.

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


## Additional Changes

You will need to navigate to and create `apps/api/package.json` and add the paths for the venv based on your OS.

### Windows
```json

{
  "name": "@roster/api-dev",
  "private": true,
  "scripts": {
    "dev": ".\\.venv\\Scripts\\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000",
    "lint": ".\\.venv\\Scripts\\python.exe -m ruff check app tests"
  }
}

```

### Linux / Mac

```json
{
  "name": "@roster/api-dev",
  "private": true,
  "scripts": {
    "dev": ".venv/bin/python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000",
    "lint": ".venv/bin/python -m ruff check app tests"
  }
}
```

if linter fails please ensure the tests directory exists.

## URLs

* Frontend: http://localhost:3000
* Backend: http://localhost:8000
* FastAPI docs: http://localhost:8000/docs

## How the Pieces Fit Together

* The frontend lives in `apps/web` and uses the App Router.
* The backend lives in `apps/api` and exposes a thin FastAPI surface.
* Shared TypeScript types live in `packages/types` so the frontend can reuse response and domain shapes later.
* The frontend reads the backend base URL from `NEXT_PUBLIC_API_URL`.
* FastAPI CORS is centralized in the backend config so the allowed origins can be changed later without touching route handlers.
* Deterministic spreadsheet processing is intentionally left for the frontend in a future iteration; if that fails, the original file can later be handed off to the backend for AI-assisted fallback processing.

## Environment Variables

Copy `.env.example` to the appropriate local files when needed.

* `NEXT_PUBLIC_API_URL`: Base URL for the FastAPI backend used by the frontend.
* `API_CORS_ORIGINS`: Comma-separated list of allowed frontend origins for FastAPI CORS.

## Notes

* Do not commit secrets.
* The backend development server runs with hot reload.
* The Python virtual environment in `apps/api/.venv` is generated locally and should not be committed.
* The initial homepage is only a connectivity check and setup indicator.
* Run project commands from the repository root unless otherwise specified.
* The project uses `uv` to manage the backend Python environment and dependencies.
