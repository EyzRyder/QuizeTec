// Dependencies
import { IonContent } from "@ionic/react";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { useLoaderData, useNavigate } from "react-router";
import { z } from "zod";
import {
  useForm,
  useFieldArray,
  UseFormRegister,
  Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Plus, SaveIcon, Trash, Trash2, X } from "lucide-react";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input, InputWrapper } from "@/components/ui/input";

// Libs
import { levelsOptions, materiaOptions } from "@/lib/data";
import {
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useUserStore } from "@/lib/store";
import { LoaderData } from "@/loaders/EditQuizLoader";

const ALTERNATIVA = "alternativa";

const OptionSchema = z.object({
  radios: z.array(
    z.object({
      id: z.string(),
      label: z.string().nonempty("Label do Radio é obrigatório"),
    }),
  ),
  selectedRadio: z.string(),
});

const QuestionSchema = z.object({
  id: z.string(),
  title: z.string().nonempty("Título é obrigatório"),
  option: OptionSchema,
});

const FormSchema = z.object({
  id: z.string(),
  materia: z.string({
    required_error: "Selecione um materia para exibir",
  }),
  serie: z.string({
    required_error: "Selecione um materia para exibir",
  }),
  title: z.string({
    required_error: "Selecione um materia para exibir",
  }),
  description: z.string({
    required_error: "Selecione um materia para exibir",
  }),
  isPublic: z.boolean().default(false),
  isAnswersPublic: z.boolean().default(false),
  questions: z
    .array(QuestionSchema)
    .min(1, { message: "Pelo menos uma questão é obrigatório" })
    .default([]),
});

type FormSchemaType = z.infer<typeof FormSchema>;
export type QuestionSchemaType = z.infer<typeof QuestionSchema>;

