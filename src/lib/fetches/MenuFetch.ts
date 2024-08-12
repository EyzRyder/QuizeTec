import { QuizType, UsersAnswerType } from "@/lib/type";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export type LoaderData = {
  quizData: QuizType;
  userAnswers: UsersAnswerType | null;
} | null;

export async function fetchMenu({
  quizId,
  userId,
}: {
  quizId: string;
  userId: string;
}): Promise<LoaderData> {
  const quizQuery = query(collection(db, "Quizes"), where("id", "==", quizId));
  const quizQuerySnapshot = await getDocs(quizQuery);

  if (quizQuerySnapshot.empty) return null;

  const quizDoc = quizQuerySnapshot.docs[0].data();
  const quizData = {
    ...quizDoc,
    createdAt: quizDoc.createdAt?.toDate(),
    updatedAt: quizDoc.updatedAt?.toDate(),
  } as QuizType;

  const userQuerySnapshot = await getDocs(
    query(collection(db, "users"), where("id", "==", quizData.createdBy)),
  );

  if (!userQuerySnapshot.empty) {
    const userDoc = userQuerySnapshot.docs[0];
    quizData.createdByName = userDoc.data().userName;
  }

  const userAnswersQuerySnapshot = await getDocs(
    query(
      collection(db, "UserAnswers"),
      where("UserId", "==", userId),
      where("QuizId", "==", quizId),
    ),
  );

  let userAnswers: UsersAnswerType | null = null;

  if (!userAnswersQuerySnapshot.empty) {
    const data = userAnswersQuerySnapshot.docs[0].data();
    userAnswers = {
      id: data.id,
      QuizId: data.QuizId,
      UserId: data.UserId,
      updatedAt: data.updatedAt?.toDate(),
      createdAt: data.createdAt?.toDate(),
      tries: data.tries,
    };
  }

  return { quizData, userAnswers };
}
