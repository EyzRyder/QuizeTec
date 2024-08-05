import { LoaderFunctionArgs } from "react-router";
import { UsersAnswerType, UserType } from "@/lib/type";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";

export type UsersAnswerDetailedType = UsersAnswerType & {
  email?: string;
  name?: string;
};

export type LoaderData = [string, UsersAnswerDetailedType][];

export async function resultadosLoader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const { id } = params;
  const userMap = new Map<string, UsersAnswerDetailedType>();

  const userAnswersQuerySnapshot = await getDocs(
    query(collection(db, "UserAnswers"), where("QuizId", "==", id)),
  );

  userAnswersQuerySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data();

    userMap.set(data.UserId, {
      id: doc.data().id,
      QuizId: data.QuizId,
      UserId: data.UserId,
      updatedAt: data.updatedAt?.toDate(),
      createdAt: data.createdAt?.toDate(),
      tries: data.tries,
    });
  });

  const userArray = Array.from(userMap.keys());
  const loopUserCount = Math.round(userArray.length / 25) + 1;

  for (let i = 0; i < loopUserCount; i++) {
    const tempCount = i * 25;
    const userSlice = userArray.slice(tempCount, tempCount + 25);
    const usersQuerySnapshot = await getDocs(
      query(collection(db, "users"), where("id", "in", userSlice)),
    );

    usersQuerySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
      const userData = doc.data() as UserType;
      const restOfMap = userMap.get(userData.id);
      if (restOfMap) {
        userMap.set(userData.id, {
          ...restOfMap,
          email: userData.email,
          name: userData.userName,
        });
      }
    });
  }
  return Array.from(userMap.entries());
}
