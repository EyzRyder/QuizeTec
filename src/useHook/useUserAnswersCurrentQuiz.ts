import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { UsersAnswerType } from "@/lib/type";

interface UseUserAnswersCurrentQuizProps {
  userId: string;
  quizId: string;
}

const useUserAnswersCurrentQuiz = ({
  userId,
  quizId,
}: UseUserAnswersCurrentQuizProps) => {
  const [userAnswers, setUserAnswers] = useState<UsersAnswerType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    try {
      const fetchUserAnswers = () => {
        setLoading(true);

        const q = query(
          collection(db, "UserAnswers"),
          where("UserId", "==", userId),
          where("QuizId", "==", quizId),
        );

        const unsubscribeUserAnswers = onSnapshot(
          q,
          (querySnapshot) => {
            if (!querySnapshot.empty) {
              const doc = querySnapshot.docs[0];
              const data = doc.data();
              setUserAnswers({
                id: data.id,
                QuizId: data.QuizId,
                UserId: data.UserId,
                updatedAt: data.updatedAt?.toDate(),
                createdAt: data.createdAt?.toDate(),
                tries: data.tries,
              });
            } else {
              setUserAnswers(null);
            }
            setLoading(false);
          },
          (snapshotError) => {
            setError(snapshotError);
            setLoading(false);
          },
        );

        return unsubscribeUserAnswers;
      };

      const unsubscribe = fetchUserAnswers();

      return () => {
        unsubscribe();
      };
    } catch (err) {
      setError(err);
    }
  }, [userId, quizId]);

  return { userAnswers, loading, error };
};

export default useUserAnswersCurrentQuiz;
