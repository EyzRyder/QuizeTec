// Ionic React
import { IonContent } from "@ionic/react";

//components
import { Button } from "@/components/ui/button";

// Dependencies
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// assets
import Logo from "../assets/svg/Logo";

//Lib
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
        className="h-full bg-blue-500 text-white  flex flex-col items-center justify-center"
      >
        <div className="flex flex-col flex-1 items-center px-5 h-full w-96 justify-center ">
          <div className="flex flex-col items-center w-full gap-3 ">
            <div className="flex justify-center items-center">
              <Logo />
            </div>
            <p className="text-center font-title text-[25px] leading-tight font-semibold  py-4">
              Comece a se <br /> aventurar no aprendizado!
            </p>
            <Link to={user ? "/base" : "/login"}>
              <Button className="min-w-[20em]" variant="white">
                Começar
              </Button>
            </Link>
            <Link to="/sobre">
              <Button className="min-w-[20em]" variant="outlineWhite">
                Sobre
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
