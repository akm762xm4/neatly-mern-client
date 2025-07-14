import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, id, error, type, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="relative w-full">
        <div
          className={cn(
            "relative border rounded-md transition-all duration-200",
            error
              ? "border-red-500"
              : "border-light-border dark:border-dark-border",
            "bg-light-bg dark:bg-dark-bg focus-within:ring-2 focus-within:ring-accent dark:focus-within:ring-dark-accent"
          )}
        >
          {label && (
            <label
              htmlFor={id}
              className="absolute left-10 top-2 text-sm text-muted dark:text-dark-muted transition-all duration-200 
                peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent dark:peer-focus:text-dark-accent"
            >
              {label}
            </label>
          )}
          <input
            id={id}
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            {...props}
            className={cn(
              "peer w-full p-2 text-sm rounded-md bg-transparent text-light-text dark:text-dark-text focus:placeholder-transparent focus:outline-none",
              className
            )}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent dark:text-dark-muted"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
