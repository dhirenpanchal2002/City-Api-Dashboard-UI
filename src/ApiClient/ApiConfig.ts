import type { ApiSource } from "./ApiSource";

/** Mock API Configuration */
export const API_CONFIG: Record<ApiSource, { url: string; label: string }> = {
  Legacy: {
    url: 'http://localhost:3000/api/legacy/data',
    label: 'Legacy API',
  },
  New: {
    url: 'http://localhost:3001/api/new/data',
    label: 'New API',
  },
};
