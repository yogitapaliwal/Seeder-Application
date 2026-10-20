import { AxiosRequestConfig } from 'axios';
import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { PaginatedResponse } from '@/api/types';
import { MyContract, ContractStatus, AutoSelectResponse } from '@/api/contracts/contracts.types';

export const contractsApi = {
  getAll: (
    page = 1,
    perPage = 10,
    status?: ContractStatus,
    config?: AxiosRequestConfig,
    selectedIds?: string[],
  ): Promise<PaginatedResponse<MyContract>> =>
    http.get<PaginatedResponse<MyContract>>(ENDPOINTS.contracts, {
      ...config,
      params: {
        _page: page,
        _per_page: perPage,
        ...(status ? { status } : {}),
        ...(selectedIds?.length ? { selectedIds: selectedIds.join(',') } : {}),
      },
    }),

  getById: (id: string, config?: AxiosRequestConfig): Promise<MyContract> =>
    http.get<MyContract>(`${ENDPOINTS.contracts}/${id}`, config),

  getByIds: (ids: string[], config?: AxiosRequestConfig): Promise<MyContract[]> =>
    Promise.all(ids.map((id) => http.get<MyContract>(`${ENDPOINTS.contracts}/${id}`, config))),

  autoSelect: (targetAmount: number, config?: AxiosRequestConfig): Promise<AutoSelectResponse> =>
    http.post<AutoSelectResponse>(`${ENDPOINTS.contracts}/auto-select`, { targetAmount }, config),

  create: (payload: Omit<MyContract, 'id'>): Promise<MyContract> =>
    http.post<MyContract>(ENDPOINTS.contracts, payload),

  update: (id: string, payload: Partial<MyContract>): Promise<MyContract> =>
    http.patch<MyContract>(`${ENDPOINTS.contracts}/${id}`, payload),

  remove: (id: string): Promise<void> => http.delete<void>(`${ENDPOINTS.contracts}/${id}`),
};
