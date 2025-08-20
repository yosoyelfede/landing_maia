"use client";

import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-[#0a1860] text-white hover:bg-blue-900",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-50",
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Button = ({ variant, size, className, ...props }) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export default Button; 