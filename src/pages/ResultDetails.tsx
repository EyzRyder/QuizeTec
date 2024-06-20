import BackButton from "@/components/BackButton";
import ProgressBar from "@/components/Progress";
import { useQuizeAnswersStore } from "@/lib/store";
import { AnsweringType } from "@/lib/type";
import useQuizAnswers from "@/useHook/useQuizAnswers";
import useUsersList from "@/useHook/useUsersList";
import { IonContent } from "@ionic/react";
import { motion } from "framer-motion";
import { useParams } from "react-router";

export default function ResultDetails() {
  const { id, userId } = useParams();
  useQuizAnswers();
  const user = useUsersList().filter(user => user.id == userId)[0];
  const quizAnswers = useQuizeAnswersStore((store) => store.quizeAnswers.filter(q => q.quizId == id)[0]);
  const userAnswer = quizAnswers.usersAnswer.filter(ua => ua.userId ==userId)[0].pastAnswers

  return <IonContent>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
      exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
      className="min-h-screen flex justify-center  bg-blue-50 "
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
          <p className="text-blue-800 text-xl font-extrabold">
            {quizAnswers?.title}
          </p>
        </div>
      </header>
        <div className="flex flex-col w-full max-w-[608px] items-center pb-16">
            <div className="w-full">
              <p className="text-blue-800">
                Usuário: <span className="font-extrabold">{user?.userName}</span>
              </p>
              <p className="text-blue-800">
                E-mail: <span className="font-extrabold">{user?.email}</span>
              </p>
            </div>
            <div className="w-full flex flex-col gap-8">
              {
              userAnswer.map((item, index) => {
                let sum: boolean | number = false;
                item?.questions?.map((data: any) => sum = (+sum) + (+data.isRight));
                return (
                  <div className="flex flex-col gap-8">
                    <p className="text-blue-800">Tentativa: <span className="font-extrabold">{index + 1}</span>
                    </p>
                    <ProgressBar count={Number(sum)} total={item?.questions.length} />
                    {item.questions.map((q: AnsweringType, index) => (
                      <div key={q.id} className="flex flex-col ">
                        <span className="text-slate-800">
                          {index + 1}. {q.question}
                        </span>
                        <span data-isright={q.isRight} className="border-2 p-3 font-extrabold rounded-xl data-[isright=true]:text-green-500 data-[isright=true]:bg-green-500/10 data-[isright=true]:border-green-500 text-red-400 data-[isright=false]:bg-red-400/10 data-[isright=false]:border-red-400">
                          {q.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              })
              }
            </div>
        </div>
        </div>

    </motion.div>
  </IonContent>

}