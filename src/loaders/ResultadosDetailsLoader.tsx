import { LoaderFunctionArgs } from "react-router";
import { db } from "@/lib/firebaseConfig";
import {
  AnswersType,
  QuestionType,
  UserAttemptResponse,
  UsersAnswerType,
} from "@/lib/type";
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  where,
} from "firebase/firestore";

export type LoaderData = {
  userAnswers: UsersAnswerType;
  questionMap: Map<string, QuestionType | null>;
  answerMap: Map<string, AnswersType | null>;
};

export async function resultDetailsLoader({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const { id, userId } = params;
  try {
    const userAnswersQuerySnapshot = await getDocs(
      query(
        collection(db, "UserAnswers"),
        where("QuizId", "==", id),
        where("UserId", "==", userId),
      ),
    );

    const userAnswersDoc = userAnswersQuerySnapshot.docs[0].data();
    const userAnswers: UsersAnswerType = {
      id: userAnswersDoc.id,
      QuizId: userAnswersDoc.QuizId,
      UserId: userAnswersDoc.UserId,
      updatedAt: userAnswersDoc?.updatedAt?.toDate(),
      createdAt: userAnswersDoc?.createdAt?.toDate(),
      tries: userAnswersDoc.tries.map(
        (attemp: { answers: UserAttemptResponse; createdAt: Timestamp }) => {
          return {
            answers: attemp.answers,
            createdAt: attemp.createdAt?.toDate(),
          };
        },
      ),
    };

    const questionMap = new Map<string, QuestionType | null>();
    const answerMap = new Map<string, AnswersType | null>();

    userAnswers.tries.forEach((attempt) => {
      attempt.answers.forEach((a) => {
        questionMap.set(a.QuestionId, null);
        answerMap.set(a.AnswerId, null);
      });
    });

    const questionQuerySnapshot = await getDocs(
      query(
        collection(db, "Questions"),
        where("id", "in", Array.from(questionMap.keys())),
      ),
    );

    questionQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
      questionMap.set(doc.id, {
        id: doc.id,
        title: doc.data().title,
        type: doc.data().type,
        AnswersId: doc.data().AnswersId,
        QuizId: doc.data().QuizId,
      });
    });

    const answerQuerySnapshot = await getDocs(
      query(collection(db, "Answers"), where("QuizId", "==", id)),
    );

    answerQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
      answerMap.set(doc.id, {
        id: doc.id,
        title: doc.data().title,
        questionType: doc.data().questionType,
        QuestionId: doc.data().QuestionId,
        QuizId: doc.data().QuizId,
        isRight: doc.data().isRight,
      });
    });

    return { userAnswers, questionMap, answerMap };
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}
