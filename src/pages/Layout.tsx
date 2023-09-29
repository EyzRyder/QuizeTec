import { IonContent } from "@ionic/react";
import { useUserStore } from "../lib/store";
import { ReactNode, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import { useUserStorage } from "@/useHook/useUserStorage";

export default function Layout() {
  useEffect(() => {

},[])
  return (
      <IonContent
        className="flex flex-col relative flex-1 bg-slate-50"
      >
        <Outlet />
      </IonContent>
  )
}
