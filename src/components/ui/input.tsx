import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-sm border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "w-full bg-transparent text-slate-800 border-0 outline-0 ring-0 file:border-0 file:bg-transparent placeholder:text-slate-400 active:bg-transparent focus:bg-transparent ",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

interface InputWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ElementType;
  children: React.ReactNode;
}

const inputVariants = cva("flex rounded-xl gap-2.5 group/input box-border ", {
  variants: {
    variant: {
      default:
        "bg-blue-50 text-blue-800 rounded-xl border-2 border-transparent  active:border-blue-600 hover:bg-blue-200  hover:border-blue-600",
    },
    sise: {
      default: "p-3.5",
    },
  },
  defaultVariants: {
    variant: "default",
    sise: "default",
  },
});

function InputWrapper({
  icon: Icon,
  sise,
  variant,
  children,
  className,
}: InputWrapperProps) {
  return (
    <div className={cn(inputVariants({ variant, sise, className }))}>
      {Icon && <Icon />}
      {children}
    </div>
  );
}

export { Input, InputWrapper };
