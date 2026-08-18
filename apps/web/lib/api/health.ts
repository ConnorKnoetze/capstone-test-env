import type { ApiHealthResponse } from "@roster/types";

import { fetchFromApi } from "./client";

export function getHealth() {
  return fetchFromApi<ApiHealthResponse>("/health");
}
