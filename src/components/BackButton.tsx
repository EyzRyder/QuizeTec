import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function BackButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      className={cn("absolute left-10 top-3 h-12 w-12", className)}
      variant="outline"
      {...props}
    >
      <ChevronLeft className="text-blue-600 " />
    </Button>
  );
}
