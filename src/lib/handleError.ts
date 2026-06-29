import { AxiosError } from 'axios';

// ─── Unified error handler ────────────────────────────────────────────────────
// Keeps every hook & mutation DRY.  Replace the console.error with a toast
// library call (e.g. react-hot-toast) once you wire one up.
export function handleError(error: unknown): void {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message;

    console.error(`[API ${status}]`, message);

    // Example: show a toast notification
    // toast.error(message ?? 'Something went wrong');
    return;
  }

  if (error instanceof Error) {
    console.error('[Client Error]', error.message);
    return;
  }

  console.error('[Unknown Error]', error);
}
