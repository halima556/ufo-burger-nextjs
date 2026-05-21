import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ label, id, ...props }, ref) {
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} id={id} {...props} />
      </>
    );
  }
);

export function TextareaField({ label, id, ...props }: TextareaFieldProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...props} />
    </>
  );
}

interface StatusMessageProps {
  message: string;
  type: "success" | "error" | "";
  id?: string;
}

export function StatusMessage({ message, type, id }: StatusMessageProps) {
  if (!message) return null;
  return (
    <p
      id={id}
      className={`form-status ${type === "error" ? "is-error" : "is-success"}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}
