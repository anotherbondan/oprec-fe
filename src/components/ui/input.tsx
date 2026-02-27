import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: boolean;
  inputSize?: "sm" | "default" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, startIcon, endIcon, error, inputSize = "default", ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-8 text-xs py-1",
      default: "h-10 text-sm py-2",
      lg: "h-12 text-base py-3 px-4",
    };

    return (
      <div className="relative w-full">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none [&_svg]:size-4">
            {startIcon}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-3 ring-offset-background transition-all",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            sizeClasses[inputSize],
            startIcon ? "pl-9" : "",
            endIcon ? "pr-9" : "",
            error && "border-destructive focus-visible:ring-destructive/50 text-destructive placeholder:text-destructive/50",
            className
          )}
          ref={ref}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };