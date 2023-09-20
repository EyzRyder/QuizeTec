import { IonContent } from '@ionic/react'
import fallgirl from '../assets/FallGirl.png'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserStore } from '../lib/store';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const { updateUser } = useUserStore()

  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   androidClientId: process.env.ANDROID_CLIENT_ID,
  // })
  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUser(user)
        // AsyncStorage.setItem("@user", JSON.stringify(user));
        navigate("/base")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }
  async function handleRegister() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        updateUser(user)
        await setDoc(doc(db, 'users', user.uid), { email: user.email, id: user.uid })
        // AsyncStorage.setItem("@user", JSON.stringify(user));
        navigate("base")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  return (
    <IonContent>
      <div className="flex flex-col flex-1 items-center px-10 py-40 justify-around">
        <div className="flex flex-col pb-60">
          <img
            src={fallgirl}
            className='w-[800] h-[550]'
            alt='fall'
          />
        </div>

        <div className="flex flex-col w-full py-10 pb-60">
          <div className="flex flex-col pb-7 w-full">
            <p className="font-title font-semibold text-[#2A416F] text-[30px] leading-tight">
              Olá,
            </p>
            <p className="font-title font-semibold text-[#2A416F] text-[30px]  leading-tight">
              Hora do Cadastro!
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">

            <input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className={`bg-[${isEmailFocused ? "#fff" : "#EFEFEF"}] rounded-3xl mb-0 p-4 shadow-md text-lg w-full border-${isEmailFocused ? '2' : '0'} border-${isEmailFocused ? "#4A92FF" : "transparent"} text-${isEmailFocused ? 'black' : 'bg-gray-500'} placeholder-slate-500`}
              placeholder="Email"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
            <div className="relative flex flex-col w-full">
              <input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className={`bg-[${isPasswordFocused ? "#fff" : "#EFEFEF"}] rounded-3xl mb-0 p-4 shadow-md text-lg w-full border-${isPasswordFocused ? '2' : '0'} border-${isPasswordFocused ? "#4A92FF" : "transparent"} text-${isPasswordFocused ? 'black' : 'bg-gray-500'} placeholder-slate-500`}
                placeholder="Senha"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <div className="absolute flex-col nset-y-0 left-0 flex items-center pl-2">
                {/* <Icon name="eye" size={16} color="#888888" /> */}
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full flex flex-col items-center justify-center rounded-[20px] bg-[#4A92FF] py-4"
            >
              <p className="text-white font-medium text-[21px]">Login</p>
            </button>
            <button
              onClick={handleRegister}
              className="w-full flex flex-col items-center justify-center rounded-[20px] bg-[#4A92FF] py-4"
            >
              <p className="text-white font-medium text-[21px]">Registrar</p>
            </button>

          </div>
        </div>
      </div>
    </IonContent>
  )
}
