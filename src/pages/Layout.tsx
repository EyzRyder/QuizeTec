import { useUserStore } from "../lib/store";
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const { updateUser, isUserAuthenticated, setIsUserAuthenticated } = useUserStore()

  return (
    <div
      className="flex flex-col relative flex-1 bg-slate-50"
    >
      <Outlet />
    </div>
  )
}
