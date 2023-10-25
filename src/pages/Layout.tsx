import { IonContent } from "@ionic/react";
import { Outlet } from 'react-router-dom'
// import { useUserStore } from "../lib/store";
// import { ReactNode, useEffect } from 'react';
// import { useUserStorage } from "@/useHook/useUserStorage";

export default function Layout() {
  return (
    <IonContent
      className="flex-1 flex flex-col relative bg-slate-50 min-h-screen"
      style={{ height: '100%', flex: '1 1 0%' }}
    >
      <Outlet />
    </IonContent>
  )
}
