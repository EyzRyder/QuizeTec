import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { QuizType } from "../lib/type";
import { useQuizStore } from "../lib/store";

const useQuizesList = ({
  materia = null,
  id = null,
}: {
  materia?: string | null;
  id?: string | null;
}) => {
  const { addQuizes, setQuiz, quizesMap } = useQuizStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  let loadCount = 0;
  const usersList: Map<string, string> = new Map<string, string>();

  useEffect(() => {
    try {
      setLoading(true);
      const unsubscribeUser = onSnapshot(
        query(collection(db, "users")),
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const userId = doc.data().id;
            usersList.set(userId, doc.data().userName);
          });
        },
      );

      const col = collection(db, "Quizes");
      const q = materia
        ? query(col, where("materia", "==", materia))
        : id
          ? query(col, where("id", "==", id))
          : query(col);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let itemsArr: QuizType[] = [];

        querySnapshot.forEach((doc) => {
          const quiz: QuizType = {
            id: doc.data().id,
            title: doc.data().title,
            description: doc.data().description,
            level: doc.data().level,
            materia: doc.data().materia,
            Questions: doc.data().Questions,
            QuestionsID: doc.data().QuestionsID,
            createdBy: doc.data().createdBy,
            createdByName: usersList.get(doc.data().createdBy),
            sharedWith: doc.data().sharedWith,
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
          };
          itemsArr.push(quiz);
          setQuiz(quiz.id, quiz);
        });

        addQuizes(itemsArr);

        setError(null);
        loadCount++;
        if (loadCount > 1 || quizesMap.size > 0) {
          setLoading(false);
        }
        return () => {
          unsubscribeUser();
          unsubscribe();
        };
      });
    } catch (err) {
      console.error("Error fetching Quiz List: ", err);
      setError(err);
    }
  }, []);

  return { loading, error };
};

export default useQuizesList;
