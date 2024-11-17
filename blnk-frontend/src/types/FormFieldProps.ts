import { UseFormRegister, FieldErrors } from "react-hook-form";

// Define your form data type
interface FormData {
  // Add your form fields here, for example:
  username: string;
  password: string;
  // Add other fields as necessary
}

export interface FormFieldProps {
  name: keyof FormData; // Use keyof to restrict to valid keys of FormData
  label: string;
  register: UseFormRegister<FormData>; // Use the specific form type
  errors: FieldErrors<FormData>; // Use the specific form type
  placeholder: string;
  type?: string;
}
