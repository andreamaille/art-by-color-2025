import type { ComponentPropsWithoutRef } from "react";
import { buttonClass, type buttonVariants } from "./styles";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: keyof typeof buttonVariants;
};

const Button = ({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => (
  <button type={type} className={buttonClass(variant, className)} {...props} />
);

export default Button;
