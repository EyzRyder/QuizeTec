// React ionic
import { IonContent } from "@ionic/react";

// dependence
import { motion } from "framer-motion";

// assets
import book from "../assets/book.png";

// Components
import AvatarCard from "@/components/AvatarCard";
import BackButton from "@/components/BackButton";

export default function Sobre() {
  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen absolute w-full flex flex-col overflow-y-scroll bg-blue-100"
      >
        <BackButton />
        <div className="flex flex-col flex-1 w-full h-full bg-blue-100">
          <div className="flex-1 lg:grid lg:place-content-center w-full">
            <div className="flex max-lg:flex-col gap-4 px-8 pt-20 pb-28">
              <div className="min-w-96 lg:w-96 max-lg:w-full flex flex-col gap-8">
                <p className="text-3xl font-semibold text-left text-blue-800 ">
                  Motivo do {"\n"}desenvolvimento
                </p>
                <div className="flex flex-col bg-blue-50 px-7 py-6 rounded-3xl mb-14 relative w-full">
                  <p className="text-slate-800  text-lg font-light">
                    O aplicativo foi inicialmente criado para a Semana Paulo
                    Freire em 2022 e posteriormente redesenhado em 2023, visando
                    oferecer uma interface de usuário (UI) mais atrativa e uma
                    experiência aprimorada. O propósito central do quiz é
                    proporcionar suporte ao aluno na compreensão aprofundada das
                    matérias, através de uma abordagem interativa e didática.
                  </p>
                  <img
                    className="absolute w-[100px] -bottom-16 right-2"
                    src={book}
                    alt="book"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <p className="text-2xl text-blue-800 font-bold text-left mb-6">
                  Por Quem?
                </p>
                <div className="grid grid-cols-2 grid-rows-2 w-full justify-center gap-4">
                  <AvatarCard
                    name="Gabriel B."
                    img="https://avatars.githubusercontent.com/u/85580011?v=4"
                    fbImg="GB"
                    roles={["Desenvolvedor FullStack"]}
                    instaLink="https://www.instagram.com/eyz_ryder/"
                    githubLink="https://github.com/EyzRyder"
                    linkedInLink="https://www.linkedin.com/in/gabriel-bessi-5b0160230/"
                  />
                  <AvatarCard
                    name="Kauã M."
                    img="https://avatars.githubusercontent.com/u/98243777?v=4"
                    fbImg="KM"
                    roles={["Desenvolvedor Web", "Web Designer"]}
                    instaLink="https://www.instagram.com/kaua_mtds/"
                    githubLink="https://github.com/Kc1t"
                    linkedInLink="https://www.linkedin.com/in/kaua-miguel/"
                  />
                  <AvatarCard
                    name="Samuel L."
                    img="https://avatars.githubusercontent.com/u/125756047?v=4"
                    fbImg="SL"
                    roles={["Web Designer"]}
                    instaLink="https://www.instagram.com/samuel.llp/"
                    githubLink="https://github.com/samuel-llp"
                    linkedInLink="https://www.linkedin.com/in/samuel-lopes-28b184232/"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
