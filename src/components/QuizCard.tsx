import { Play } from "lucide-react";
import { useNavigate } from "react-router";
import { QuizType } from "../lib/type";
interface QuizCardProps {
  quiz: QuizType;
}
export default function QuizCard({ quiz }: QuizCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col mb-6 max-w-[460px] w-full  bg-blue-50 p-6 rounded-3xl border-2 border-slate-100"
      onClick={() => navigate(`../quiz/menu/${quiz.id}`)}
    >
      <div className="flex justify-between">
        <div className="bg-blue-200 h-12 w-12 rounded-full grid place-content-center">
          <Play className="text-blue-400 h-[24px] w-[24px] fill-blue-400" />
        </div>

        <p className="text-blue-400">Série {quiz.level}</p>
      </div>
      <div>
        <p className="text-blue-800 font-extrabold text-xl">
          {quiz.title.length > 80
            ? quiz.title.slice(0, 77) + "..."
            : quiz.title}
        </p>
        <p className="text-blue-800">
          Crado por:{" "}
          <span className="font-extrabold">
            Professor(a) {quiz.createdByName && quiz.createdByName}
          </span>
        </p>
      </div>
    </div>
  );
}
