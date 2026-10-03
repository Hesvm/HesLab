export const TOAST_EVENT = "app-toast";

/**
 * Show a short bottom-of-screen toast notification.
 */
export function toast(message: string): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
  }
}
