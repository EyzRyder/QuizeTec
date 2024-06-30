import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { useQuizeAnswersStore } from "../lib/store";
import { quizAnswers } from "../lib/type";

const useUserAnswersMenu = ({ id }: { id: string }) => {
  const [userAnswersMap, setUserAnswerMap] = useState<
    Map<
      { questionId: string; createdAt: Date },
      { answerId: string; isRight: number }
    >
  >(
    new Map<
      { questionId: string; createdAt: Date },
      { answerId: string; isRight: number }
    >(),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const unsubscribe = onSnapshot(
        query(collection(db, "UserAnswers"), where("QuizId", "==", id)),
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            return setUserAnswerMap((state) =>
              state.set(
                {
                  questionId: doc.data().QuestionId,
                  createdAt: doc.data().createdAt,
                },
                {
                  answerId: doc.data().id,
                  isRight: doc.data().isRight,
                },
              ),
            );
          });
          console.log(userAnswersMap);
          setIsLoading(false);
          return () => unsubscribe();
        },
      );
    } catch (err) {
      setError(err);
    }
  }, []);
  return { userAnswersMap, isLoading, error };
};

export default useUserAnswersMenu;
