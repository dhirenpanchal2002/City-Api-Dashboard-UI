import axios, { type AxiosInstance } from "axios";
import type { ApiSource } from "./ApiSource";
import { API_CONFIG } from "./ApiConfig";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const instanceCache: Record<ApiSource, AxiosInstance> = {} as any;

export const GetApiInstatnace = (source: ApiSource): AxiosInstance => {
  if (!instanceCache[source]) {
    instanceCache[source] = axios.create({
      baseURL: API_CONFIG[source].url,
    });
  }
  return instanceCache[source];
};
