// Ionic React
import { IonContent } from "@ionic/react";

// Assets
// import fallgirl from "../assets/FallGirl.png";
// import EmailA from "../assets/svg/email-a";

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
import { Link } from "react-router-dom";
import { toast, useToast } from "@/components/ui/use-toast";
import { AtSign, KeyRound } from "lucide-react";
import InputTxt from "@/components/Input";

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
  const { toast } = useToast();

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
        toast({
          title: "Sucesso",
          description: "Logado com sucesso!",
        });
        const user = userCredential.user;
        const docSnap = await getDoc(doc(db, "users", user.uid));
        updateUser({
          ...user,
          userName: docSnap?.data()?.userName,
          role: docSnap?.data()?.role,
        });
        navigate("/base");
      })
      .catch((error) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Email ou/e Senha esta incorreta!",
        });
        const errorMessage = error.message;
        console.error("Error attempted login: ", errorMessage);
      });
  }

  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        className="h-full bg-blue-100 grid place-items-center"
      >
        <div className="flex flex-col flex-1 items-center px-10 h-full min-w-20   justify-center">
          <div className="flex flex-col w-full py-10 ">
            <div className="flex flex-col pb-7 w-full">
              <p className="font-title font-extrabold text-blue-800 text-2xl  leading-tight">
                Acesse sua conta
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="m-0">
                        <InputTxt
                          placeholder="E-mail"
                          icon={AtSign}
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
                        <InputTxt
                          placeholder="Senha"
                          type="password"
                          icon={KeyRound}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <Link
                        to={"/../esqueceuSenha"}
                        className="w-full text-right block text-blue-800 font-bold text-sm hover:underline hover:text-blue-400"
                      >
                        Esqueceu a senha?
                      </Link>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
            </Form>
            <div className="py-6 flex flex-col w-full gap-2">
              <Link
                to={"/../register"}
                className="w-full text-center text-sm  text-blue-800 font-bold text-[18px] hover:underline "
              >
                <span className="text-blue-400  font-semibold">
                  Novo por aqui?
                </span>{" "}
                Faça o cadastro
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
