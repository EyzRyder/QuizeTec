import { IonContent } from "@ionic/react";
import { useUserStore } from "../lib/store";
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const { updateUser, isUserAuthenticated, setIsUserAuthenticated } = useUserStore()

  return (
      <IonContent
        className="flex flex-col relative flex-1 bg-slate-50"
      >
        <Outlet />
      </IonContent>
  )
}
