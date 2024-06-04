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
import { Button } from "@/components/ui/button";

export default function Quiz() {
  // react hook
  useQuizAnswers();

  //react
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedAnswer, setSelectedAnswer] = useState<AnswersType | null>(
    null,
  );

  // Store
  const { user } = useUserStore(); // zustand
  const { addAnswer, curAnswers, curQuestionIndex, NextQuestion } =
    useCurAnswersStore();
  const quiz = useQuizStore(
    (store) => store.quizes.filter((task) => task.id === id)[0],
  );
  const userPastAnswers = useQuizeAnswersStore(
    (store) =>
      store.quizeAnswers.filter((q) => q.quizId == quiz.id)[0].usersAnswer,
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
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5 }}
      className=" min-h-screen  bg-blue-50 flex justify-center relative "
    >
      <div className="flex-1 flex flex-col max-w-5xl sm:pb-12 pb-28 gap-6  px-5 items-center transition-shadow ease-in-out duration-500 min-h-screen">
        <header className="bg-slate-50 pt-8 flex flex-col gap-8 px-6 pb-6 rounded-b-3xl w-full">
          <div className="w-full h-6 flex flex-col justify-center items-centerrounded-2xl mb-">
            <Progress
              value={(curQuestionIndex + 1 / quiz.Questions.length) * 100}
              className={`w-[97%] h-full  bg-slate-300`}
            />
          </div>
          <div className="w-full">
            <p className="text-blue-400 text-xl font-normal text-left w-full">
              {quiz.materia} - Série {quiz.level}
            </p>
            <p className="text-mainTitle font-title  text-left w-full">
              {CurQuestion.title}
            </p>
          </div>
        </header>
        <div className="flex-1 w-full items-center flex flex-col gap-3">
          {CurQuestion.answers.map((answer) => (
            <Button
              variant="outline"
              key={`${answer.id}`}
              className={`flex w-full max-w-[608px] ${
                answer.id == selectedAnswer?.id
                  ? "bg-blue-500 active:bg-blue-500 hover:bg-blue-400 text-slate-100 "
                  : "bg-none"
              } `}
              onClick={() => setSelectedAnswer(answer)}
            >
              {answer.title}
            </Button>
          ))}
        </div>
        <Button
          onClick={confirmeAnswer}
          className={"sm:w-80 w-full"}
          disabled={selectedAnswer == null}
        >
          <p className="text-white font-bold">Próximo</p>
        </Button>
      </div>
    </motion.div>
  );
}
