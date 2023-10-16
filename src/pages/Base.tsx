// Ionic React
import { IonContent } from '@ionic/react'

// DB
import { signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

// Lib
import { useQuizStore, useUserStore } from '../lib/store';

// Hook
import useQuizesList from '../useHook/useQuiz';
import useQuizAnswers from '../useHook/useQuizAnswers';

// Dependencies
import { useNavigate } from 'react-router';

// Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { MoreVertical, Play, PlusCircle } from 'lucide-react';
import { getBGLinearGradientByMateria } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Base() {

  const navigate = useNavigate();

  const { quizes } = useQuizStore();
  const { user, updateUser } = useUserStore(); //zustand


  useQuizesList();
  useQuizAnswers();

  return (
    <IonContent className='min-h-screen h-full' style={{ height: '100%' }}>
      <div className="flex-1 flex flex-col h-full w-full">
        <div className="flex pt-11 pb-11 px-6 flex-row justify-between items-center bg-blue-500 rounded-b-3xl">
          <div className="flex flex-col justify-center">
            <p className="text-white text-2xl">Ola,</p>
            <p className="text-white text-2xl">Bem Vindo(a) {user?.userName}</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className='hover:bg-transparent hover:text-white'>
                <MoreVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[80%]">
              <Button
                variant="outline"
                onClick={async () => { await signOut(auth); updateUser(null); navigate('/') }}
                className={`flex-row items-center justify-between border-b-2 border-[#ddd] p-3 `}
              >
                <p className='text-sm text-[#555]'>
                  Log Out
                </p>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1 flex flex-col justify-between px-8 py-10 space-y-2 h-full w-full">
          <p className="text-3xl font-title text-[#2A416F] font-semibold">Quizes Base</p>

          <ScrollArea className='h-[400px]'>
            {
              quizes.map((item) => (<>
                <div
                  key={item.id}
                  className={`relative flex flex-col transition-all mb-4`}
                >
                  <div
                    className={`flex flex-col rounded-xl w-full px-6 py-4 ${getBGLinearGradientByMateria(item.materia)} hover:cursor-pointer`}
                    onClick={() => navigate(`../quiz/menu/${item.id}`)}
                  >

                    <div className="flex flex-col border-2 border-white rounded-xl h-8 w-8 justify-center items-center">
                      <Play className='text-white h-4 w-4'/>
                    </div>
                    <p className="font-bold text-xl text-white">Nível {item.level}</p>
                    <p className="font-bold text-2xl text-white">{item.materia} - {item.title}</p>
                  </div>

                  {
                    item?.createdBy == user?.uid
                    && (
                      <Popover>
                        <PopoverTrigger asChild className='absolute  top-2 right-2'>
                          <Button
                            variant="outline"
                            size='icon'
                            className='rounded-full justify-center items-center hover:shadow-md hover:text-slate-800 text-slate-50'>
                            <MoreVertical />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[80%] ">
                          <Dialog>
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
                                  const quiz = doc(db, 'Quizes', item.id);
                                  const quizAnswers = doc(db, 'QuizAnswers', item.id);
                                  await deleteDoc(quiz);
                                  await deleteDoc(quizAnswers);
                                }}>Confirmar</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            onClick={() => { navigate(`../quiz/resultados/${item.id}`) }}
                            className={`w-full`}
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

          </ScrollArea>

          <Link
            to="/addQuiz"
            className="w-full flex flex-row items-center justify-center rounded-xl bg-blue-500 py-4 gap-2 text-white text-center text-2xl">
            Criar Quiz
            <PlusCircle />
          </Link>
        </div>
      </div>
    </IonContent >
  )
}
