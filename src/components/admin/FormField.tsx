import type { ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  errors,
  children,
}: {
  label: string;
  htmlFor: string;
  errors?: string[];
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink/80">
        {label}
      </label>
      {children}
      {errors?.map((error) => (
        <p key={error} className="text-xs text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}

// text-base below sm: iOS Safari zooms the page on focus for inputs under 16px.
export const inputClass =
  "rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-base text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink/35 hover:border-ink/25 focus:border-ink/50 focus:shadow-[0_0_0_4px_rgb(26_26_26/0.06)] focus-visible:outline-none sm:text-sm";
