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
          level: doc.data().level,
          materia: doc.data().materia,
          Questions: doc.data().Questions,
          createdBy: doc.data().createdBy,
        });
      });
      // console.log(itemsArr)
      addQuizes(itemsArr);
      // console.log(quizes)
      // setData(itemsArr)
      return () => unsubscribe();
    });
  }, []);
  return;
};

export default useQuizesList;
