import * as React from "react";

import { cn } from "./../../lib/utils";

import { EyeOff, Eye, X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", value, onChange, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);
    const [inputValue, setInputValue] = React.useState(value || "");

    React.useEffect(() => {
      setInputValue(value || "");
    }, [value]);

    const togglePasswordVisibility = () => {
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password"
      );
    };

    const clearInput = () => {
      setInputValue("");
      if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (onChange) {
              onChange(e);
            }
          }}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent font-poppins font-medium px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" ? (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-2 text-sm text-muted-foreground"
          >
            {inputType === "password" ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
        ) : (
          inputValue && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute inset-y-0 right-0 px-2 text-sm text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
