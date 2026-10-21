const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border text-sm font-medium tracking-[0.2px] no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus motion-reduce:transition-none disabled:cursor-wait disabled:opacity-60";

export const buttonVariants = {
  primary:
    "border-transparent bg-ink px-6 text-wall hover:bg-graphite hover:text-wall",
  feature:
    "border-transparent bg-feature px-6 text-on-feature hover:opacity-85",
  secondary:
    "border-field-border bg-transparent px-6 text-ink hover:border-ink",
  ghost:
    "border-transparent bg-transparent px-2 text-ink underline decoration-1 underline-offset-4",
};

export const buttonClass = (
  variant: keyof typeof buttonVariants = "primary",
  extra = "",
) => `${base} ${buttonVariants[variant]} ${extra}`;
