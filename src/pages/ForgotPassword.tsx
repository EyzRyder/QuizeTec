// react
import { IonContent } from "@ionic/react";

// Assets
import fallgirl from "../assets/FallGirl.png";

// Dependencies
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as z from "zod";

// Lib
import { useUserStore } from "../lib/store";

// DB
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/BackButton";
import InputTxt from "@/components/Input";
import { AtSign } from "lucide-react";

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
});

export default function Register() {
  const { toast } = useToast();

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // react router
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toast({
          title: "Sucesso",
          description:
            "Email de mudar senha foi enviada, verifique se ele caiu no span.",
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast({
          title: "Error",
          description: "Não foi possível enviar email de mudar senha.",
        });
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
        className="h-full relative bg-blue-100 grid place-items-center"
      >
        <BackButton />
        <div className="flex flex-col flex-1 items-center px-10 h-full min-w-20 justify-center">
          <div className="flex flex-col w-full py-10">
            <div className="flex flex-col pb-7 w-full">
              <h1 className="font-title font-extrabold text-blue-800 text-2xl  leading-tight">
                Redefinir sua senha
              </h1>
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
                <Button type="submit" className="w-full">
                  Enviar e-mail
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </motion.div>
    </IonContent>
  );
}
