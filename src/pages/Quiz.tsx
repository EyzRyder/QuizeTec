// Ionic React
import { useState } from "react";

// Dependencies
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";

// Hook
import useQuizAnswers from "../useHook/useQuizAnswers";

// Lib
import { AnswersType } from "../lib/type";
import {
  useCurAnswersStore,
  useQuizStore,
  useQuizeAnswersStore,
  useUserStore,
} from "../lib/store";

// DB
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { Progress } from "@/components/ui/progress";
import { getBGLinearGradientByMateria } from "@/lib/data";

export default function Quiz() {
  // react hook
  useQuizAnswers();

  //react
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedAnswer, setSelectedAnswer] = useState<AnswersType | null>(
    null
  );

  // Store
  const { user } = useUserStore(); // zustand
  const { addAnswer, curAnswers, curQuestionIndex, NextQuestion } =
    useCurAnswersStore();
  const quiz = useQuizStore(
    (store) => store.quizes.filter((task) => task.id === id)[0]
  );
  const userPastAnswers = useQuizeAnswersStore(
    (store) =>
      store.quizeAnswers.filter((q) => q.quizId == quiz.id)[0].usersAnswer
  );

  const CurQuestion = quiz.Questions[curQuestionIndex];

  // Factions
  function confirmeAnswer() {
    if (!selectedAnswer) return alert("Selecione uma resposta");
    const length = quiz.Questions.length - 1;
    if (!selectedAnswer) return;
    addAnswer({
      id: selectedAnswer.id,
      letra: selectedAnswer.letra,
      isRight: selectedAnswer.isRight,
      title: selectedAnswer.title,
      question: CurQuestion.title,
      questionId: CurQuestion.id,
    });

    if (curQuestionIndex == length) {
      if (!user?.uid) return navigate(-1);
      updateAnswerHistory();
      navigate(-1);
    } else {
      NextQuestion();
    }
    setSelectedAnswer(null);
  }

  async function updateAnswerHistory() {
    const col = doc(db, "QuizAnswers", quiz.id);
    let answer = userPastAnswers;
    if (!selectedAnswer) return;

    if (userPastAnswers.filter((u) => u.userId == user?.uid).length == 0) {
      answer.push({
        pastAnswers: [
          {
            questions: [
              ...curAnswers,
              {
                id: selectedAnswer.id,
                letra: selectedAnswer.letra,
                isRight: selectedAnswer.isRight,
                title: selectedAnswer.title,
                question: CurQuestion.title,
                questionId: CurQuestion.id,
              },
            ],
          },
        ],
        userId: user.uid,
      });

      await updateDoc(col, {
        usersAnswer: answer,
      });
      return;
    }

    answer = userPastAnswers.filter((u) => u.userId !== user?.uid);

    if (
      userPastAnswers.filter((u) => u.userId == user?.uid)[0].pastAnswers
        .length == 4
    ) {
      answer.push({
        pastAnswers: [
          userPastAnswers.filter((u) => u.userId == user?.uid)[0]
            .pastAnswers[0],
          userPastAnswers.filter((u) => u.userId == user?.uid)[0]
            .pastAnswers[1],
          userPastAnswers.filter((u) => u.userId == user?.uid)[0]
            .pastAnswers[2],
          {
            questions: [
              ...curAnswers,
              {
                id: selectedAnswer.id,
                letra: selectedAnswer.letra,
                isRight: selectedAnswer.isRight,
                title: selectedAnswer.title,
                question: CurQuestion.title,
                questionId: CurQuestion.id,
              },
            ],
          },
        ],
        userId: user?.uid,
      });
      await updateDoc(col, {
        usersAnswer: answer,
      });
      return;
    }

    answer.push({
      pastAnswers: [
        ...userPastAnswers.filter((u) => u.userId == user?.uid)[0].pastAnswers,
        {
          questions: [
            ...curAnswers,
            {
              id: selectedAnswer.id,
              letra: selectedAnswer.letra,
              isRight: selectedAnswer.isRight,
              title: selectedAnswer.title,
              question: CurQuestion.title,
              questionId: CurQuestion.id,
            },
          ],
        },
      ],
      userId: user?.uid,
    });
    await updateDoc(col, {
      usersAnswer: answer,
    });
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
      exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
    >
      <div className="flex-1 flex flex-col pb-6 pt-10 px-5 items-center transition-shadow ease-in-out duration-500 h-[100vh]">
        <div className="w-full h-10 flex flex-col justify-center items-center bg-white shadow-md rounded-2xl mb-6">
          <Progress
            value={(curQuestionIndex / (quiz.Questions.length - 1)) * 100}
            className={`w-[97%] `}
          />
        </div>
        <div className="w-full mb-8">
          <p className="text-[#00000099] text-xl font-normal text-left w-full">
            {quiz.materia} - {quiz.title}
          </p>
          <p className="text-mainTitle font-title text-2xl text-left w-full">
            {CurQuestion.title}
          </p>
        </div>
        <div className="flex-1 w-full space-y-2 flex flex-col gap-3">
          {CurQuestion.answers.map((answer) => (
            <div
              key={`${answer.id}`}
              className={`flex flex-row rounded-xl shadow-md py-7 px-7 space-x-3 items-center w-full  ${
                answer.id == selectedAnswer?.id
                  ? getBGLinearGradientByMateria(quiz.materia)
                  : "bg-none"
              } `}
              onClick={() => setSelectedAnswer(answer)}
            >
              <p
                className={` rounded-full w-6 h-6 text-center  ${
                  answer.id == selectedAnswer?.id
                    ? "bg-white text-slate-800"
                    : "bg-slate-400 text-white"
                }`}
              >
                {answer?.letra}
              </p>
              <p
                className={`font-title text-lg  ${
                  answer.id == selectedAnswer?.id ? "text-white" : "text-black"
                } `}
              >
                {answer.title}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={confirmeAnswer}
          className={`py-4 mt-5 rounded-3xl w-full flex flex-col items-center ${getBGLinearGradientByMateria(
            quiz.materia
          )}`}
        >
          <p className="text-white text-2xl">Confirmar</p>
        </button>
      </div>
    </motion.div>
  );
}
