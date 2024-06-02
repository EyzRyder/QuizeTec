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
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import InputTxt from "@/components/Input";
import { AtSign, KeyRound, User2 } from "lucide-react";

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

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      senha: "",
    },
  });

  // react router
  const navigate = useNavigate();

  // store
  const { updateUser } = useUserStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createUserWithEmailAndPassword(auth, values.email, values.senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          id: user.uid,
          userName: values.userName,
        });
        //do verification later
        // await sendEmailVerification(auth.currentUser).catch((err) =>
        //   console.log(err)
        // );
        toast({
          title: "Sucesso",
          description: `Conta ${values.userName} criada`,
        });
        await updateProfile(user, { displayName: values.userName }).catch(
          (err) => console.log(err),
        );
        updateUser({ ...user, userName: values.userName });
        navigate("/../base");
      })
      .catch((error) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Não foi possível criar sua conta agora!",
        });
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
                Cria sua conta
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
                        <InputTxt icon={User2} placeholder="Nome" {...field} />
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
                        <InputTxt
                          icon={AtSign}
                          placeholder="E-mail"
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
                      <FormControl>
                        <InputTxt
                          placeholder="Senha"
                          icon={KeyRound}
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Cadastrar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
