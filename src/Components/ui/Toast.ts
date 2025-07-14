import { toast } from "sonner";

type ToastOptions = {
  description?: string;
  duration?: number;
};

export const showToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      description: options?.description,
      duration: options?.duration || 3000,

      style: {
        background: "var(--toast-bg)",
        color: "var(--toast-text)",
        border: "1px solid var(--toast-border)",
      },
    }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, {
      description: options?.description,
      duration: options?.duration || 4000,

      style: {
        background: "var(--toast-bg)",
        color: "var(--toast-text)",
        border: "1px solid var(--toast-border)",
      },
    }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 3500,

      style: {
        background: "var(--toast-bg)",
        color: "var(--toast-text)",
        border: "1px solid var(--toast-border)",
      },
    }),

  info: (message: string, options?: ToastOptions) =>
    toast(message, {
      description: options?.description,
      duration: options?.duration || 3000,

      style: {
        background: "var(--toast-bg)",
        color: "var(--toast-text)",
        border: "1px solid var(--toast-border)",
      },
    }),
};
