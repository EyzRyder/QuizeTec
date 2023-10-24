// Ionic React
import { IonContent } from "@ionic/react";

// Dependence
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";

// Hook
import useQuizAnswers from "../useHook/useQuizAnswers";

// Lib
import {
  useCurAnswersStore,
  useQuizStore,
  useQuizeAnswersStore,
  useUserStore,
} from "@/lib/store";
import { getBGLinearGradientByMateria } from "@/lib/data";

export default function Menu() {
  //react
  const navigate = useNavigate();
  const { id } = useParams();

  //hook
  useQuizAnswers();

  // store
  const { user } = useUserStore();
  const { resetAnswer, startQuiz } = useCurAnswersStore();
  const quiz = useQuizStore(
    (store) => store.quizes.filter((task) => task.id === id)[0]
  );
  const userPastAnswers = useQuizeAnswersStore(
    (store) =>
      store.quizeAnswers
        .filter((q) => q.quizId == quiz.id)[0]
        .usersAnswer.filter((u) => u.userId == user.uid)[0]?.pastAnswers
  );

  // listing how many answers got correct
  let answerindex = 0;
  type totalCorrectAnswerTYPE = {
    sum: number | string;
    index: number | string;
  };
  const totalCorrectAnswer: totalCorrectAnswerTYPE[] = userPastAnswers?.map(
    (item) => {
      let sum: boolean | number = false;
      item.questions?.map((data) => (sum = +sum + +data.isRight));
      answerindex++;
      return { sum: String(sum), index: String(answerindex) };
    }
  );
  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
        exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
      >
        <div className="flex flex-col flex-1 h-screen">
          <div
            className={`flex ${getBGLinearGradientByMateria(
              quiz.materia
            )} relative flex-row px-2 pt-20 pb-12 justify-center items-center rounded-b-3xl `}
          >
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="flex flex-col absolute top-10 left-6 h-10 w-10 items-center justify-center bg-white rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
              >
                <path d="M8 1L1.5 6.5L8 13" stroke="#4D8FFF" stroke-width="2" />
              </svg>
              {/* <Icon name="chevron-left" size={32} color={getBGColorByMateria(quiz.materia)} /> */}
            </div>
            <div className="flex flex-col justify-center items-center space-y-3">
              {/* <div className="flex flex-col h-32 w-32 bg-gray-500"></div> */}
              <p className="text-white text-xl font-title">{quiz.title}</p>
              <div className="flex flex-row space-x-2">
                <div className="flex flex-col rounded-[8px] mix-blend-soft-light bg-slate-700 py-1 px-4">
                  <p className="text-white font-body text-base">
                    {quiz.materia}
                  </p>
                </div>
                <div className="flex flex-col  rounded-[8px] mix-blend-soft-light bg-slate-700 py-1 px-4">
                  <p className="text-white font-body text-base">
                    Nível {quiz.level}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 px-5 pt-5 pb-9 gap-7 ">
            <div className="flex flex-col gap-4">
              <p className="text-[#888] font-body text-lg">Resultados</p>
              <div className="flex flex-row justify-center space-x-5">
                <div className="flex flex-col bg-white rounded-xl px-4 pt-4 pb-5 shadow">
                  <div className="flex flex-row justify-between items-center space-x-8">
                    <div className="flex flex-col h-9 w-9  rounded-full items-center justify-center">
                      <img
                        src="https://i.postimg.cc/fbBS2MXz/Crown.png"
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-center bg-[#7cfc0033] px-2 py-1 rounded">
                      {/* <Icon name="chevron-down" size={12} color={'#7CFC00'} /> */}
                      <p className="text-[#7CFC00] text-[10px]">
                        Pontuação Atual
                      </p>
                    </div>
                  </div>
                  {totalCorrectAnswer ? (
                    <p className="flex flex-col font-title text-xl text-[#2A416F] font-bold">
                      {userPastAnswers
                        ? totalCorrectAnswer[totalCorrectAnswer.length - 1].sum
                        : "0"}{" "}
                      / {quiz.Questions.length}
                    </p>
                  ) : (
                    <p className="flex flex-col font-title text-xl text-[#2A416F] font-bold">
                      0 / {quiz.Questions.length}
                    </p>
                  )}
                  <p className="text-[#888] font-body text-sm">
                    Total de acertos
                  </p>
                </div>
                {/* <div className="flex flex-col bg-white rounded-xl px-4 pt-4 pb-5 shadow">
                <div className="flex flex-row justify-between items-center space-x-8">
                <div className="flex flex-col h-9 w-9  rounded-full items-center justify-center">
                    <img src="https://i.postimg.cc/2STnJdNN/Clock.png" alt="" className="w-full h-full"/>
                  </div>
                  <div className="flex flex-row items-center justify-center bg-[#ffa2005d] px-2 py-1 rounded">
                    <p className="text-[#FFA200] text-[10px]">+3 min</p>
                  </div>
                </div>
                <p className="font-title text-xl text-[#2A416F] font-bold">
                  14 min
                </p>
                <p className="text-[#888] font-body text-sm">Total de temp</p>
              </div> */}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-[#888] font-body text-lg">
                Resultados Anteriores:{" "}
              </p>
              {userPastAnswers &&
                totalCorrectAnswer?.map((item) => (
                  <div
                    className="flex flex-col bg-white rounded-xl px-4 pt-4 pb-5 shadow"
                    key={item.index}
                  >
                    <div className="flex flex-row justify-between items-center space-x-8">
                      <div className="h-9 w-9 bg-slate-300 rounded-full"></div>
                      <div className="flex flex-row items-center justify-center bg-[#7cfc0033] px-2 py-1 rounded">
                        <p className="text-[#7CFC00] text-[10px]">+1</p>
                      </div>
                    </div>
                    <p className="font-title text-xl text-[#2A416F] font-bold">
                      {item.sum} / {quiz.Questions.length}{" "}
                    </p>
                    <p className="text-[#888] font-body text-sm">
                      Total de acertos
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="px-9 flex flex-col ">
            <div
              onClick={() => {
                resetAnswer();
                navigate(`/quiz/${id}`);
                startQuiz();
              }}
              className={
                "flex flex-col w-full rounded-2xl py-4 transition-all bg-blue-500 hover:bg-blue-400 cursor-pointer"
              }
            >
              <p className={`text-2xl font-body text-center text-white`}>
                Jogar
              </p>
            </div>
            <div onClick={() => navigate(-1)}>
              <p className="text-xl font-body text-center py-4 text-[#2A416F] cursor-pointer hover:underline">
                Voltar ao Menu
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
