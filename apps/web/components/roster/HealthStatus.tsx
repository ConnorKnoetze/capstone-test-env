"use client";

import { useEffect, useState } from "react";

import type { ApiHealthResponse } from "@roster/types";

import { getHealth } from "@/lib/api/health";

type HealthState =
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: ApiHealthResponse; error: null }
  | { status: "error"; data: null; error: string };

const initialState: HealthState = {
  status: "loading",
  data: null,
  error: null,
};

export function HealthStatus() {
  const [healthState, setHealthState] = useState<HealthState>(initialState);

  useEffect(() => {
    let active = true;

    async function loadHealth() {
      try {
        const response = await getHealth();

        if (active) {
          setHealthState({ status: "ready", data: response, error: null });
        }
      } catch (error) {
        if (active) {
          setHealthState({
            status: "error",
            data: null,
            error:
              error instanceof Error
                ? error.message
                : "Unable to reach the backend.",
          });
        }
      }
    }

    loadHealth();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="health-box" aria-live="polite">
      <span className="health-label">Health check</span>
      {healthState.status === "loading" ? (
        <span className="health-value">Checking FastAPI...</span>
      ) : null}
      {healthState.status === "ready" ? (
        <span className="health-value">Backend status: {healthState.data.status}</span>
      ) : null}
      {healthState.status === "error" ? (
        <span className="health-value health-error">{healthState.error}</span>
      ) : null}
    </div>
  );
}
