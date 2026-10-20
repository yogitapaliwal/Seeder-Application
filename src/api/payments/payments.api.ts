import { AxiosRequestConfig } from 'axios';
import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { PaginatedResponse } from '@/api/types';
import { Payment, PaymentStatus } from '@/api/payments/payments.types';

export const paymentsApi = {
  getAll: (
    page = 1,
    perPage = 10,
    status?: PaymentStatus,
    config?: AxiosRequestConfig,
  ): Promise<PaginatedResponse<Payment>> =>
    http.get<PaginatedResponse<Payment>>(ENDPOINTS.payments, {
      ...config,
      params: {
        _page: page,
        _per_page: perPage,
        ...(status ? { status } : {}),
      },
    }),

  getById: (id: string, config?: AxiosRequestConfig): Promise<Payment> =>
    http.get<Payment>(`${ENDPOINTS.payments}/${id}`, config),

  create: (payload: Omit<Payment, 'id'>): Promise<Payment> =>
    http.post<Payment>(ENDPOINTS.payments, payload),

  update: (id: string, payload: Partial<Payment>): Promise<Payment> =>
    http.patch<Payment>(`${ENDPOINTS.payments}/${id}`, payload),

  remove: (id: string): Promise<void> => http.delete<void>(`${ENDPOINTS.payments}/${id}`),
};