export default function AddQuiz() {
  const editQuizData = useLoaderData() as LoaderData;
  const { toast } = useToast();
  const { user } = useUserStore(); // local storage do zustand
  const navigate = useNavigate();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: editQuizData ? editQuizData.quiz.id : uuid().toString(),
      questions: editQuizData ? editQuizData.questions : [],
      title: editQuizData ? editQuizData.quiz.title : "",
      description: editQuizData ? editQuizData.quiz.description : "",
      materia: editQuizData ? editQuizData.quiz.materia : "",
      serie: editQuizData ? editQuizData.quiz.level : "",
      isPublic: editQuizData ? editQuizData.quiz.isPublic : true,
      isAnswersPublic: editQuizData ? editQuizData.quiz.isAnswersPublic : false,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  async function deleteQuiz(quizLoad: LoaderData) {
    if (!quizLoad) return;
    try {
      for (const question of quizLoad.questions) {
        for (const answer of question.option.radios) {
          await deleteDoc(doc(db, "Answers", answer.id));
        }
        await deleteDoc(doc(db, "Questions", question.id));
      }
      await deleteDoc(doc(db, "Quizes", quizLoad.quiz.id));
      toast({
        title: "Sucesso",
        description: "Quiz Deletado",
      });
      navigate(-1);
    } catch (err) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Houve um error ao deletar seu quiz`,
      });
      console.error("Failed to delete Quiz: ", err);
    }
  }

  async function onSubmit(values: FormSchemaType) {
    const questionsIDs: string[] = [];
    const allAnswersIds: string[] = [];

    try {
      values.questions.forEach(async (question) => {
        questionsIDs.push(question.id);
        const answersIds: string[] = [];

        question.option.radios.forEach(async (answer) => {
          answersIds.push(answer.id);
          allAnswersIds.push(answer.id);
          editQuizData
            ? await updateDoc(doc(db, "Answers", answer.id), {
                title: answer.label,
                questionType: ALTERNATIVA,
                isRight: answer.label == question.option.selectedRadio,
              })
            : await setDoc(doc(db, "Answers", answer.id), {
                id: answer.id,
                title: answer.label,
                QuestionId: question.id,
                QuizId: values.id,
                questionType: ALTERNATIVA,
                isRight: answer.label == question.option.selectedRadio,
              });
        });

        editQuizData
          ? await updateDoc(doc(db, "Questions", question.id), {
              title: question.title,
              AnswersId: answersIds,
              type: ALTERNATIVA,
            })
          : await setDoc(doc(db, "Questions", question.id), {
              id: question.id,
              title: question.title,
              AnswersId: answersIds,
              QuizId: values.id,
              type: ALTERNATIVA,
            });
      });

      editQuizData
        ? await updateDoc(doc(db, "Quizes", values.id), {
            title: values.title,
            level: values.serie,
            materia: values.materia,
            description: values.description,
            isPublic: values.isPublic,
            isAnswersPublic: values.isAnswersPublic,
            updatedAt: Timestamp.fromDate(new Date()),
            QuestionsID: questionsIDs,
            sharedWith: [],
          })
        : await setDoc(doc(db, "Quizes", values.id), {
            id: values.id,
            title: values.title,
            level: values.serie,
            materia: values.materia,
            description: values.description,
            isPublic: values.isPublic,
            isAnswersPublic: values.isAnswersPublic,
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date()),
            QuestionsID: questionsIDs,
            createdBy: user.uid,
            sharedWith: [],
          });

      editQuizData?.questions.forEach(async (question) => {
        if (questionsIDs.includes(question.id)) return;
        await deleteDoc(doc(db, "Questions", question.id));
        question.option.radios.forEach(async (answer) => {
          await deleteDoc(doc(db, "Answers", answer.id));
        });
      });

      toast({
        title: "Sucesso",
        description: `Quiz ${values.title} foi criada`,
      });

      navigate(-1);
    } catch (err) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Houve um error ao criar seu quiz`,
      });
      console.error("Failed to set Quiz col: ", err);
    }
  }

  const ObjectForm: React.FC<{
    field: any;
    index: number;
    removeObject: (index: number) => void;
    control: Control<FormSchemaType>;
    register: UseFormRegister<FormSchemaType>;
  }> = ({ field, index, removeObject, control, register }) => {
    const {
      fields: radioFields,
      append: appendRadio,
      remove: removeRadio,
    } = useFieldArray({
      control,
      name: `questions.${index}.option.radios`,
    });

    return (
      <div className="border-2 border-blue-200 rounded-xl p-3 flex flex-col gap-3">
        <p className="text-blue-500 font-medium">Pergunta {index + 1}. </p>

        <div className="flex flex-col gap-3">
          <FormField
            control={control}
            name={`questions.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWrapper>
                    <Input {...field} placeholder="Título" />
                  </InputWrapper>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {radioFields.map((radioField, radioIndex) => (
          <div
            key={radioField.id}
            className="flex flex-row items-center w-full gap-3"
          >
            <FormField
              control={control}
              name={`questions.${index}.option.selectedRadio`}
              render={({ field }) => (
                <FormControl>
                  <Input
                    type="radio"
                    value={radioField.label}
                    checked={field.value === radioField.label}
                    onChange={() => field.onChange(radioField.label)}
                    className="w-fit"
                  />
                </FormControl>
              )}
            />
            <FormField
              control={control}
              name={`questions.${index}.option.radios.${radioIndex}.label`}
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormControl>
                    <InputWrapper className="w-full">
                      <Input
                        {...field}
                        placeholder="Titulo da Opção"
                        className="w-full"
                      />
                    </InputWrapper>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-full h-8 w-8 p-0"
              onClick={() => removeRadio(radioIndex)}
            >
              <X />
            </Button>
          </div>
        ))}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => removeObject(index)}
          >
            <Trash />
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => appendRadio({ id: uuid().toString(), label: "" })}
          >
            Adicionar Opção
          </Button>
        </div>
      </div>
    );
  };

  return (
    <IonContent className="min-h-screen h-full" style={{ height: "100%" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
        exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <div className="flex-1 flex flex-col min-h-screen w-full sm:pb-12 px-6 pb-28">
          <header className="flex flex-row px-2 py-6 justify-start items-center rounded-b-3xl gap-4">
            <Button
              variant="outline"
              className="w-12 h-12"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ChevronLeft />
            </Button>
            <div className="flex flex-col flex-1">
              <span className="text-blue-400 font-medium">Quiz</span>
              <span className="text-blue-800 font-extrabold text-xl">
                Crie uma quiz
              </span>
            </div>

            {editQuizData && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="max-sm:w-full sm:w-fit">
                    <Trash2 />
                    <span> Deletar Quiz </span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogTitle>Deletar Quiz</DialogTitle>
                  <DialogHeader>
                    <DialogDescription>
                      Tem certeza que voce quer deletar.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit">Cancel</Button>
                    <Button
                      onClick={() => {
                        deleteQuiz(editQuizData);
                      }}
                    >
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <Button onClick={form.handleSubmit(onSubmit)} className="w-fit">
              <SaveIcon />
              Salvar Quiz
            </Button>
          </header>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-5 mt-5 mx-8">
                <FormField
                  control={form.control}
                  name="materia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-500 font-medium">
                        Matéria
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma matéria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {materiaOptions.map((materia) => (
                            <SelectItem key={materia.id} value={materia.nome}>
                              {materia.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-5 mb-5 mx-8">
                <p className="text-2xl text-blue-800 font-extrabold">
                  Corpo do quiz
                </p>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="serie"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma série" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {levelsOptions.map((level) => (
                              <SelectItem key={level.id} value={level.nome}>
                                {level.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputWrapper>
                            <Input
                              type="text"
                              placeholder="Título"
                              {...field}
                            />
                          </InputWrapper>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Você pode escrever uma descrição para seu quiz."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow bg-blue-50 text-slate-800 ">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Deixar o quiz publico para ser respondido
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isAnswersPublic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow bg-blue-50 text-slate-800 ">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none ">
                          <FormLabel>
                            Deixar as respostas do quiz publico
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col h-full w-full ">
                <div className="flex flex-col gap-5  mb-5 mx-8">
                  <span className="font-title text-2xl text-blue-800 font-extrabold">
                    Perguntas
                  </span>
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.questions &&
                      form.formState.errors.questions.message}
                  </p>
                  <div className="flex flex-col gap-3">
                    {fields.map((field, index) => (
                      <ObjectForm
                        key={field.id}
                        field={field}
                        index={index}
                        removeObject={remove}
                        control={form.control}
                        register={form.register}
                      />
                    ))}
                    <Button
                      variant="outline"
                      className="w-full flex justify-center gap-1.5 items-center"
                      type="button"
                      onClick={() =>
                        append({
                          id: uuid().toString(),
                          title: "",
                          option: {
                            radios: [{ id: uuid().toString(), label: "" }],
                            selectedRadio: "",
                          },
                        })
                      }
                    >
                      <Plus />
                      <p className="text-inherit">Nova Pergunta</p>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </IonContent>
  );
}
