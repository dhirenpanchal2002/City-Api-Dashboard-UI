import type { SortableKey } from "./SortableKey";

export interface SortConfig {
  key: SortableKey | null;
  direction: "asc" | "desc";
}