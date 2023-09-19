
import { IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useNavigate } from "react-router-dom";

import book from "../assets/book.png";

export default function Sobre() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 items-center overflow-y-scroll">
      <div className="flex flex-row pt-10">
        <div
          onClick={() => navigate('/')}
          className="flex flex-col h-8 w-12 items-center justify-center cursor-pointer"
        >
          <IonIcon
            icon={arrowBackOutline}
            className=""
            size="large"
            color="primary"
          />

        </div>
        <p className="flex flex-col flex-1 font-semibold font-title text-2xl leading-tight text-[#2A416F]">
          Sobre
        </p>
      </div>
      <div className="flex flex-col flex-1 px-8">
        <p className="text-3xl font-semibold text-center text-[#2A416F] my-6">
          O Motivo do {"\n"}desenvolvimento?
        </p>
        <div className="flex flex-col bg-[#0062FF] px-7 py-6 rounded-lg mb-14 relative w-full">
          <p className="text-white text-lg font-light">
            O aplicativo foi inicialmente criado para a Semana Paulo Freire em
            2022 e posteriormente redesenhado em 2023, visando oferecer uma
            interface de usuário (UI) mais atrativa e uma experiência
            aprimorada. O propósito central do quiz é proporcionar suporte ao
            aluno na compreensão aprofundada das matérias, através de uma
            abordagem interativa e didática.
          </p>
          <img
            className="absolute p-10 top-[104%] left-[2px]"
            src={book}
            width={90}
            height={100}
            alt="book"
          />
        </div>
        <p className="text-2xl text-[#2A416F] font-semibold text-center mb-6">
          Por Quem?
        </p>
        <div className="flex flex-row justify-between pb-5">
          <div className="flex flex-col space-y-2 justify-center items-center">
            <img
              src="https://avatars.githubusercontent.com/u/85580011?v=4"
              className="h-28 w-28 rounded-lg"
              alt="avatar"
            />
            <div className="flex flex-col">
              <p className="text-xl text-[#333333] font-medium">
                Gabriel B.
              </p>
              <p className="text-sm w-36 text-[#333333] font-medium">
                Desenvolvedor Full Stack.
                <p className="text-sm text-blue-500 font-medium"> Web </p>
                Designer
              </p>
            </div>
            <div className="flex  gap-2 flex-row mr-16">
              <div className="w-5 h-5 flex-col rounded-full bg-[#4A92FF] flex justify-center items-center">
                <img
                  src="https://i.postimg.cc/J0RZC4LT/linked-in.png"
                  alt="linkedin"
                />
              </div>
              <div className="w-5 h-5 rounded-full bg-[#4A92FF] flex justify-center items-center flex-col">
                <img
                  src="https://i.postimg.cc/ZRnz769j/instagram.png"
                  alt="inta"
                  className="h-3 w-3"
                />
              </div>
              <div className="w-5 h-5 rounded-full bg-[#4A92FF] flex flex-col justify-center items-center">
                <img
                  src="https://i.postimg.cc/15JTT8Qj/Group-9.png"
                  alt="g"
                  className="h-3 w-3"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 justify-center items-center">
            <img
              src="https://instagram.fcgh23-1.fna.fbcdn.net/v/t51.2885-19/366023601_6675853295800089_7604792551801304264_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcgh23-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=_pyo_ULnVNIAX8vyAeh&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfABNGYoOq_ZNauhNPFLsVHJ0C4fHgqxy54ec7FlGzry_w&oe=64E83CB9&_nc_sid=8b3546"
              alt="avatar"
              className="h-28 w-28 rounded-lg"
            />
            <div className="flex flex-col">
              <p className="text-xl text-[#333333] font-medium">
                Kauã M.
              </p>
              <p className="text-sm  w-36 text-[#333333] font-medium">
                Desenvolvedor
                <p className="text-sm text-blue-500 font-medium">
                  {" "}
                  Full Stack{" "}
                </p>
                . Web Designer
              </p>
            </div>
            <div className="flex gap-2 flex-row mr-16">
              <div className="w-5 h-5 flex-col rounded-full bg-[#4A92FF] flex justify-center items-center">
                <img
                  src="https://i.postimg.cc/J0RZC4LT/linked-in.png"
                  alt="linkedin"
                />
              </div>
              <div className="w-5 h-5 rounded-full bg-[#4A92FF] flex justify-center items-center flex-col">
                <img
                  src="https://i.postimg.cc/ZRnz769j/instagram.png"
                  alt="inta"
                  className="h-3 w-3"
                />
              </div>
              <div className="w-5 h-5 rounded-full bg-[#4A92FF] flex flex-col justify-center items-center">
                <img
                  src="https://i.postimg.cc/15JTT8Qj/Group-9.png"
                  alt="g"
                  className="h-3 w-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}