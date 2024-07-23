// DEPENDENCIES
import { IonContent } from "@ionic/react";
import { motion } from "framer-motion";
import { useParams } from "react-router";

// COMPONENTS
import BackButton from "@/components/BackButton";
import QuizCard from "@/components/QuizCard";
import { ScrollArea } from "@/components/ui/scroll-area";

// Other
import { useQuizStore } from "@/lib/store";
import useQuizesList from "@/useHook/useQuiz";

export default function MateriasMenu() {
  const { materia } = useParams();
  const { loading } = useQuizesList({ materia });
  const { quizesMap } = useQuizStore();
  const quizMateria = Array.from(quizesMap.entries()).filter(
    ([_, value]) => value.materia == materia,
  );
  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
        exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
        className="min-h-screen flex justify-center  bg-blue-100 "
      >
        <div className="flex flex-col flex-1 min-h-screen max-w-5xl relative  items-center">
          <header
            className={`w-full sm:flex sm:bg-slate-50 sm:flex-row max-sm:grid max-sm:grid-cols-4 px-5 pt-8 pb-5 gap-6 justify-center items-center rounded-b-3xl `}
          >
            <BackButton className="relative top-auto left-auto" />
            <div className="flex flex-1 flex-col justify-center max-sm:col-span-3 ">
              <div className="flex flex-row">
                <p className="text-blue-400 font-body font-semibold text-base">
                  {quizMateria.length} questões
                </p>
              </div>
              <p className="text-blue-800 text-xl font-extrabold">{materia}</p>
            </div>
            <div className="max-sm:col-span-5"></div>
          </header>
          {loading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-300 z-10 px-4 py-3 rounded-4xl">
              loading...
            </div>
          )}
          <ScrollArea className="h-screen pt-4">
            {quizMateria.map(([key, item]) => (
              <QuizCard quiz={item} key={key} />
            ))}
          </ScrollArea>
        </div>
      </motion.div>
    </IonContent>
  );
}
