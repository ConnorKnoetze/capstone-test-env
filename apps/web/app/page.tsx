import { HealthStatus } from "@/components/roster/HealthStatus";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Roster Converter</p>
        <h1>Frontend development shell is running.</h1>
        <p className="lead">
          This Next.js app is wired to the FastAPI backend and ready for future
          spreadsheet-first roster workflows.
        </p>

        <div className="feature-row" aria-label="Setup highlights">
          <span>Next.js App Router</span>
          <span>TypeScript</span>
          <span>pnpm + Turbo</span>
          <span>FastAPI backend</span>
        </div>
      </section>

      <section className="status-grid">
        <article className="info-card">
          <h2>Backend connectivity</h2>
          <p>
            The browser makes a live request to <code>/health</code> so CORS and
            the API base URL are exercised during local development.
          </p>
          <HealthStatus />
        </article>

        <article className="info-card muted-card">
          <h2>Architecture placeholder</h2>
          <p>
            Deterministic spreadsheet parsing will eventually live in the
            frontend first. If that fails, the original file can later be sent to
            FastAPI for AI-assisted fallback processing.
          </p>
        </article>
      </section>
    </main>
  );
}
