import { LoaderFunctionArgs } from "react-router";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { AnswersType, QuestionType, QuizType } from "@/lib/type";
import { QuestionSchemaType } from "@/pages/AddQuiz";

export type LoaderData = {
  quiz: QuizType;
  questions: QuestionSchemaType[];
} | null;

export async function editQuizLoader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const { id } = params;

  if (!id) return null;

  const quizQuerySnapshot = await getDocs(
    query(collection(db, "Quizes"), where("id", "==", id)),
  );
  if (quizQuerySnapshot.empty) return null;

  const quizDoc = quizQuerySnapshot.docs[0].data();
  const quizData = {
    ...quizDoc,
    createdAt: quizDoc.createdAt?.toDate(),
    updatedAt: quizDoc.updatedAt?.toDate(),
  } as QuizType;

  const quizQuestionsQuerySnapshot = await getDocs(
    query(collection(db, "Questions"), where("QuizId", "==", id)),
  );

  const quizAnswersQuerySnapshot = await getDocs(
    query(collection(db, "Answers"), where("QuizId", "==", id)),
  );

  const questions: QuestionSchemaType[] = [];

  const answerData: AnswersType[] = quizAnswersQuerySnapshot.docs.map(
    (doc: QueryDocumentSnapshot) => doc.data() as AnswersType,
  );

  quizQuestionsQuerySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data() as QuestionType;

    const options: { id: string; label: string }[] = [];
    answerData.forEach((answer) => {
      if (answer.QuestionId == data.id)
        options.push({
          id: answer.id,
          label: answer.title,
        });
    });
    const isRight =
      answerData.find(
        (answer) =>
          (answer.isRight || answer.isRight >= 1) &&
          answer.QuestionId == data.id,
      )?.title || "";

    const parseData: QuestionSchemaType = {
      id: data.id,
      title: data.title,
      option: {
        radios: options,
        selectedRadio: isRight,
      },
    };
    //option:"alternativa"==data.type?:
    questions.push(parseData);
  });

  return {
    quiz: quizData,
    questions: questions,
  };
}
