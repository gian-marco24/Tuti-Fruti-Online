import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  registration?: UseFormRegisterReturn;
}

export const InputField = ({ error, registration, ...props }: InputFieldProps) => {
  return (
    <div>
      <input
        className="w-full bg-bg-light rounded-md px-4 py-3 text-text-default border-double"
        {...registration}
        {...props}
      />
      {error ? (
        <p className="text-error text-sm">{error.message}</p>
      ) : props.placeholder === "Contraseña" ? (
        <div className="text-sm text-text-muted mt-1">
          Debe tener al menos 6 caracteres
        </div>
      ) : null}
    </div>
  );
};