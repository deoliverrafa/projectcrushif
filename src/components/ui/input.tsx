import * as React from "react";
import { cn } from "./../../lib/utils";

import { 
  EyeSlashSolid,
  EyeSolid,
  XCircleSolid
} from "@mynaui/icons-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", value, onChange, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);
    const [inputValue, setInputValue] = React.useState(value || "");
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

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
      setImagePreview(null);
      if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
        if (onChange) {
          onChange({
            target: { files: [file] },
          } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
      }
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className="relative w-full">
        {type === "file" ? (
          <>
            <div
              className="flex justify-center items-center mb-4 h-48 w-full border-2 border-dashed border-input rounded-md cursor-pointer"
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-muted-foreground">
                  Faça o upload aqui
                </div>
              )}
            </div>
            <input
              type="file"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
              {...props}
            />
          </>
        ) : (
          <>
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
                "flex h-10 md:h-9 w-full rounded-3xl border border-input bg-transparent font-poppins font-medium md:font-normal px-3 py-1 text-md md:text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              ref={ref}
              {...props}
            />
          </>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-2 text-sm text-muted-foreground"
          >
            {inputType === "password" ? (
              <EyeSolid className="h-5 w-5" />
            ) : (
              <EyeSlashSolid className="h-5 w-5" />
            )}
          </button>
        )}

        {inputValue && type !== "file" && type !== "password" && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute inset-y-0 right-0 px-2 text-sm text-muted-foreground"
          >
            <XCircleSolid className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
