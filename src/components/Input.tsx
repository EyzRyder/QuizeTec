import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import {} from "lucide-react";
import { ElementType, InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: ElementType;
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

export default function InputTxt({
  icon: Icon,
  sise,
  variant,
  type,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn(inputVariants({ variant, sise, className }))}>
      {Icon && <Icon />}
      <input
        className="w-full bg-transparent text-slate-800 border-0 outline-0 ring-0 file:border-0 file:bg-transparent placeholder:text-slate-400 active:bg-transparent focus:bg-transparent "
        {...props}
      />
    </div>
  );
}
