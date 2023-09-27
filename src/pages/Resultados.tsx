import { IonContent } from "@ionic/react";
import { useNavigate, useParams } from "react-router";
import useQuizAnswers from "../useHook/useQuizAnswers";
import useUsersList from "../useHook/useUsersList";
import { useQuizeAnswersStore, useUserStore } from "../lib/store";

export default function Resultados() {
    const navigate = useNavigate();
    const { id } = useParams();

    useUsersList();
    useQuizAnswers();

    const { users } = useUserStore()

    const { usersAnswer, title } = useQuizeAnswersStore((store) => store.quizeAnswers.filter(q => q.quizId == id)[0]);
    console.log(usersAnswer[0].pastAnswers[0])
    return (
        <IonContent className='min-h-screen h-full' style={{ height: '100%' }}>
            <div className="flex-1 w-full py-4 bg-slate-50 space-y-6">
                <h1 className="text-2xl text-center">
                    Resultados da Quiz
                    <span className="text-blue-500">
                        {" " + title}
                    </span>
                </h1>
                <h2>Respostas</h2>
                <div className="w-full flex flex-col items-center gap-4">
                    {usersAnswer?.map(item => {
                        const userEmail = users.filter((user: any) => user.id == item.userId)[0]?.email;
                        return (
                            <>
                                <div
                                    key={item.userId}
                                    className="bg-blue-500 w-[80%] flex flex-col px-3 py-2 rounded-md text-white"
                                    onClick={() => {
                                        console.log(item.userId)
                                    }}>
                                    <span>
                                        Usuario
                                    </span>
                                    {userEmail}
                                </div>

                                {/* <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
                                    <div className="overflow-y-scroll h-[500px]">
                                        {item.pastAnswers?.map(answers => (
                                            <div>
                                                <span>Respostas da {userEmail}</span>
                                                <div>
                                                    {answers?.questions?.map(q => (
                                                        <div>{q.question} -{q.letra} - {q.title}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Modal> */}
                            </>
                        )
                    })}
                </div>
            </div>
        </IonContent>
    )
}