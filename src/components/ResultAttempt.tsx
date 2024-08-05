import { AnswersType, Attempt, QuestionType } from "@/lib/type";
import ProgressBar from "./Progress";

export default function ResultAttempt({
  correctAnswers,
  index,
  item,
  questionMap,
  answerMap,
}: {
  correctAnswers: number;
  index: number;
  item: Attempt;
  questionMap: Map<string, QuestionType | null>;
  answerMap: Map<string, AnswersType | null>;
}) {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-blue-800">
        Tentativa: <span className="font-extrabold">{index + 1}</span>
      </p>
      <p className="text-blue-800">
        Respondido em:{" "}
        <span className="font-extrabold">
          {item.createdAt && item.createdAt.toDateString()}
        </span>
      </p>
      <ProgressBar count={correctAnswers} total={item.answers.length} />
      {item.answers.map((q, idx) => (
        <div key={q.id} className="flex flex-col">
          <span className="text-slate-800">
            {idx + 1}. {questionMap.get(q.QuestionId)?.title}
          </span>
          <span
            data-isright={q.isRight}
            className={`border-2 p-3 font-extrabold rounded-xl ${
              q.isRight
                ? "text-green-500 bg-green-500/10 border-green-500"
                : "text-red-400 bg-red-400/10 border-red-400"
            }`}
          >
            {answerMap.get(q.AnswerId)?.title}
          </span>
        </div>
      ))}
    </div>
  );
}
