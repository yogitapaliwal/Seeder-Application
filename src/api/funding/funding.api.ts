import { AxiosRequestConfig } from 'axios';
import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { Funding } from '@/api/funding/funding.types';

export const fundingApi = {
  get: (config?: AxiosRequestConfig): Promise<Funding> =>
    http.get<Funding>(ENDPOINTS.funding, config),

  update: (payload: Partial<Funding>): Promise<Funding> =>
    http.patch<Funding>(ENDPOINTS.funding, payload),
};
