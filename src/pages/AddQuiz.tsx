// Ionic React
import { useState } from "react";
import { IonContent } from "@ionic/react";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Libs
import { useNewQuiz, useQuestionsStore, useUserStore } from "@/lib/store";
import { levelsOptions, materiaOptions } from "@/lib/data";
//firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Dependencies
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, PlusCircle, Trash, Trash2, X } from "lucide-react";
import InputTxt from "@/components/Input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AddQuiz() {
  const { toast } = useToast();

  // store
  const { user } = useUserStore(); // local storage do zustand
  const {
    questions,
    addQuestion,
    deleteQuestion,
    editQuestion,
    resetQuestion,
  } = useQuestionsStore();
  const { quiz, addLevel, addMateria, addTitle, resetQuiz } = useNewQuiz();

  // react router
  const navigate = useNavigate();

  async function adicionarQuiz() {
    if (!quiz.title) return alert("Falta Preencher o Título");
    if (!quiz.level) return alert("Falta Selecionar o Nível");
    if (!quiz.materia) return alert("Falta Selecionar o Materia");
    if (!quiz.Questions) return alert("Falta Adicionar o Questoes");

    const id = uuid().toString();

    try {
      const col = doc(db, "Quizes", id);

      await setDoc(col, {
        ...quiz,
        id,
        Questions: questions,
        createdBy: user?.uid,
      });
      const colAns = doc(db, "QuizAnswers", id);

      await setDoc(colAns, {
        quizId: id,
        title: quiz.title,
        usersAnswer: [],
      });

      toast({
        title: "Sucesso",
        description: `Quiz ${quiz.title} foi criada`,
      });

      goBack();
    } catch (err) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Houve um error ao criar seu quiz`,
      });
      console.error("Failed to set QuizAnswers col: ", err);
    }
  }
  function fullReset() {
    resetQuiz();
    resetQuestion();
  }

  function goBack() {
    fullReset();
    navigate(-1);
  }

  return (
    <IonContent className="min-h-screen h-full" style={{ height: "100%" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.2 } }}
        exit={{ opacity: 0.2, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <div className="flex-1 flex flex-col min-h-screen w-full sm:pb-12 px-6 pb-28">
          <div className="flex flex-row px-2 py-6 justify-start items-center rounded-b-3xl gap-4">
            <Button
              variant="outline"
              className="w-12 h-12"
              onClick={() => {
                resetQuestion();
                resetQuiz();
                navigate(-1);
              }}
            >
              <ChevronLeft />
            </Button>
            <div className="flex flex-col">
              <span className="text-blue-400 font-medium">Quiz</span>
              <span className="text-blue-800 font-extrabold text-xl">
                Crie uma quiz
              </span>
            </div>
          </div>
          <ScrollArea className="flex-1 flex flex-col h-full w-full ">
            <div className="mb-5 mt-5 mx-8">
              <Label className="text-blue-500 font-medium">Matéria</Label>
              <Select
                onValueChange={(value) => addMateria(value)}
                defaultValue={quiz.materia}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a matéria" />
                </SelectTrigger>
                <SelectContent>
                  {materiaOptions.map((materia) => (
                    <SelectItem key={materia.id} value={materia.nome}>
                      {materia.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-5 mb-5 mx-8">
              <p className="text-xl text-blue-800 font-extrabold">
                Corpo do quiz
              </p>
              <div className="flex flex-col gap-3">
                <InputTxt
                  type="text"
                  value={quiz?.title}
                  onChange={(e) => addTitle(e.currentTarget.value)}
                  placeholder="Título"
                />
                <Select
                  onValueChange={(value) => addLevel(value)}
                  defaultValue={quiz.level}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a série" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelsOptions.map((level) => (
                      <SelectItem key={level.id} value={level.nome}>
                        {level.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-5  mb-5 mx-8">
              <span className="font-title text-xl text-blue-800 font-extrabold">
                Perguntas
              </span>
              <div className="flex flex-col gap-3">
                {questions.map((question, i) => (
                  <div
                    key={question.id}
                    className="border-2 border-blue-200 rounded-xl p-3 flex flex-col gap-3"
                  >
                    <p className="text-blue-500 font-medium">
                      Pergunta {i + 1}.{" "}
                    </p>
                    <div className="flex flex-col gap-3">
                      <InputTxt
                        placeholder="Título"
                        value={question.title}
                        onChange={(event) => {
                          editQuestion(
                            { ...question, title: event.target.value },
                            i,
                          );
                        }}
                      />
                      <div>
                        <Label className="text-blue-400 font-medium">
                          Tipo de questão
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            editQuestion({ ...question, type: value }, i)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de questão" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"alternativa"}>
                              Alternativa
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {question.type == "alternativa" && (
                        <>
                          <RadioGroup
                            onValueChange={(value) => {
                              editQuestion(
                                {
                                  ...question,
                                  answers: question.answers.map((a) => {
                                    if (a.id == value) {
                                      return { ...a, isRight: true };
                                    } else {
                                      return { ...a, isRight: false };
                                    }
                                  }),
                                },
                                i,
                              );
                              return value;
                            }}
                          >
                            <div
                              key={question.answers[0].id}
                              className="flex gap-3 items-center"
                            >
                              <RadioGroupItem
                                value={question.answers[0].id}
                                id={question.answers[0].id}
                              />
                              <InputTxt
                                className="w-full"
                                value={question.answers[0].title}
                                onChange={(e) =>
                                  editQuestion(
                                    {
                                      ...question,
                                      answers: question.answers.map((an) => {
                                        if (an.id == question.answers[0].id) {
                                          return {
                                            ...an,
                                            title: e.target.value,
                                          };
                                        } else {
                                          return an;
                                        }
                                      }),
                                    },
                                    i,
                                  )
                                }
                              />
                              <Button
                                disabled
                                onClick={() => {
                                  editQuestion(
                                    {
                                      ...question,
                                      answers: question.answers.filter(
                                        (a) => a.id != question.answers[0].id,
                                      ),
                                    },
                                    i,
                                  );
                                }}
                                variant="outline"
                                className="rounded-full h-8 w-8 p-0"
                              >
                                <X />
                              </Button>
                            </div>

                            <div
                              key={question.answers[1].id}
                              className="flex gap-3 items-center"
                            >
                              <RadioGroupItem
                                value={question.answers[1].id}
                                id={question.answers[1].id}
                              />
                              <InputTxt
                                className="w-full"
                                value={question.answers[1].title}
                                onChange={(e) =>
                                  editQuestion(
                                    {
                                      ...question,
                                      answers: question.answers.map((an) => {
                                        if (an.id == question.answers[1].id) {
                                          return {
                                            ...an,
                                            title: e.target.value,
                                          };
                                        } else {
                                          return an;
                                        }
                                      }),
                                    },
                                    i,
                                  )
                                }
                              />
                              <Button
                                disabled
                                onClick={() => {
                                  editQuestion(
                                    {
                                      ...question,
                                      answers: question.answers.filter(
                                        (a) => a.id != question.answers[1].id,
                                      ),
                                    },
                                    i,
                                  );
                                }}
                                variant="outline"
                                className="rounded-full h-8 w-8 p-0"
                              >
                                <X />
                              </Button>
                            </div>

                            <div
                              key={question.answers[2].id}
                              className="flex gap-3 items-center"
                            >
                              <RadioGroupItem
                                value={question.answers[2].id}
                                id={question.answers[2].id}
                              />
                              <InputTxt
                                className="w-full"
                                value={question.answers[2].title}
                                onChange={(e) =>
                                  editQuestion(
                                    {
                                      ...question,
                                      answers: question.answers.map((an) => {
                                        if (an.id == question.answers[2].id) {
                                          return {
                                            ...an,
                                            title: e.target.value,
                                          };
                                        } else {
                                          return an;
                                        }
                                      }),
                                    },
                                    i,
                                  )
                                }
                              />
                              <Button
                                disabled
                                onClick={() => {
                                  editQuestion(
                                    {
                                      ...question,
                                      answers: question.answers.filter(
                                        (a) => a.id != question.answers[2].id,
                                      ),
                                    },
                                    i,
                                  );
                                }}
                                variant="outline"
                                className="rounded-full h-8 w-8 p-0"
                              >
                                <X />
                              </Button>
                            </div>

                            <div
                              key={question.answers[3].id}
                              className="flex gap-3 items-center"
                            >
                              <RadioGroupItem
                                value={question.answers[3].id}
                                id={question.answers[3].id}
                              />
                              <InputTxt
                                className="w-full"
                                value={question.answers[3].title}
                                onChange={(e) =>
                                  editQuestion(
                                    {
                                      ...question,
                                      answers: question.answers.map((an) => {
                                        if (an.id == question.answers[3].id) {
                                          return {
                                            ...an,
                                            title: e.target.value,
                                          };
                                        } else {
                                          return an;
                                        }
                                      }),
                                    },
                                    i,
                                  )
                                }
                              />
                              <Button
                                disabled
                                onClick={() => {
                                  editQuestion(
                                    {
                                      ...question,
                                      answers: question.answers.filter(
                                        (a) => a.id != question.answers[3].id,
                                      ),
                                    },
                                    i,
                                  );
                                }}
                                variant="outline"
                                className="rounded-full h-8 w-8 p-0"
                              >
                                <X />
                              </Button>
                            </div>
                          </RadioGroup>

                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={() => {
                                deleteQuestion(question.id);
                              }}
                            >
                              <Trash />
                            </Button>
                            <Button
                              onClick={() => {
                                editQuestion(
                                  {
                                    ...question,
                                    answers: [
                                      ...question.answers,
                                      {
                                        id: uuid().toString(),
                                        title: "",
                                        isRight: false,
                                        letra: (
                                          question.answers.length +
                                          1 * 2
                                        ).toString(),
                                      },
                                    ],
                                  },
                                  i,
                                );
                              }}
                              variant="outline"
                              className="w-full"
                              disabled
                            >
                              Adicionar Opção
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full flex justify-center gap-1.5 items-center"
                onClick={() => {
                  addQuestion({
                    id: uuid().toString(),
                    title: "",
                    type: "",
                    answers: [
                      {
                        id: uuid().toString(),
                        letra: "A",
                        isRight: false,
                        title: "",
                      },
                      {
                        id: uuid().toString(),
                        letra: "B",
                        isRight: false,
                        title: "",
                      },
                      {
                        id: uuid().toString(),
                        letra: "C",
                        isRight: false,
                        title: "",
                      },
                      {
                        id: uuid().toString(),
                        letra: "D",
                        isRight: false,
                        title: "",
                      },
                    ],
                  });
                }}
              >
                <Plus />
                <p className="text-inherit">Nova Pergunta</p>
              </Button>
            </div>
          </ScrollArea>
          <Button onClick={adicionarQuiz} className="w-full">
            Salvar e Criar Quiz
          </Button>
        </div>
      </motion.div>
    </IonContent>
  );
}
