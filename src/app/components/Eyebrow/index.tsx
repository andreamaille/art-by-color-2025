import type { ComponentPropsWithoutRef } from "react";

type EyebrowProps = ComponentPropsWithoutRef<"span"> & {
  as?: "span" | "label" | "dt";
  htmlFor?: string;
};

const Eyebrow = ({
  as: Tag = "span",
  className = "",
  ...props
}: EyebrowProps) => (
  <Tag
    className={`text-xs leading-[1.3] font-semibold tracking-[1.6px] text-graphite uppercase ${className}`}
    {...props}
  />
);

export default Eyebrow;
