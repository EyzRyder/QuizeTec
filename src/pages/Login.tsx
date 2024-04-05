// Ionic React
import { IonContent } from "@ionic/react";

// Assets
import fallgirl from "../assets/FallGirl.png";

// Dependencies
import { useNavigate } from "react-router";
import { useUserStore } from "../lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as z from "zod";

// DB
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Componentes
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

// type
const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Informe um e-mail para efetuar o registro 😉",
    })
    .email({
      message: "Insira email valido.",
    }),
  senha: z.string().min(6, {
    message: "Senha deve conter no mínimo 6 caracteres 🔑",
  }),
});

export default function Login() {
  const { updateUser } = useUserStore();

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  // react router
  const navigate = useNavigate();

  //functions
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signInWithEmailAndPassword(auth, values.email, values.senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docSnap = await getDoc(doc(db, "users", user.uid));
        updateUser({ ...user, userName: docSnap?.data()?.userName });
        navigate("/base");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error atempetd login: ", errorMessage);
      });
  }

  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        className="h-full "
      >
        <div className="flex flex-col flex-1 items-center px-10 h-full justify-center sm:grid sm:grid-cols-2 bg-[#F5F9FC]">
          <div className="flex justify-center items-center pr-14 w-[480px]">
            <img src={fallgirl} alt="FallGirl" />
          </div>
          <div className="flex flex-col w-full py-10 ">
            <div className="flex flex-col pb-7 w-full">
              <p className="font-title font-semibold text-[#2A416F] text-[30px] leading-tight">
                Olá,
              </p>
              <p className="font-title font-semibold text-[#2A416F] text-[30px]  leading-tight">
                Hora do Login!
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Email</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="AlbertEinstein@etec.sp.gov.br"
                          className="bg-[#EFEFEF] focus:bg-[#fff] rounded-[14px] mb-0 p-4 shadow-md text-lg w-full border-0 focus:border-2 border-transparent focus:border-[#4a92ff] text-gray-500 focus:text-black placeholder-slate-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Senha</FormLabel> */}
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          className="bg-[#EFEFEF] focus:bg-[#fff] rounded-[14px] mb-0 p-4 shadow-md text-lg w-full border-0 focus:border-2 border-transparent focus:border-[#4a92ff] text-gray-500 focus:text-black placeholder-slate-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full text-center rounded-[18px] bg-[#4A92FF] py-7 text-white font-medium text-[21px]"
                >
                  Login
                </Button>
              </form>
            </Form>
            <Link
              to={"/../register"}
              className="w-full text-center rounded-[20px] py-6 text-[#000] font-medium text-[18px]"
            >
              Não Possui Conta?{" "}
              <span className="text-[#4A92FF] hover:underline font-semibold">
                Registrar
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
