// Ionic React
import { IonContent } from "@ionic/react";

// Dependencies
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// assets
import Logo from "../assets/Logo.svg";

import { useUserStore } from "@/lib/store";

export default function Home() {
  const { user } = useUserStore();
  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        className="h-full bg-blue-500 text-white  grid place-items-center"
      >
        <div className="flex flex-col flex-1 items-center px-5 h-full w-96 justify-center ">
          <div className="flex flex-col items-center w-full gap-3 ">
            <div className="flex justify-center items-center">
              <img src={Logo} alt="Logo QuizeTec" loading="lazy" />
            </div>
            <p className="text-center font-title text-[25px] leading-tight font-semibold  py-4">
              Comece a se <br /> aventurar no aprendizado!
            </p>
            <Link
              to={user ? "/base" : "/login"}
              className="w-full items-center flex justify-center rounded-[20px] bg-blue-100 font-bold  py-4 text-slate-800 text-lg"
            >
              Começar
            </Link>
            <Link
              to="/sobre"
              className="w-full flex  border-2 rounded-[20px]  border-blue-100 items-center justify-center  py-4 text-lg"
            >
              Sobre
            </Link>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
