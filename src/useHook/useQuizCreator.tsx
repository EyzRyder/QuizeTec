import { db } from "@/lib/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const useQuizCreator = (id: string) => {
  const [creator, setCreator] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsub = onSnapshot(
        query(collection(db, "users"), where("id", "==", id)),
        (querySnapshot) => {
          const res: any = [];
          querySnapshot.forEach((doc) => {
            res.push(doc.data());
          });

          //console.log(res);
          setCreator(res[0].userName || "sem Nome");
        },
      );
      return () => unsub();
    } catch (error) {
      console.error("Error getting Quiz Creator data: ", error);
    }
  }, []);
  return [creator];
};

export default useQuizCreator;
