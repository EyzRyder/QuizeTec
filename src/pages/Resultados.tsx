// Dependencies
import { Navigate, useLoaderData, useParams } from "react-router";
import { Link } from "react-router-dom";
import { IonContent } from "@ionic/react";

// Components
import BackButton from "@/components/BackButton";
import ProgressBar from "@/components/Progress";
import { UserAttemptResponse } from "@/lib/type";
import { LoaderData } from "@/loaders/ResultadosLoader";

export default function Resultados() {
  const userAnswers = useLoaderData() as LoaderData;
  const { id, title } = useParams();

  if (!id || !title) {
    return <Navigate to={"/"} />;
  }

  const countCorrectAnswers = (answers: UserAttemptResponse[]) => {
    const correctAnswers = answers?.reduce(
      (sum, data) => sum + Number(data?.isRight),
      0,
    );
    return <ProgressBar count={correctAnswers} total={answers?.length} />;
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
              <p className="text-blue-800 text-xl font-extrabold">{title}</p>
            </div>
          </header>
          <div className="flex-1 w-full h-full py-4 space-y-6 flex flex-col items-center">
            <div className="flex justify-between max-w-[380px] w-full">
              <p className="text-blue-400 font-medium">Mais recentes</p>
              <p className="font-medium text-blue-800">
                {userAnswers?.length} Respostas
              </p>
            </div>
            <div className="w-full flex flex-col items-center gap-4 pb-8">
              {userAnswers &&
                userAnswers?.map(([key, userData]) => {
                  return (
                    <Link
                      to={`../answers-details/${key}/${userData.email}/${userData.name}`}
                      key={key}
                      className="bg-blue-100 max-w-[380px] w-full flex flex-col p-5 rounded-xl gap-1"
                    >
                      <div>
                        <p className="text-slate-800 font-extrabold">
                          {userData?.name}
                        </p>
                        <p className="text-slate-500 font-medium">
                          {userData?.email}
                        </p>
                      </div>
                      Resposta Mais Recente{" "}
                      {countCorrectAnswers(
                        userData?.tries[userData?.tries?.length - 1]?.answers,
                      )}
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
