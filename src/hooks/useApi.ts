import { useState, useEffect, useCallback, DependencyList } from 'react';
import axios from 'axios';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic hook for fetching data from any API function.
 * Automatically cancels the in-flight request if the component unmounts
 * or `deps` change before the response arrives (e.g. fast page/tab switching).
 *
 * @param apiFn   A function that takes an AbortSignal and returns a Promise
 *                (e.g. (signal) => paymentsApi.getAll(1, 10, undefined, { signal }))
 * @param deps    Dependency array - refetches whenever these change (e.g. [page, status])
 *
 * Usage:
 *   const { data: funding, loading, error } = useApi(
 *     (signal) => fundingApi.get({ signal }),
 *     []
 *   );
 *
 *   const { data: payments, loading, error, refetch } = useApi(
 *     (signal) => paymentsApi.getAll(page, 10, undefined, { signal }),
 *     [page]
 *   );
 */
export function useApi<T>(apiFn: (signal: AbortSignal) => Promise<T>, deps: DependencyList = []) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    apiFn(controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        // Request was aborted (unmount / deps changed) - not a real error, ignore it
        if (axios.isCancel(err) || err?.code === 'ERR_CANCELED') return;

        setState({
          data: null,
          loading: false,
          error: err?.response?.data?.message ?? err?.message ?? 'Something went wrong',
        });
      });

    // Cleanup: abort the request if this effect re-runs or the component unmounts
    return () => controller.abort();
  }, [...deps, reloadIndex]);

  const refetch = useCallback(() => setReloadIndex((i) => i + 1), []);

  return { ...state, refetch };
}
