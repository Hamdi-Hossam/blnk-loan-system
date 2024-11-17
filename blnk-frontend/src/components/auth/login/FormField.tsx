import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormFieldProps } from "@/types/FormFieldProps";
import { Info } from "lucide-react";

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  register,
  errors,
  placeholder,
  type = "text",
}) => {
  // Determine input class based on error state
  const inputClass = errors[name]
    ? "border-red-500 dark:border-red-400 bg-input placeholder:text-gray-700 dark:placeholder:text-gray-200"
    : "bg-input placeholder:text-gray-700 dark:placeholder:text-gray-200";

  return (
    <div className={`${name}-field`}>
      <div className="flex items-center gap-2 mb-1">
        <label htmlFor={name} className="text-sm">
          {label}
        </label>
      </div>
      <Input
        id={name}
        {...register(name)} // Correctly spread the object returned by register(name)
        type={type}
        placeholder={placeholder}
        className={inputClass}
        aria-invalid={!!errors[name]} // Boolean for aria-invalid
        aria-describedby={`${name}-error`}
      />
      {errors[name]?.message && (
        <p
          id={`${name}-error`}
          className="mt-1 text-red-500 text-sm dark:text-red-400"
        >
          {errors[name].message as string} {/* Safely cast to string */}
        </p>
      )}
    </div>
  );
};

export default FormField;
