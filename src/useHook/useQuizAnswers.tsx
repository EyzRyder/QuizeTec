import { useEffect } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "../lib/firebaseConfig"
import { useQuizeAnswersStore } from "../lib/store"
import { quizAnswers } from "../lib/type"

const useQuizAnswers = () => {
    const { addQuizeAnswers } = useQuizeAnswersStore();
    useEffect(() => {
        const col = collection(db, 'QuizAnswers')
        const q = query(col)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr: quizAnswers[] = []
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                return itemsArr.push({
                    quizId: doc.data().quizId,
                    title: doc.data().title,
                    usersAnswer: doc.data().usersAnswer
                })
            })
            // console.log(itemsArr)
            addQuizeAnswers(itemsArr)
            // console.log(quizes)
            // setData(itemsArr)
            return () => unsubscribe()
        })
    }, [])
    return
}

export default useQuizAnswers