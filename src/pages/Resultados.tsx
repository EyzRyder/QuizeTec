// Ionic React
import { IonContent } from "@ionic/react";

// Dependencies
import { useParams } from "react-router";

// Libs
import { useQuizeAnswersStore } from "../lib/store";
import { usersAnswerType } from "@/lib/type";

// Hooks
import useQuizAnswers from "../useHook/useQuizAnswers";
import useUsersList from "../useHook/useUsersList";

// Components
import BackButton from "@/components/BackButton";

import { Link } from "react-router-dom";
import ProgressBar from "@/components/Progress";

export default function Resultados() {
  const { id } = useParams();

  useQuizAnswers();
  const users = useUsersList();

  const quizAnswers = useQuizeAnswersStore(
    (store) => store.quizeAnswers.filter((q) => q.quizId == id)[0],
  );

  const countCorrectAnswers = (item: usersAnswerType) => {
    let sum: boolean | number = false;
    let questions = item?.pastAnswers[item?.pastAnswers.length - 1].questions;
    questions?.map((data: any) => (sum = +sum + +data.isRight));
    return <ProgressBar count={Number(sum)} total={questions.length} />;
  };

  return (
    <IonContent
      className="min-h-screen h-full bg-slate-50 flex justify-center"
      style={{ height: "100%" }}
    >
      <div className="h-full flex justify-center">
        <div className="max-w-5xl w-full h-full flex flex-col flex-1">
          <header
            className={`sm:flex sm:flex-row max-sm:grid max-sm:grid-cols-4 px-5 pt-8 pb-5 gap-6 justify-center items-center rounded-b-3xl `}
          >
            <BackButton className="relative top-auto left-auto" />
            <div className="flex flex-1 flex-col justify-center max-sm:col-span-3 ">
              <div className="flex flex-row">
                <p className="text-blue-400 font-body font-semibold text-base">
                  Resultados de usuários
                </p>
              </div>
              <p className="text-blue-800 text-xl font-extrabold">
                {quizAnswers?.title}
              </p>
            </div>
          </header>
          <div className="flex-1 w-full h-full py-4 space-y-6 flex flex-col items-center">
            <div className="flex justify-between max-w-[380px] w-full">
              <p className="text-blue-400 font-medium">Mais recentes</p>
              <p className="font-medium text-blue-800">
                {quizAnswers?.usersAnswer.length} Respostas
              </p>
            </div>
            <div className="w-full flex flex-col items-center gap-4 pb-8">
              {quizAnswers?.usersAnswer?.map((item) => {
                const userData = users.filter(
                  (user: any) => user.id == item.userId,
                )[0];
                const userEmail = userData?.email;
                const username = userData?.userName;
                return (
                  <Link
                    to={`${item.userId}`}
                    className="bg-blue-100 max-w-[380px] w-full flex flex-col p-5 rounded-xl gap-1"
                  >
                    <div>
                      <p className="text-slate-800 font-extrabold">
                        {username}
                      </p>
                      <p className="text-slate-500 font-medium">{userEmail}</p>
                    </div>
                    Resposta Mais Recente {countCorrectAnswers(item)}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
}
