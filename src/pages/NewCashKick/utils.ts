import { SELECTED_CASHKICKS_STORAGE_KEY } from '@/utils/constant';

const getSavedSelection = (): string[] => {
  try {
    const saved = sessionStorage.getItem(SELECTED_CASHKICKS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveSelection = (rows: string[]): void => {
  try {
    sessionStorage.setItem(SELECTED_CASHKICKS_STORAGE_KEY, JSON.stringify(rows));
  } catch {
    // sessionStorage unavailable (private browsing, quota) — fail silently, in-memory state still works
  }
};

const clearSelection = (): void => {
  try {
    sessionStorage.removeItem(SELECTED_CASHKICKS_STORAGE_KEY);
  } catch {
    // no-op
  }
};

export { getSavedSelection, saveSelection, clearSelection };
