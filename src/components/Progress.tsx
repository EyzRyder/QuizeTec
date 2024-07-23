import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  total: number;
}

export default function ProgressBar({
  count,
  total,
  className,
}: ProgressProps) {
  return (
    <div
      className={cn(
        "flex flex-col relative  rounded-full px-4 pt-4 pb-5",
        className,
      )}
    >
      <p className="font-title text-xl text-blue-50 text-center font-bold absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {count} / {total}{" "}
      </p>
      <Progress
        value={(count / total) * 100}
        className="w-full bg-slate-300 h-7 border border-blue-50 "
      />
    </div>
  );
}
