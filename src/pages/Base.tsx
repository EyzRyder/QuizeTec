import { IonContent } from '@ionic/react'
import { useState } from 'react';
import Modal from '../components/Modal';
import { signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebaseConfig';
import { useQuizStore, useUserStore } from '../lib/store';
import useQuizesList from '../useHook/useQuiz';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import useQuizAnswers from '../useHook/useQuizAnswers';

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
          <button onClick={() => setModalVisible(true)}>
            Opcoes
          </button>
        </div>
        <div className="flex flex-col flex-1 px-8 py-10 space-y-2 w-full">
          <p className="text-3xl font-title text-[#2A416F] font-semibold">Quizes Base</p>

          <div className='flex flex-col flex-1 overflow-y-scroll justify-between h-full space-y-4'>
            {
              quizes.map((item) => (
                <div
                  onClick={() => navigate(`../quiz/menu/${item.id}`)}
                  className={`relative flex flex-col rounded-lg w-full px-6 py-4 bg-blue-500`}
                >
                  <div className="flex flex-col border-2 border-white rounded-md h-8 w-8 justify-center items-center">
                    {/* <Icon name="play" size={16} color="#FFF" /> */}
                    {/* {false ? <Icon name="play" size={16} color="#FFF" /> : <Icon name="check" size={16} color="#FFF" />} */}
                  </div>
                  <p className="font-bold text-xl text-white">Nível {item.level}</p>
                  <p className="font-bold text-2xl text-white">{item.materia} - {item.title}</p>
                </div>
              ))
            }

          </div>
        </div>
        <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
          <div className="flex-1">
            <button
              onClick={() => { signOut(auth); }}
              className={`flex-row items-center justify-between border-b-2 border-[#ddd] p-3 `}
            >
              <p className='text-sm text-[#555]'>
                Log Out
              </p>
            </button>
          </div>
        </Modal>
      </div>
    </IonContent>
  )
}
