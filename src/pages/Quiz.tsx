// Dependencies
import { useState } from "react";
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";

// Lib
import { AnswersType, UsersAnswerType } from "@/lib/type";
import { useCurAnswersStore, useUserStore } from "@/lib/store";
import {
  collection,
  doc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { LoaderData } from "@/loaders/QuizLoader";

//Components
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/Progress";

export default function Quiz() {
  const navigate = useNavigate();
  const questions = useLoaderData() as LoaderData;
  const { id, grade, materia } = useParams();

  const [selectedAnswer, setSelectedAnswer] = useState<AnswersType | null>(
    null,
  );

  const { user } = useUserStore(); // zustand
  const {
    addAnswer,
    curAnswers,
    curQuestionIndex,
    NextQuestion,
    resetAnswer,
    startQuiz,
  } = useCurAnswersStore();

  if (!id || !grade || !materia || questions.length === 0 || !user.uid)
    return <Navigate to={"/"} />;

  // Fuctions
  async function confirmeAnswer() {
    if (!selectedAnswer) return alert("Selecione uma resposta");
    if (!user.uid) return navigate("/");

    if (curQuestionIndex == questions.length - 1) {
      await updateAnswerHistory();
      navigate(-1);
      resetAnswer();
      startQuiz();
    } else {
      addAnswer({
        id: uuid().toString(),
        isRight: selectedAnswer.isRight,
        QuestionId: questions[curQuestionIndex]?.id,
        AnswerId: selectedAnswer.id,
      });
      NextQuestion();
    }
    setSelectedAnswer(null);
  }

  const updateAnswerHistory = async () => {
    if (!selectedAnswer || !user.uid) return navigate("/");

    const userPastAnswersQuery = await getDocs(
      query(
        collection(db, "UserAnswers"),
        where("QuizId", "==", id),
        where("UserId", "==", user.uid),
      ),
    );

    const currentDate = Timestamp.fromDate(new Date());
    const newAnswers = [
      ...curAnswers,
      {
        id: uuid().toString(),
        isRight: selectedAnswer.isRight,
        QuestionId: questions[curQuestionIndex]?.id,
        AnswerId: selectedAnswer.id,
      },
    ];

    if (userPastAnswersQuery.docs.length < 1) {
      const newId = uuid().toString();
      const userAnswer = {
        id: newId,
        QuizId: id,
        UserId: user.uid,
        createdAt: currentDate,
        tries: [{ createdAt: currentDate, answers: newAnswers }],
        updatedAt: currentDate,
      };

      await setDoc(doc(db, "UserAnswers", newId), userAnswer);
      return;
    }

    const userPastAnswers: UsersAnswerType = userPastAnswersQuery.docs.map(
      (doc: QueryDocumentSnapshot) => {
        return {
          id: doc.data().id,
          UserId: doc.data().UserId,
          QuizId: doc.data().QuizId,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
          tries: doc.data().tries,
        };
      },
    )[0];

    const newTries = [];

    let tries = userPastAnswers.tries;
    const length = tries.length <= 3 ? tries.length : 3;

    for (let i = 0; i < length; i++) {
      newTries.push(tries[i]);
    }
    newTries.push({ createdAt: currentDate, answers: newAnswers });

    await updateDoc(doc(db, "UserAnswers", userPastAnswers.id), {
      tries: newTries,
      updatedAt: currentDate,
    });
  };

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
            <ProgressBar
              count={curQuestionIndex + 1}
              total={questions?.length}
            />
          </div>
          <div className="w-full">
            <p className="text-blue-400 text-xl font-normal text-left w-full">
              {materia} - Série {grade}
            </p>
            <p className="text-mainTitle font-title  text-left w-full">
              {questions[curQuestionIndex].title}
            </p>
          </div>
        </header>
        <div className="flex-1 w-full items-center flex flex-col gap-3">
          {questions[curQuestionIndex].Answers?.map((answer) => (
            <Button
              variant="outline"
              key={`${answer.id}`}
              className={`flex w-full max-w-[608px] ${
                answer.id == selectedAnswer?.id
                  ? "outline-blue-600 text-blue-600"
                  : "outline-slate-300 text-slate-800"
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
