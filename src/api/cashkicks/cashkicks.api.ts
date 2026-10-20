import { AxiosRequestConfig } from 'axios';
import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { PaginatedResponse } from '@/api/types';
import { MyCashKick, CashKickStatus } from '@/api/cashkicks/cashkicks.types';

export const cashKicksApi = {
  getAll: (
    page = 1,
    perPage = 10,
    status?: CashKickStatus,
    config?: AxiosRequestConfig,
  ): Promise<PaginatedResponse<MyCashKick>> =>
    http.get<PaginatedResponse<MyCashKick>>(ENDPOINTS.cashkicks, {
      ...config,
      params: {
        _page: page,
        _per_page: perPage,
        ...(status ? { status } : {}),
      },
    }),

  getById: (id: string, config?: AxiosRequestConfig): Promise<MyCashKick> =>
    http.get<MyCashKick>(`${ENDPOINTS.cashkicks}/${id}`, config),

  create: (payload: Omit<MyCashKick, 'id'>): Promise<MyCashKick> =>
    http.post<MyCashKick>(ENDPOINTS.cashkicks, payload),

  update: (id: string, payload: Partial<MyCashKick>): Promise<MyCashKick> =>
    http.patch<MyCashKick>(`${ENDPOINTS.cashkicks}/${id}`, payload),

  remove: (id: string): Promise<void> => http.delete<void>(`${ENDPOINTS.cashkicks}/${id}`),
};
