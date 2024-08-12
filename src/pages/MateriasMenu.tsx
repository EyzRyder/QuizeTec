// DEPENDENCIES
import { IonContent } from "@ionic/react";
import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router";
import { RotateCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// COMPONENTS
import BackButton from "@/components/BackButton";
import QuizCard from "@/components/QuizCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// LIB
import { fetchMateria } from "@/lib/fetches/MateriasMenuFetch";

export default function MateriasMenu() {
  const { materia } = useParams();

  if (!materia) return <Navigate to="/" />;

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["materias", materia],
    queryFn: () => fetchMateria(materia),
    staleTime: 1000 * 60 * 10, //10 minutes
  });

  if (error) {
    console.error(error);
    return <p>Error loading data</p>;
  }
  const quizes = data ? data : [];
  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
        exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
        className="min-h-[100vh] flex justify-center bg-blue-100 "
      >
        <div className="flex flex-col flex-1 min-h-[100vh] max-w-5xl relative items-center">
          <header className="w-full sm:flex sm:bg-slate-50 sm:flex-row max-sm:grid max-sm:grid-cols-4 px-5 pt-8 pb-5 gap-6 justify-center items-center rounded-b-3xl">
            <BackButton className="relative top-auto left-auto" />
            <div className="flex flex-1 flex-col justify-center max-sm:col-span-3 ">
              <div className="flex flex-row">
                <p className="text-blue-400 font-body font-semibold text-base">
                  {isPending ? "..." : quizes.length} Questões
                </p>
              </div>
              <p className="text-blue-800 text-xl font-extrabold">{materia}</p>
            </div>
            <div className="max-sm:col-span-5"></div>
            <Button variant="outline" onClick={() => refetch()}>
              <RotateCw />
            </Button>
          </header>

          {isPending && (
            <div className="flex-1 pt-4 px-2 w-full flex flex-col items-center justify-center">
              <div className="flex flex-col mb-6 max-w-[460px] w-full gap-2 animate-pulse  bg-blue-50 p-6 rounded-3xl border-2 border-slate-100">
                <div className="flex justify-between w-full">
                  <div className="bg-blue-200 animate-pulse h-12 w-12 rounded-full grid place-content-center"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-2 w-4 animate-pulse "></div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="h-2 bg-slate-700 rounded col-span-2 animate-pulse "></div>
                  <div className="h-2 bg-slate-700 rounded col-span-2 animate-pulse "></div>
                </div>
              </div>
              <div className="flex flex-col mb-6 max-w-[460px] w-full gap-2 animate-pulse  bg-blue-50 p-6 rounded-3xl border-2 border-slate-100">
                <div className="flex justify-between w-full">
                  <div className="bg-blue-200 animate-pulse h-12 w-12 rounded-full grid place-content-center"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-2 w-4 animate-pulse "></div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="h-2 bg-slate-700 rounded col-span-2 animate-pulse "></div>
                  <div className="h-2 bg-slate-700 rounded col-span-2 animate-pulse "></div>
                </div>
              </div>
              <div className="flex flex-col mb-6 max-w-[460px] w-full gap-2 animate-pulse  bg-blue-50 p-6 rounded-3xl border-2 border-slate-100">
                <div className="flex justify-between w-full">
                  <div className="bg-blue-200 animate-pulse h-12 w-12 rounded-full grid place-content-center"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-2 w-4 animate-pulse "></div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="h-2 bg-slate-700 rounded col-span-2 animate-pulse "></div>
                  <div className="h-2 bg-slate-700 rounded col-span-2 animate-pulse "></div>
                </div>
              </div>
            </div>
          )}

          {quizes.length == 0 && !isPending && (
            <div className="flex-1 flex justify-center items-center">
              Não há quiz disponivel
            </div>
          )}

          {quizes.length > 0 && !isPending && (
            <ScrollArea className="flex-1 pt-4 px-2 w-full flex items-center justify-center">
              {quizes.map(([key, item]) => (
                <QuizCard quiz={item} key={key} />
              ))}
            </ScrollArea>
          )}
        </div>
      </motion.div>
    </IonContent>
  );
}
