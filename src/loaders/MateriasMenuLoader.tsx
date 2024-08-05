import { LoaderFunctionArgs } from "react-router";
import { QuizType } from "@/lib/type";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";

export type LoaderData = [string, QuizType][] | [];

export async function materiaLoader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const { materia } = params;
  const map = new Map<string, QuizType>();
  const userMap = new Map<string, string>();

  const quizQuerySnapshot = await getDocs(
    query(collection(db, "Quizes"), where("materia", "==", materia)),
  );

  if (quizQuerySnapshot.empty) return [];

  const userIdList: any = [];
  const quizData: QuizType[] = quizQuerySnapshot.docs.map(
    (doc: QueryDocumentSnapshot) => {
      userIdList.push(doc.data().createdBy);
      return {
        id: doc.data().id,
        title: doc.data().title,
        description: doc.data().description,
        level: doc.data().level,
        materia: doc.data().materia,
        Questions: [],
        QuestionsID: doc.data().QuestionsID,
        createdBy: doc.data().createdBy,
        createdByName: doc.data().createdBy,
        sharedWith: doc.data().sharedWith,
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      };
    },
  );

  const userQuery = query(
    collection(db, "users"),
    where("id", "in", userIdList),
  );
  const userQuerySnapshot = await getDocs(userQuery);
  userQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
    userMap.set(doc.data().id, doc.data().userName);
  });

  quizData.forEach((q) => {
    map.set(q.id, {
      ...q,
      createdByName: userMap.get(q.createdBy) || "",
    });
  });
  return Array.from(map.entries());
}
