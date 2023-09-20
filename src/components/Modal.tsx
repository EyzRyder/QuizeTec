
export default function Modal({ modalVisible, setModalVisible }: { modalVisible:boolean, setModalVisible:(val:boolean)=>void }) {
  return (
    <>
        <button onClick={() => setModalVisible(true)}>
          open
          {/* <Icon name="more-vertical" size={32} color="#FFF" /> */}
        </button>
        {modalVisible &&  <div className="">
          <div className='flex-1'>
            <div className='flex-row items-center justify-between px-3 py-3 border-b-2 border-[#ddd]'>
              <button
                onClick={() => setModalVisible(false)}
              >
                back
                {/* <Icon name='chevron-left' size={30} color={'#2A416F'} /> */}
              </button>
              <p className='font-title text-lg text-[#2A416F]'>Opções</p>
            </div>
            <div className="flex-1">
              <button
                onClick={() => { signOut(auth); router.back() }}
                className={`flex-row items-center justify-between border-b-2 border-[#ddd] p-3 `}
              >
                <p className='text-sm text-[#555]'>
                  Log Out
                </p>
              </button>
            </div>
          </div>
          </div>}
        </>
  )
}
