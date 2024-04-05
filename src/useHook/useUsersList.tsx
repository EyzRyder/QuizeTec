import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

const useUsersList = () => {
  const [usersList, setUserList] = useState<any[] | []>([]);
  useEffect(() => {
    const col = collection(db, "users");
    const q = query(col);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: any[] = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({
          id: doc.data().id,
          email: doc.data().email,
          userName: doc.data().userName,
        });
      });
      // console.log(itemsArr)
      setUserList(itemsArr);
      // console.log(quizes)
      // setData(itemsArr)
      return () => unsubscribe();
    });
  }, []);
  return usersList;
};

export default useUsersList;
