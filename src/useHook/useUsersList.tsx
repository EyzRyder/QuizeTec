import { useEffect } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../lib/firebaseConfig"
import { QuizType } from "../lib/type"
import { useUserStore } from "../lib/store"

const useUsersList = () => {
  const { updateUsersList } = useUserStore();
  useEffect(() => {
    const col = collection(db, 'users')
    const q = query(col)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: any[] = []
      querySnapshot.forEach((doc) => {
        itemsArr.push(
          {
            id:doc.data().id,
            email:doc.data().email,
          }
        )
      })
      // console.log(itemsArr)
      updateUsersList(itemsArr)
      // console.log(quizes)
      // setData(itemsArr)
      return () => unsubscribe()
    })
  }, [])
  return
}

export default useUsersList