import { IonContent } from '@ionic/react'
import { useState } from 'react';

export default function Base() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <IonContent>Base</IonContent>
  )
}
