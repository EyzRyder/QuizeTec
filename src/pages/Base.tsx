import { IonContent } from '@ionic/react'
import { useState } from 'react';
import Modal from '../components/Modal';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';

export default function Base() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <IonContent>
      <button onClick={() => setModalVisible(true)}>
        open
      </button>
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
    </IonContent>
  )
}
