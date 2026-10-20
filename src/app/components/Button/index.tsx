import type { ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent text-sm font-medium tracking-[0.2px] no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus motion-reduce:transition-none disabled:cursor-wait disabled:opacity-60";

const variants = {
  primary: "bg-ink px-6 text-wall hover:bg-graphite hover:text-wall",
  secondary:
    "border-field-border bg-transparent px-6 text-ink hover:border-ink",
  ghost:
    "bg-transparent px-2 text-ink underline decoration-1 underline-offset-4",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: keyof typeof variants;
};

const Button = ({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`${base} ${variants[variant]} ${className}`}
    {...props}
  />
);

export default Button;
