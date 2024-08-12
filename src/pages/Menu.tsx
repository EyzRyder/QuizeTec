// Dependence
import { IonContent } from "@ionic/react";
import { Navigate, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PencilLine, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

//Components
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/Progress";

//lib
import { useCurAnswersStore, useUserStore } from "@/lib/store";
import { fetchMenu } from "@/lib/fetches/MenuFetch";

export default function Menu() {
  const { id } = useParams();
  const navigate = useNavigate();

  // store
  const { user } = useUserStore();
  const { resetAnswer, startQuiz } = useCurAnswersStore();

  if (!id || !user.uid) {
    return <Navigate to="/base" />;
  }

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["menu", id, user.uid],
    queryFn: () => fetchMenu({ quizId: id, userId: user.uid }),
    staleTime: 1000 * 60 * 10, //10 minutes
  });

  if (isPending) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error loading data</p>;
  }

  const allowedAcesse =
    data?.quizData?.createdBy == user?.uid ||
    data?.quizData?.sharedWith.includes(user?.uid);

  const totalCorrectAnswer: number[][] | null =
    data?.userAnswers?.tries?.map((item, key) => {
      let sum: number = 0;

      item.answers?.forEach((data) => (sum = sum + Number(data.isRight)));
      return [key, sum];
    }) || null;

  function comecarQuiz() {
    if (id == null || id == undefined) return;
    resetAnswer();
    navigate(`../play`);
    startQuiz();
  }

  function AdminMenuBtn({ id }: { id: string | undefined }) {
    if (id == undefined) {
      return <div />;
    }
    return (
      <menu className="max-sm:col-span-4 flex gap-6">
        <Link to={`/edit/${id}`}>
          <Button
            variant="outline"
            className="max-sm:h-12 max-sm:w-12  sm:w-fit"
          >
            <PencilLine />
            <span className="max-sm:hidden ">Editar Quiz</span>
          </Button>
        </Link>
        <Link to={`../results`}>
          <Button
            variant="outline"
            className="max-sm:h-12 max-sm:w-12  sm:w-fit"
          >
            <Trophy />
            <span className="max-sm:hidden ">Resultados</span>
          </Button>
        </Link>
      </menu>
    );
  }

  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
        exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
        className="min-h-[100vh] flex justify-center  bg-blue-50 "
      >
        <div className="flex flex-col flex-1 min-h-[100vh] max-w-5xl ">
          <header
            className={`sm:flex sm:bg-slate-50 sm:flex-row max-sm:grid max-sm:grid-cols-4 px-5 pt-8 pb-5 gap-6 justify-center items-center rounded-b-3xl `}
          >
            <BackButton className="relative top-auto left-auto" />
            <div className="flex flex-1 flex-col justify-center max-sm:col-span-3 ">
              <div className="flex flex-row">
                <p className="text-blue-400 font-body font-semibold text-base">
                  {data?.quizData?.materia}
                  {" - "}
                  {data?.quizData?.level} Ano
                </p>
              </div>
              <p className="text-blue-800 text-xl font-bold">
                {data?.quizData?.title}
              </p>
            </div>
            {allowedAcesse ? (
              <AdminMenuBtn id={id} />
            ) : (
              <div className="max-sm:col-span-5"></div>
            )}
          </header>
          <main className="flex flex-col flex-1 px-7 pt-5 pb-9 gap-7 ">
            <div>
              <address className="text-blue-800">
                Criado por:{" "}
                <span className="font-extrabold">
                  Professor(a){" "}
                  {data?.quizData?.createdByName &&
                    data?.quizData?.createdByName}
                </span>
              </address>
              <p>Data de Criação: {data?.quizData?.createdAt.toDateString()}</p>
              <p>
                Ultima vez atualizado:{" "}
                {data?.quizData?.updatedAt.toDateString()}
              </p>
              <article className="text-slate-800">
                {data?.quizData?.description}
              </article>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-8 sm:items-start sm:justify-between">
              <section className="flex flex-col gap-4">
                <p className="text-blue-800 text-xl font-bold">
                  Resultado atual
                </p>
                <div className="flex flex-1 flex-row justify-start items-start space-x-5">
                  <div className="flex flex-col justify-center bg-blue-100 rounded-xl p-6 border-2 border-[#F8FAFC] w-[161.5px] h-[148px]">
                    <div className="flex flex-row justify-between items-center space-x-8">
                      <div className="flex flex-col h-12 w-12  rounded-full items-center justify-center">
                        <img
                          src="https://i.postimg.cc/fbBS2MXz/Crown.png"
                          alt=""
                          className="w-14 h-14"
                        />
                      </div>
                    </div>
                    <p className="text-blue-400 font-body text font-bold">
                      Acertos
                    </p>
                    {totalCorrectAnswer ? (
                      <p className="flex flex-col font-title text-xl text-[#2A416F] font-bold">
                        {totalCorrectAnswer
                          ? totalCorrectAnswer[totalCorrectAnswer.length - 1][1]
                          : "0"}{" "}
                        / {data?.quizData?.QuestionsID.length}
                      </p>
                    ) : (
                      <p className="flex flex-col font-title text-xl text-[#2A416F] font-bold">
                        0 / {data?.quizData?.QuestionsID.length}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-center  bg-blue-100 rounded-xl p-6 shadow w-[161.5px] h-[148px]">
                    <div className="flex flex-row justify-between items-center space-x-8">
                      <div className="flex flex-col h-9 w-9  rounded-full items-center justify-center">
                        <img
                          src="https://i.postimg.cc/2STnJdNN/Clock.png"
                          alt=""
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                    <p className="text-blue-400 font-body text font-semibold">
                      Ultima vez respondido
                    </p>
                    {totalCorrectAnswer ? (
                      <p className="flex flex-col font-title text-lg text-[#2A416F] font-bold">
                        {data?.userAnswers?.updatedAt?.toLocaleDateString(
                          "pt-BR",
                        )}
                      </p>
                    ) : (
                      <p className="flex flex-col font-title text-xl text-[#2A416F] font-bold">
                        0
                      </p>
                    )}
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-3 flex-1">
                <p className="text-blue-800 font-body text-xl font-bold">
                  Resultados anteriores
                </p>
                {data?.userAnswers &&
                  totalCorrectAnswer?.map(([key, value]) => (
                    <ProgressBar
                      key={key}
                      count={value}
                      total={Number(data?.quizData?.QuestionsID.length)}
                      className=" bg-blue-100 "
                    />
                  ))}
              </section>
            </div>
          </main>
          <footer className="flex flex-col w-full px-9 justify-center items-center  max-sm:pb-28 sm:pb-6 ">
            <Button className="w-full max-w-xs" onClick={() => comecarQuiz()}>
              Começar
            </Button>
          </footer>
        </div>
      </motion.div>
    </IonContent>
  );
}
