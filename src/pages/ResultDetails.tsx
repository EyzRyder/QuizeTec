import BackButton from "@/components/BackButton";
import ResultAttempt from "@/components/ResultAttempt";
import { fetchResultDetails } from "@/lib/fetches/ResultadosDetailsFetch";
import { IonContent } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router";

export default function ResultDetails() {
  const { id, title, email, name, userId } = useParams();

  if (!id || !title || !email || !name || !userId) {
    return <Navigate to="/base" />;
  }

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["UserResults", id, userId],
    queryFn: () => fetchResultDetails({ id, userId }),
    staleTime: 1000 * 60 * 10, //10 minutes
  });

  if (error) {
    console.error(error);
    return <p>Error loading data</p>;
  }
  if (isPending) {
    return <p>loading ...</p>;
  }

  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
        exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
        className="min-h-[100vh] flex justify-center  bg-blue-50 "
      >
        <div className="max-w-5xl w-full h-full flex flex-col flex-1 items-center ">
          <header
            className={`sm:flex sm:flex-row max-sm:grid max-sm:grid-cols-4 px-5 pt-8 pb-5 gap-6 justify-center items-center rounded-b-3xl w-full`}
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
          <div className="flex flex-col w-full max-w-[608px] items-center pb-16">
            <div className="w-full">
              <p className="text-blue-800">
                Usuário: <span className="font-extrabold">{name}</span>
              </p>
              <p className="text-blue-800">
                E-mail: <span className="font-extrabold">{email}</span>
              </p>
              <p className="text-blue-800">
                Primeira resposta:{" "}
                <span className="font-extrabold">
                  {data?.userAnswers?.createdAt &&
                    data?.userAnswers?.createdAt.toDateString()}
                </span>
              </p>
              <p className="text-blue-800">
                Ultimo vez respondido:{" "}
                <span className="font-extrabold">
                  {data?.userAnswers?.updatedAt &&
                    data?.userAnswers?.updatedAt.toDateString()}
                </span>
              </p>
            </div>
            <div className="w-full flex flex-col gap-8">
              {data?.userAnswers?.tries.map((item, index) => {
                const correctAnswers = item.answers.reduce(
                  (sum, data) => sum + Number(data.isRight),
                  0,
                );

                return (
                  <ResultAttempt
                    key={index}
                    correctAnswers={correctAnswers}
                    index={index}
                    item={item}
                    questionMap={data?.questionMap}
                    answerMap={data?.answerMap}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
