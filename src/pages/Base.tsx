import { IonContent, IonIcon } from '@ionic/react'
import { useState } from 'react';
import Modal from '../components/Modal';
import { signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebaseConfig';
import { useQuizStore, useUserStore } from '../lib/store';
import useQuizesList from '../useHook/useQuiz';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import useQuizAnswers from '../useHook/useQuizAnswers';
import { ellipsisVerticalOutline } from 'ionicons/icons';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Base() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const navigate = useNavigate();

  const { quizes } = useQuizStore();
  const { user } = useUserStore();
  if (!user) navigate('/')

  useQuizesList();
  useQuizAnswers();

  return (
    <IonContent className='min-h-screen h-full' style={{ height: '100%' }}>
      <div className="flex flex-col flex-1 w-full">
        <div className="flex pt-11 pb-11 px-6 flex-row justify-between items-center bg-blue-500 rounded-b-3xl">
          <div className="flex flex-col justify-center">
            <p className="text-white text-2xl">Ola,</p>
            <p className="text-white text-2xl">Bem Vindo(a) {user?.email}</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className='hover:bg-transparent hover:text-white'>
                <IonIcon icon={ellipsisVerticalOutline} size="large"></IonIcon>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[80%]">
              <button
                onClick={() => { signOut(auth); }}
                className={`flex-row items-center justify-between border-b-2 border-[#ddd] p-3 `}
              >
                <p className='text-sm text-[#555]'>
                  Log Out
                </p>
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col flex-1 px-8 py-10 space-y-2 w-full">
          <p className="text-3xl font-title text-[#2A416F] font-semibold">Quizes Base</p>

          <div className='flex flex-col flex-1 overflow-y-scroll justify-between h-full space-y-4'>
            {
              quizes.map((item) => (<>
                <div
                  key={item.id}
                  className={`relative flex flex-col`}
                >
                  <div
                    className={` flex flex-col rounded-lg w-full px-6 py-4 bg-blue-500`}
                    onClick={() => navigate(`../quiz/menu/${item.id}`)}
                  >

                    <div className="flex flex-col border-2 border-white rounded-md h-8 w-8 justify-center items-center">
                      {/* <Icon name="play" size={16} color="#FFF" /> */}
                      {/* {false ? <Icon name="play" size={16} color="#FFF" /> : <Icon name="check" size={16} color="#FFF" />} */}
                    </div>
                    <p className="font-bold text-xl text-white">Nível {item.level}</p>
                    <p className="font-bold text-2xl text-white">{item.materia} - {item.title}</p>
                  </div>

                  {
                    // item.createdBy == user.uid
                    true && (
                    <Popover>
                      <PopoverTrigger asChild className='absolute  top-2 right-2'>
                        <Button variant="outline" className='rounded-full justify-center items-center hover:shadow-md hover:text-slate-800 text-slate-50'>
                          <IonIcon icon={ellipsisVerticalOutline} className='w-5 h-5'></IonIcon>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[80%] ">
                        {/* <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">Deletar</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogTitle>Deletar Quiz</DialogTitle>
                            <DialogHeader>
                              <DialogDescription>
                                Tem certeza que voce quer deletar.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button type='submit'>Cancel</Button>
                              <Button onClick={async () => {
                                const quiz = await doc(db, 'Quizes', item.id);
                                const quizAnswers = await doc(db, 'QuizAnswers', item.id);
                                await deleteDoc(quiz);
                                await deleteDoc(quizAnswers);
                              }}>Confirmar</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog> */}
                        <Button
                          variant="outline"
                          onClick={() => { navigate(`../quiz/resultados/${item.id}`) }}
                          className={` w-full`}
                        >
                            Ver resultados
                        </Button>
                      </PopoverContent>
                    </Popover>
                  )}
                </div >
              </>
              ))
            }

          </div>
        </div>

      </div>
    </IonContent >
  )
}
