import { ReactNode } from "react";

export default function Modal({
  modalVisible,
  setModalVisible,
  children,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  children: ReactNode;
}) {
  return (
    <>
      {modalVisible && (
        <>
          <div
            onClick={() => setModalVisible(false)}
            className="z-[1] top-0 left-0 flex flex-col bg-gray-500/75 min-w-full min-h-screen absolute"
          ></div>
          <div className="z-[2] w-[80%] bg-white flex-1 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex  flex-row items-center justify-between px-3 py-3 border-b-2 border-[#ddd]">
              <button onClick={() => setModalVisible(false)}>
                Voltar
                {/* <Icon name='chevron-left' size={30} color={'#2A416F'} /> */}
              </button>
              <p className="font-title text-lg text-[#2A416F]">Opções</p>
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
}
