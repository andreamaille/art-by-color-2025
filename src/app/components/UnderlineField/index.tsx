import type { ComponentPropsWithoutRef } from "react";
import Eyebrow from "@/app/components/Eyebrow";

type UnderlineFieldProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  label: string;
  mono?: boolean;
};

/** An eyebrow label and an input on one underlined row. */
const UnderlineField = ({
  id,
  label,
  mono = false,
  className = "",
  ...props
}: UnderlineFieldProps) => (
  <div className="flex min-h-11 items-center gap-2 border-b border-field-border focus-within:border-focus">
    <Eyebrow as="label" htmlFor={id} className="flex-none">
      {label}
    </Eyebrow>
    <input
      id={id}
      spellCheck={false}
      className={`min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-graphite ${
        mono ? "font-mono" : "font-sans"
      } ${className}`}
      {...props}
    />
  </div>
);

export default UnderlineField;
