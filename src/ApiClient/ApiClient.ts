import axios, { type AxiosInstance } from "axios";
import type { ApiSource } from "./ApiSource";
import { API_CONFIG } from "./ApiConfig";

const instanceCache: Record<ApiSource, AxiosInstance> = {} as unknown as Record<ApiSource, AxiosInstance>;

export const GetApiInstatnace = (source: ApiSource): AxiosInstance => {
  if (!instanceCache[source]) {
    instanceCache[source] = axios.create({
      baseURL: API_CONFIG[source].url,
    });
  }
  return instanceCache[source];
};
