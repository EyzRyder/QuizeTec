import { LoaderFunctionArgs } from "react-router";
import { QuizType } from "@/lib/type";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export type LoaderData = QuizType | null;

export async function menuLoader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const { id } = params;

  const quizQuery = query(collection(db, "Quizes"), where("id", "==", id));
  const quizQuerySnapshot = await getDocs(quizQuery);

  if (quizQuerySnapshot.empty) return null;

  const quizDoc = quizQuerySnapshot.docs[0].data();
  const quizData = {
    ...quizDoc,
    createdAt: quizDoc.createdAt?.toDate(),
    updatedAt: quizDoc.updatedAt?.toDate(),
  } as QuizType;

  const userQuery = query(
    collection(db, "users"),
    where("id", "==", quizData.createdBy),
  );
  const userQuerySnapshot = await getDocs(userQuery);
  if (!userQuerySnapshot.empty) {
    const userDoc = userQuerySnapshot.docs[0];
    quizData.createdByName = userDoc.data().userName;
  }

  return quizData;
}
