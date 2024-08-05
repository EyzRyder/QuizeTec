import { LoaderFunctionArgs } from "react-router";
import { AnswersType, QuestionType } from "@/lib/type";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";

export type LoaderData = QuestionType[] | [];

export async function quizLoader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const { id } = params;

  const quizQuestionsQuerySnapshot = await getDocs(
    query(collection(db, "Questions"), where("QuizId", "==", id)),
  );

  const quizAnswersQuerySnapshot = await getDocs(
    query(collection(db, "Answers"), where("QuizId", "==", id)),
  );

  if (quizQuestionsQuerySnapshot.empty || quizAnswersQuerySnapshot.empty)
    return [];

  const answerData: AnswersType[] = quizAnswersQuerySnapshot.docs.map(
    (doc: QueryDocumentSnapshot) => doc.data() as AnswersType,
  );

  const questionData: QuestionType[] = quizQuestionsQuerySnapshot.docs.map(
    (doc: QueryDocumentSnapshot) => {
      return {
        ...(doc.data() as QuestionType),
        Answers: answerData.filter((a) => a.QuestionId == doc.data().id),
      };
    },
  );

  return questionData;
}
