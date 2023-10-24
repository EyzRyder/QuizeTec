// React ionic
import { IonIcon, IonContent } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

// dependence
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// assets
import book from "../assets/book.png";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sobre() {
  const navigate = useNavigate();
  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col flex-1 h-[105vh] items-center">
          <div className="flex flex-row pt-10 w-full justify-between items-center">
            <div
              onClick={() => navigate(-1)}
              className="flex flex-col h-8 w-[10%] items-center justify-center cursor-pointer"
            >
              <IonIcon
                icon={arrowBackOutline}
                className=""
                size="large"
                color="primary"
              />
            </div>
            <p className="flex flex-col flex-1 text-center font-semibold font-title text-2xl leading-tight text-[#2A416F] mr-11">
              Sobre
            </p>
          </div>
          <div className="flex flex-col flex-1 px-8 h-full sm:grid sm:grid-cols-2 sm:place-content-center">
            <div>
              <p className="text-3xl font-semibold text-center text-[#2A416F] my-6">
                O Motivo do {"\n"}desenvolvimento?
              </p>
              <div className="flex flex-col bg-[#0062FF] px-7 py-6 rounded-lg mb-14 relative w-full">
                <p className="text-white text-lg font-light">
                  O aplicativo foi inicialmente criado para a Semana Paulo
                  Freire em 2022 e posteriormente redesenhado em 2023, visando
                  oferecer uma interface de usuário (UI) mais atrativa e uma
                  experiência aprimorada. O propósito central do quiz é
                  proporcionar suporte ao aluno na compreensão aprofundada das
                  matérias, através de uma abordagem interativa e didática.
                </p>
                <img
                  className="absolute w-[100px] -bottom-16 "
                  src={book}
                  alt="book"
                />
              </div>
            </div>
            <div>
              <p className="text-2xl text-[#2A416F] font-semibold text-center mb-6">
                Por Quem?
              </p>
              <div className="grid grid-cols-2">
                <div className="flex flex-col space-y-2 justify-center items-center">
                  <Avatar className="h-28 w-28 rounded-xl">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/85580011?v=4"
                      alt="Gabriel Bessi"
                    />
                    <AvatarFallback>GB</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="text-xl text-[#333333] font-medium">
                      Gabriel B.
                    </p>
                    <p className="text-sm w-36 text-[#333333] font-medium">
                      Desenvolvedor
                      <span className="text-sm text-blue-500 font-medium">
                        {" "}
                        Full Stack
                      </span>
                      . Web Designer
                    </p>
                  </div>
                  <div className="flex  gap-2 flex-row mr-16">
                    <a
                      href="https://www.linkedin.com/in/gabriel-bessi-5b0160230/"
                      target="_blank"
                      rel="noopener"
                      className="w-5 h-5 flex-col rounded-full bg-[#4A92FF] flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
                    >
                      <img
                        src="https://i.postimg.cc/J0RZC4LT/linked-in.png"
                        alt="LinkedIn"
                        className="h-3 w-3"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/eyz_ryder/"
                      target="_blank"
                      rel="noopener"
                      className="w-5 h-5 flex-col rounded-full bg-[#4A92FF] flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
                    >
                      <img
                        src="https://i.postimg.cc/ZRnz769j/instagram.png"
                        alt="Instagram"
                        className="h-3 w-3"
                      />
                    </a>
                    <a
                      href="https://github.com/EyzRyder"
                      target="_blank"
                      rel="noopener"
                      className="w-5 h-5 flex-col rounded-full bg-[#4A92FF] flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
                    >
                      <img
                        src="https://i.postimg.cc/15JTT8Qj/Group-9.png"
                        alt="Github_Icon"
                        className="h-3 w-3"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 justify-center items-center">
                  <Avatar className="h-28 w-28 rounded-xl">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/98243777?v=4"
                      alt="Kaua miguel"
                    />
                    <AvatarFallback>KM</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="text-xl text-[#333333] font-medium">
                      Kauã M.
                    </p>
                    <p className="text-sm  w-36 text-[#333333] font-medium">
                      Desenvolvedor Full Stack.
                      <span className="text-sm text-blue-500 font-medium">
                        Web Designer
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 flex-row mr-16">
                    <a
                      href="https://www.linkedin.com/in/kauã-miguel-a107b71b9/"
                      target="_blank"
                      rel="noopener"
                      className="w-5 h-5 flex-col rounded-full bg-[#4A92FF] flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
                    >
                      <img
                        src="https://i.postimg.cc/J0RZC4LT/linked-in.png"
                        alt="LinkedIn"
                        className="h-3 w-3"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/kaua_mtds/?hl=af"
                      target="_blank"
                      rel="noopener"
                      className="w-5 h-5 flex-col rounded-full bg-[#4A92FF] flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
                    >
                      <img
                        src="https://i.postimg.cc/ZRnz769j/instagram.png"
                        alt="Instagram"
                        className="h-3 w-3"
                      />
                    </a>
                    <a
                      href="https://github.com/Kc1t"
                      target="_blank"
                      rel="noopener"
                      className="w-5 h-5 flex-col rounded-full bg-[#4A92FF] flex justify-center items-center cursor-pointer hover:animate-pulse hover:scale-150 transition-all"
                    >
                      <img
                        src="https://i.postimg.cc/15JTT8Qj/Group-9.png"
                        alt="Github_Icon"
                        className="h-3 w-3"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
