import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary:
        "bg-accent text-white hover:bg-blue-700 dark:bg-dark-accent dark:hover:bg-sky-600",
      secondary:
        "bg-light-muted text-light-text hover:bg-light-border dark:bg-dark-muted dark:text-dark-text dark:hover:bg-dark-border",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
      <button
        ref={ref}
        className={clsx(
          "px-4 py-2 text-sm font-medium rounded-md transition disabled:opacity-50",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
