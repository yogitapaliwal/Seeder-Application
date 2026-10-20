import { act, renderHook, waitFor } from '@testing-library/react';
import { useApi } from '@/hooks/useApi';

describe('useApi', () => {
  it('starts in a loading state and resolves with data', async () => {
    const apiFn = jest.fn().mockResolvedValue({ value: 42 });
    const { result } = renderHook(() => useApi(apiFn, []));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual({ value: 42 });
    expect(result.current.error).toBeNull();
  });

  it('sets an error message when the request rejects', async () => {
    const apiFn = jest.fn().mockRejectedValue(new Error('Network down'));
    const { result } = renderHook(() => useApi(apiFn, []));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Network down');
  });

  it('falls back to a generic error message when none is provided', async () => {
    const apiFn = jest.fn().mockRejectedValue({});
    const { result } = renderHook(() => useApi(apiFn, []));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Something went wrong');
  });

  it('ignores a cancelled/aborted request instead of setting an error', async () => {
    const apiFn = jest.fn().mockRejectedValue({ code: 'ERR_CANCELED' });
    const { result } = renderHook(() => useApi(apiFn, []));

    await waitFor(() => expect(apiFn).toHaveBeenCalled());
    // give the rejected promise a tick to settle
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  it('aborts the in-flight request when the component unmounts', () => {
    const apiFn = jest.fn(
      (signal: AbortSignal) =>
        new Promise(() => {
          signal.addEventListener('abort', () => {});
        }),
    );
    const { unmount } = renderHook(() => useApi(apiFn, []));

    const signal = apiFn.mock.calls[0][0] as AbortSignal;
    expect(signal.aborted).toBe(false);

    unmount();

    expect(signal.aborted).toBe(true);
  });

  it('refetches when refetch() is called', async () => {
    const apiFn = jest.fn().mockResolvedValue('first');
    const { result } = renderHook(() => useApi(apiFn, []));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(apiFn).toHaveBeenCalledTimes(1);

    apiFn.mockResolvedValue('second');
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.data).toBe('second'));
    expect(apiFn).toHaveBeenCalledTimes(2);
  });

  it('defaults deps to an empty array when omitted', async () => {
    const apiFn = jest.fn().mockResolvedValue('data');
    const { result } = renderHook(() => useApi(apiFn));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBe('data');
  });

  it('refetches when a dependency changes', async () => {
    const apiFn = jest.fn().mockResolvedValue('data');
    const { rerender } = renderHook(({ page }) => useApi(apiFn, [page]), {
      initialProps: { page: 1 },
    });

    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1));

    rerender({ page: 2 });

    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(2));
  });
});
