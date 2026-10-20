import type { ComponentPropsWithoutRef } from "react";

const FilterChip = ({
  className = "",
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button">) => (
  <button
    type={type}
    className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-field-border bg-transparent px-4 text-sm font-medium text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-wall focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus ${className}`}
    {...props}
  />
);

export default FilterChip;
