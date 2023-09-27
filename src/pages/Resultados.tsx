import { IonContent } from "@ionic/react";
import { useNavigate, useParams } from "react-router";
import useQuizAnswers from "../useHook/useQuizAnswers";
import useUsersList from "../useHook/useUsersList";
import { useQuizeAnswersStore, useUserStore } from "../lib/store";
import { Progress } from "@/components/ui/progress"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnsweringType } from "@/lib/type";

export default function Resultados() {
    const navigate = useNavigate();
    const { id } = useParams();

    useUsersList();
    useQuizAnswers();

    const { users } = useUserStore()

    const quizAnswers = useQuizeAnswersStore((store) => store.quizeAnswers.filter(q => q.quizId == id)[0]);

    // console.log(quizAnswers?.usersAnswer[0]?.pastAnswers[0])
    return (
        <IonContent className='min-h-screen h-full' style={{ height: '100%' }}>
            <div className="flex-1 w-full py-4 bg-slate-50 space-y-6">
                <h1 className="text-2xl text-center">
                    Resultados da Quiz
                    <span className="text-blue-500">
                        {" " + quizAnswers?.title}
                    </span>
                </h1>
                <h2>Respostas</h2>
                <div className="w-full flex flex-col items-center gap-4">
                    {quizAnswers?.usersAnswer?.map(item => {
                        const userEmail = users.filter((user: any) => user.id == item.userId)[0]?.email;
                        return (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div
                                        key={item.userId}
                                        className="bg-blue-500 w-[80%] flex flex-col px-3 py-2 rounded-md text-white"
                                    >
                                        <span>
                                            Usuário
                                        </span>
                                        {userEmail}
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-[80%] h-[80%]">
                                    <span className="text-xl text-center font-bold">Respostas do(a) {userEmail}</span>
                                    <ScrollArea className="h-[100%] ">
                                        {item?.pastAnswers?.map((answers: any) => {
                                            let sum: boolean | number = false;
                                            const total = answers.questions.length
                                            answers.questions?.map((data: any) => sum = (+sum) + (+data.isRight));
                                            return (
                                            <div className="bg-slate-50 shadow-md rounded-lg px-2 py-2 mt-5">
                                                <span className="text-lg">
                                                        Tentativa { sum }/{total} <Progress value={(Number(sum) / total) * 100} className="w-full" />
                                                </span>
                                                    {answers?.questions?.map((q: AnsweringType) => (
                                                        <div key={q.id} className="flex flex-col ">
                                                            <span>
                                                                {q.question}
                                                            </span>
                                                            <span data-isRight={q.isRight} className=" data-[isRight=true]:text-green-500 text-red-400">
                                                                {q.letra}  {q.title}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                        )})}
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                        )
                    })}
                </div >
            </div>
        </IonContent>
    )
}