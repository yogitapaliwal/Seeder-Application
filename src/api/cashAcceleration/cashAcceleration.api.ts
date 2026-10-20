import { AxiosRequestConfig } from 'axios';
import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { CashAcceleration } from '@/api/cashAcceleration/cashAcceleration.types';

export const cashAccelerationApi = {
  get: (config?: AxiosRequestConfig): Promise<CashAcceleration> =>
    http.get<CashAcceleration>(ENDPOINTS.cashAcceleration, config),
};
