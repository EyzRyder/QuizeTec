// Dependence
import { IonContent } from "@ionic/react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PencilLine, Trophy } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";

import {
  useCurAnswersStore,
  useQuizStore,
  useQuizeAnswersStore,
  useUserStore,
} from "@/lib/store";
import { db } from "@/lib/firebaseConfig";
import useQuizAnswers from "@/useHook/useQuizAnswers";
import useQuizesList from "@/useHook/useQuiz";

//Components
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProgressBar from "@/components/Progress";

export default function Menu() {
  //react
  const navigate = useNavigate();
  const { id } = useParams();

  //hook
  useQuizesList({ id });
  useQuizAnswers();

  // store
  const { user } = useUserStore();
  const { resetAnswer, startQuiz } = useCurAnswersStore();
  const quiz = useQuizStore((store) => store.quizesMap.get(id || ""));

  if (!quiz) {
    navigate("../../base");
  }

  const userPastAnswers = useQuizeAnswersStore(
    (store) =>
      store.quizeAnswers
        .filter((q) => q.quizId == quiz?.id)[0]
        ?.usersAnswer.filter((u) => u.userId == user.uid)[0]?.pastAnswers,
  );

  const allowedAcesse =
    quiz?.createdBy == user?.uid || quiz?.sharedWith.includes(user?.uid);

  const totalCorrectAnswer: number[][] | null =
    userPastAnswers?.map((item, key) => {
      let sum: number = 0;
      item.questions?.forEach((data) => (sum = sum + Number(data.isRight)));
      return [key, sum];
    }) || null;

  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
        exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
        className="min-h-screen flex justify-center  bg-blue-50 "
      >
        <div className="flex flex-col flex-1 min-h-screen max-w-5xl ">
          <header
            className={`sm:flex sm:bg-slate-50 sm:flex-row max-sm:grid max-sm:grid-cols-4 px-5 pt-8 pb-5 gap-6 justify-center items-center rounded-b-3xl `}
          >
            <BackButton className="relative top-auto left-auto" />
            <div className="flex flex-1 flex-col justify-center max-sm:col-span-3 ">
              <div className="flex flex-row">
                <p className="text-blue-400 font-body font-semibold text-base">
                  {quiz?.materia}
                  {" - "}
                  {quiz?.level} Ano
                </p>
              </div>
              <p className="text-blue-800 text-xl font-extrabold">
                {quiz?.title}
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
                  Professor(a) {quiz?.createdByName && quiz?.createdByName}
                </span>
              </address>
              <article className="text-slate-800">{quiz?.description}</article>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-8 sm:items-start sm:justify-between">
              <section className="flex flex-col gap-4">
                <p className="text-blue-800 text-xl font-extrabold">
                  Resultados atual
                </p>
                <div className="flex flex-1 flex-row justify-center space-x-5">
                  <div className="flex flex-col justify-center  bg-blue-100 rounded-xl p-6 shadow w-[161.5px] h-[148px]">
                    <div className="flex flex-row justify-between items-center space-x-8">
                      <div className="flex flex-col h-9 w-9  rounded-full items-center justify-center">
                        <img
                          src="https://i.postimg.cc/fbBS2MXz/Crown.png"
                          alt=""
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                    <p className="text-blue-400 font-body text font-semibold">
                      Acertos
                    </p>
                    {totalCorrectAnswer ? (
                      <p className="flex flex-col font-title text-xl text-[#2A416F] font-bold">
                        {userPastAnswers
                          ? totalCorrectAnswer[totalCorrectAnswer.length - 1][1]
                          : "0"}{" "}
                        / {quiz?.Questions.length}
                      </p>
                    ) : (
                      <p className="flex flex-col font-title text-xl text-[#2A416F] font-bold">
                        0 / {quiz?.Questions.length}
                      </p>
                    )}
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
              </section>
              <section className="flex flex-col gap-3 flex-1">
                <p className="text-blue-800 font-body text-xl font-extrabold">
                  Resultados anteriores
                </p>
                {userPastAnswers &&
                  totalCorrectAnswer?.map(([key, value]) => (
                    <ProgressBar
                      key={key}
                      count={value}
                      total={Number(quiz?.Questions.length)}
                      className=" bg-blue-100 "
                    />
                  ))}
              </section>
            </div>
          </main>
          <footer className="flex flex-col w-full px-9 justify-center items-center  max-sm:pb-28 sm:pb-6 ">
            <Button
              className="w-full max-w-xs"
              onClick={() => {
                resetAnswer();
                navigate(`/quiz/${id}`);
                startQuiz();
              }}
            >
              Começar
            </Button>
          </footer>
        </div>
      </motion.div>
    </IonContent>
  );
}

function AdminMenuBtn({ id }: { id: string | undefined }) {
  if (id == undefined) {
    return <div />;
  }
  async function deleteQuiz(id?: string) {
    if (!id) return;
    const quizdb = doc(db, "Quizes", id);
    const quizAnswers = doc(db, "QuizAnswers", id);
    await deleteDoc(quizdb);
    await deleteDoc(quizAnswers);
  }
  return (
    <menu className="max-sm:col-span-4 flex gap-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="max-sm:w-full sm:w-fit">
            <PencilLine />
            <span> Deletar Quiz </span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Deletar Quiz</DialogTitle>
          <DialogHeader>
            <DialogDescription>
              Tem certeza que voce quer deletar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Cancel</Button>
            <Button
              onClick={() => {
                deleteQuiz(id);
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Link to={`../../quiz/resultados/${id}`}>
        <Button variant="outline" className="max-sm:h-12 max-sm:w-12  sm:w-fit">
          <Trophy />
          <span className="max-sm:hidden ">Resultados</span>
        </Button>
      </Link>
    </menu>
  );
}
