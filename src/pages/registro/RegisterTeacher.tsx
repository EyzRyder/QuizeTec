// react
import { IonContent } from "@ionic/react";

// Assets
import fallgirl from "../../assets/FallGirl.png";

// Dependencies
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as z from "zod";

// Lib
import { useUserStore } from "../../lib/store";

// DB
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Componentes
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputWrapper } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AtSign, KeyRound, User2 } from "lucide-react";
import BackButton from "@/components/BackButton";

// type
const formSchema = z.object({
  userName: z.string().min(2, {
    message:
      "Vamos lá! Seu nome de usuário deve ter pelo menos 2 caracteres 😊",
  }),
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

export default function Register() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { updateUser } = useUserStore();

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      senha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createUserWithEmailAndPassword(auth, values.email, values.senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          id: user.uid,
          userName: values.userName,
          role: "teacher",
        });
        toast({
          title: "Sucesso",
          description: `Conta ${values.userName} criada`,
        });
        //do verification later
        // await sendEmailVerification(auth.currentUser).catch((err) =>
        //   console.log(err)
        // );
        await updateProfile(user, { displayName: values.userName }).catch(
          (err) => console.log(err),
        );
        updateUser({ ...user, userName: values.userName, role: "teacher" });
        navigate("/../base");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <IonContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        className="h-full bg-blue-100 grid place-items-center relative"
      >
        <BackButton />
        <div className="flex flex-col flex-1 items-center px-10 h-screen justify-center">
          <div className="flex flex-col w-full  ">
            <div className="flex flex-col pb-7 w-full">
              <p className="font-title font-extrabold text-blue-800 text-2xl leading-tight">
                Olá Professor,
              </p>
              <p className="font-title font-extrabold text-blue-800 text-2xl leading-tight">
                Hora do Cadastro!
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputWrapper icon={User2}>
                          <Input placeholder="Nome" {...field} />
                        </InputWrapper>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputWrapper icon={AtSign}>
                          <Input type="email" placeholder="E-mail" {...field} />
                        </InputWrapper>
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
                      <FormControl>
                        <InputWrapper icon={KeyRound}>
                          <Input
                            type="password"
                            placeholder="Senha"
                            {...field}
                          />
                        </InputWrapper>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full text-center font-medium text-[21px]"
                >
                  Cadastrar
                </Button>
              </form>
            </Form>
            <Link
              to={"/../login"}
              className="w-full text-center rounded-[20px] py-6 text-[#000] font-medium text-[18px]"
            >
              Possui Conta?{" "}
              <span className="text-[#4A92FF] hover:underline font-semibold">
                Entrar
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
