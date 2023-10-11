// Ionic React
import { IonContent } from '@ionic/react';

// Dependencies
import { Link } from 'react-router-dom';

// assets
import PhoneGirl from "../assets/PhoneGirl.png";

import { useUserStore } from '@/lib/store';


export default function Home() {
  const { user } = useUserStore();
  return (
    <IonContent>
      <div className="flex flex-col flex-1 items-center px-5 h-full  justify-center sm:grid sm:grid-cols-2 ">
        <div className="flex justify-center items-center pr-14 w-[600px]">
          <img
            src={PhoneGirl}
            alt='phonegirl'
          />
        </div>
        <div className="flex flex-col items-center w-full gap-3 ">
          <p className="text-center font-title text-[25px] leading-tight font-semibold text-[#2A416F] py-4">
            Hora de começar a se {"\n"} aventurar no aprendizado!
          </p>
          <Link
            to={user ? "/base" : "/login"}
            className="w-full items-center flex justify-center rounded-[20px] bg-[#4A92FF] py-4 text-white font-medium text-lg">
            Começar
          </Link>
          <Link
            to="/sobre"
            className="w-full flex items-center justify-center rounded-lg py-2 text-[#2A416F] text-lg"
          >
            Sobre Nós
          </Link>
        </div>
      </div>
    </IonContent>

  );
};
