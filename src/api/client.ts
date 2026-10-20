import axios, { AxiosRequestConfig } from 'axios';

if (!process.env.REACT_APP_API_URL) {
  throw new Error('REACT_APP_API_URL is not set - check your .env file.');
}

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TEMP - FAKE DELAY FOR LOADER
apiClient.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(config), 1500);
  });
});

// Response interceptor - centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response?.data ?? error.message);
    return Promise.reject(
      error instanceof Error ? error : new Error(error?.message ?? String(error)),
    );
  },
);

/**
 * Generic request wrapper - unwraps `res.data` so resource files (payments.api.ts,
 * contracts.api.ts, etc.) don't each repeat `.then((res) => res.data)`.
 * Every method is generic over the response type <T>, so callers stay fully typed.
 */
export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T = void>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};
