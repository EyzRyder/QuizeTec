import { Progress } from "./ui/progress";

export default function ProgressBar({
  count,
  total,
}: {
  count: number;
  total: number;
}) {
  return (
    <div className="flex flex-col bg-blue-100 relative  rounded-full px-4 pt-4 pb-5">
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
