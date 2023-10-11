// Ionic React
import { useState } from "react";

// Dependencies
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

// Hook
import useQuizAnswers from "../useHook/useQuizAnswers";

// Lib
import { AnswersType } from "../lib/type";
import { useCurAnswersStore, useQuizStore, useQuizeAnswersStore, useUserStore } from "../lib/store";

// DB
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export default function Quiz() {
  // react hooks
  useQuizAnswers();
  //react
  const navigate = useNavigate();
  const { id, questionIndex } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedAnswer, setSelectedAnswer] = useState<AnswersType | null>(null);


  // Store
  const { user } = useUserStore(); // zustand
  // const { user } = useUserStorage();// local storage
  const { addAnswer, curAnswers } = useCurAnswersStore();
  const quiz = useQuizStore(
    (store) => store.quizes.filter((task) => task.id === id)[0]
  );



  const CurQuestion = quiz.Questions[Number(questionIndex)];
  const userPastAnswers = useQuizeAnswersStore((store) => store.quizeAnswers.filter(q => q.quizId == quiz.id)[0].usersAnswer);

  function confirmeAnswer() {
    if (!selectedAnswer) return alert("Selecione uma resposta")
    const length = quiz.Questions.length - 1;
    if (!selectedAnswer) return
    addAnswer({
      id: selectedAnswer.id,
      letra: selectedAnswer.letra,
      isRight: selectedAnswer.isRight,
      title: selectedAnswer.title,
      question: CurQuestion.title,
      questionId: CurQuestion.id
    })

    if (Number(questionIndex) == length) {
      if (!user?.uid) return navigate(-(length + 1))
      updateAnswerHistory();
      navigate(-(length + 1))
    } else {
      // questionIndex = String(Number(questionIndex) + 1)
      // const queryParamValue = searchParams;
      // console.log(queryParamValue)
      // setSearchParams({ queryParamValue:String(Number(questionIndex) + 1)})

      navigate(`/quiz/${id}/${String(Number(questionIndex) + 1)}`)
    }
    setSelectedAnswer(null)
  }

  async function updateAnswerHistory() {
    const col = await doc(db, 'QuizAnswers', quiz.id)
    let answer = userPastAnswers;
    if (!selectedAnswer) return

    if (userPastAnswers.filter(u => u.userId == user?.uid).length == 0) {
      answer.push(
        {
          pastAnswers: [
            {
              questions: [...curAnswers, {
                id: selectedAnswer.id,
                letra: selectedAnswer.letra,
                isRight: selectedAnswer.isRight,
                title: selectedAnswer.title,
                question: CurQuestion.title,
                questionId: CurQuestion.id
              }]
            }
          ],
          userId: user.uid
        }
      )

      await updateDoc(col, {
        usersAnswer: answer
      });
      return
    }

    answer = userPastAnswers.filter(u => u.userId !== user?.uid)

    if (userPastAnswers.filter(u => u.userId == user?.uid)[0].pastAnswers.length == 4) {
      answer.push(
        {
          pastAnswers: [
            userPastAnswers.filter(u => u.userId == user?.uid)[0].pastAnswers[0],
            userPastAnswers.filter(u => u.userId == user?.uid)[0].pastAnswers[1],
            userPastAnswers.filter(u => u.userId == user?.uid)[0].pastAnswers[2],
            {
              questions: [...curAnswers, {
                id: selectedAnswer.id,
                letra: selectedAnswer.letra,
                isRight: selectedAnswer.isRight,
                title: selectedAnswer.title,
                question: CurQuestion.title,
                questionId: CurQuestion.id
              }]
            }
          ],
          userId: user?.uid
        }
      )
      await updateDoc(col, {
        usersAnswer: answer
      });
      return
    }

    answer.push(
      {
        pastAnswers: [
          ...userPastAnswers.filter(u => u.userId == user?.uid)[0].pastAnswers,
          {
            questions: [...curAnswers, {
              id: selectedAnswer.id,
              letra: selectedAnswer.letra,
              isRight: selectedAnswer.isRight,
              title: selectedAnswer.title,
              question: CurQuestion.title,
              questionId: CurQuestion.id
            }]
          }
        ],
        userId: user?.uid
      }
    )
    await updateDoc(col, {
      usersAnswer: answer
    });

  }
  return (
    <div>
      <div className="flex-1 flex flex-col pb-6 pt-10 px-5 items-center h-full">
        <div className="w-full h-10 bg-white shadow-md rounded-2xl mb-6"></div>
        <div className="w-full mb-8">
          <p className="text-[#00000099] text-xl font-normal text-left w-full">{quiz.materia} - {quiz.title}</p>
          <p className="text-mainTitle font-title text-2xl text-left w-full">{CurQuestion.title}</p>
        </div>
        <div className="flex-1 w-full space-y-2">
          {searchParams}
          {CurQuestion.answers.map((answer) => (
            <div
              key={`${answer.id}`}
              className={`flex flex-row rounded-xl shadow-md py-6 px-7 space-x-3 items-center w-full  ${answer.id == selectedAnswer?.id ? "bg-blue-500" : 'bg-none'} `}
              onClick={() => setSelectedAnswer(answer)}
            >

              <p className={`bg-blue-300 rounded-full w-6 h-6 text-center text-white`}>{answer?.letra}</p>
              <p className={`font-title text-lg  ${answer.id == selectedAnswer?.id ? "text-white" : 'text-black'} `}>{answer.title}</p>
            </div>
          ))}
        </div>
        <button
          onClick={confirmeAnswer}
          className={`py-4 mt-5 rounded-3xl w-60 flex flex-col items-center bg-blue-500`}
        >

          <p className="text-white text-2xl">
            Confirmar
          </p>
        </button>
      </div>
    </div>
  )
}
