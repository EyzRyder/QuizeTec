import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { QuizType } from "../lib/type";
import { useQuizStore } from "../lib/store";

const useQuizesList = () => {
  const { addQuizes } = useQuizStore();
  useEffect(() => {
    const col = collection(db, "Quizes");
    const q = query(col);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: QuizType[] = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({
          id: doc.data().id,
          title: doc.data().title,
          description: doc.data().description,
          level: doc.data().level,
          materia: doc.data().materia,
          Questions: doc.data().Questions,
          QuestionsID: doc.data().QuestionsID,
          createdBy: doc.data().createdBy,
          sharedWith: doc.data().sharedWith,
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate(),
        });
      });
      // console.log(itemsArr)
      addQuizes(itemsArr);
      // console.log(quizes)
      return () => unsubscribe();
    });
  }, []);
  return;
};

export default useQuizesList;
