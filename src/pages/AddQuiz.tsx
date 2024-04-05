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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";

// Libs
import { useNewQuiz, useQuestionsStore, useUserStore } from "@/lib/store";
import { levelsOptions, materiaOptions } from "@/lib/data";
// import { useUserStorage } from "@/useHook/useUserStorage";
//firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Dependencies
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ChevronLeft, PlusCircle, Trash2 } from "lucide-react";

export default function AddQuiz() {
  // store
  //const { user } = useUserStorage(); // local storage do ionic
  const { user } = useUserStore(); // local storage do zustand
  const { questions, addQuestion, deleteQuestion, resetQuestion } =
    useQuestionsStore();
  const { quiz, addLevel, addMateria, addTitle, resetQuiz } = useNewQuiz();

  // react router
  const navigate = useNavigate();

  // react
  const [questaoId, setQuestaoId] = useState<string | null>(null);
  const [questao, setQuestao] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [answerARight, setAnswerARight] = useState(false);
  const [answerBRight, setAnswerBRight] = useState(false);
  const [answerCRight, setAnswerCRight] = useState(false);
  const [answerDRight, setAnswerDRight] = useState(false);

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
    } catch (err) {
      console.error("Failed to set Quiz col: ", err);
    }
    try {
      const colAns = doc(db, "QuizAnswers", id);

      await setDoc(colAns, {
        quizId: id,
        title: quiz.title,
        usersAnswer: [],
      });
    } catch (err) {
      console.error("Failed to set QuizAnswers col: ", err);
    }

    goBack();
  }
  function fullReset() {
    resetQuiz();
    resetQuestion();
  }
  function resetQuestionAnswers() {
    setQuestao("");
    setAnswerA("");
    setAnswerB("");
    setAnswerC("");
    setAnswerD("");
    setAnswerARight(false);
    setAnswerBRight(false);
    setAnswerCRight(false);
    setAnswerDRight(false);
    setQuestaoId(null);
  }
  function goBack() {
    fullReset();
    resetQuestionAnswers();
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
        <div className="flex-1 flex flex-col h-screen w-full bg-[#F5F9FC]">
          <div className="flex flex-row px-2 py-6 justify-start items-center bg-blue-500 rounded-b-3xl gap-4">
            <Button
              onClick={() => {
                resetQuestion();
                resetQuiz();
                navigate(-1);
              }}
              className="flex flex-col items-center justify-center text-white rounded-full"
              variant="ghost"
            >
              <ChevronLeft size={28} />
            </Button>
            <span className="font-title text-2xl leading-tight text-white ">
              Inicio
            </span>
          </div>
          <ScrollArea className="flex-1 flex flex-col h-full w-full px-8 py-6">
            <Label className="text-2xl text-[#2A416F] font-semibold">
              Título do quiz
            </Label>
            <Input
              type="text"
              value={quiz?.title}
              onChange={(e) => addTitle(e.currentTarget.value)}
              placeholder="Insira o Título ✍️"
              className="bg-transparent border-[3px] rounded-xl border-blue-500 focus:border-[#FFBD77] h-12 px-4 py-2 mb-4 mt-3"
            />

            <p className="text-2xl text-[#2A416F] font-semibold">
              Tema & Nível
            </p>
            <Select
              onValueChange={(value) => addMateria(value)}
              defaultValue={quiz.materia}
            >
              <div className="border-[3px] border-blue-500 focus:border-[#FFBD77] h-12 w-full text-left rounded-xl mb-4 mt-3 flex items-center">
                <SelectTrigger>
                  <SelectValue placeholder="Materia" />
                </SelectTrigger>
              </div>
              <SelectContent className="border-2 border-blue-500 rounded-xl">
                {materiaOptions.map((materia) => (
                  <SelectItem key={materia.id} value={materia.nome}>
                    {materia.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => addLevel(value)}
              defaultValue={quiz.level}
            >
              <div className="border-[3px] border-blue-500 focus:border-[#FFBD77] h-12 w-full text-left rounded-xl mb-4 mt-3 flex items-center justify-center">
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
              </div>
              <SelectContent className="border-2 border-blue-500 rounded-xl">
                {levelsOptions.map((level) => (
                  <SelectItem key={level.id} value={level.nome}>
                    {level.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center py-5">
                <span className="font-title text-2xl text-[#2A416F] font-semibold">
                  Questões
                </span>
                <AlertDialog>
                  <AlertDialogTrigger className="rounded-full">
                    <PlusCircle />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <Label className="font-title text-2xl text-[#2A416F]">
                          Pergunta
                        </Label>
                        <Input
                          type="text"
                          value={questao}
                          onChange={(e) => setQuestao(e.currentTarget.value)}
                          placeholder="Título"
                          className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                        />
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <p className="font-title text-2xl text-[#2A416F]">
                          Alternativas
                        </p>
                        <ScrollArea className="flex flex-col items-center space-y-6 h-72 px-3">
                          <div className="px-2">
                            <div className="flex flex-row justify-between items-center">
                              <p className="font-normal text-lg">A.</p>
                              <div className="flex flex-row justify-between items-center">
                                <p>Resposta Correta</p>
                                <div className="flex items-center space-x-2 pl-2">
                                  <Switch
                                    checked={answerARight}
                                    onCheckedChange={() => {
                                      setAnswerARight(true);
                                      setAnswerBRight(false);
                                      setAnswerCRight(false);
                                      setAnswerDRight(false);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <Input
                              type="text"
                              value={answerA}
                              onChange={(e) =>
                                setAnswerA(e.currentTarget.value)
                              }
                              placeholder="Insira uma Resposta"
                              className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                            />
                          </div>
                          <div className="px-2">
                            <div className="flex flex-row justify-between items-center">
                              <p className="font-normal text-lg">B.</p>
                              <div className="flex flex-row justify-between items-center">
                                <p>Resposta Correta</p>
                                <div className="flex items-center space-x-2 pl-2">
                                  <Switch
                                    checked={answerBRight}
                                    onCheckedChange={() => {
                                      setAnswerARight(false);
                                      setAnswerBRight(true);
                                      setAnswerCRight(false);
                                      setAnswerDRight(false);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <Input
                              type="text"
                              value={answerB}
                              onChange={(e) =>
                                setAnswerB(e.currentTarget.value)
                              }
                              placeholder="Insira uma Resposta"
                              className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                            />
                          </div>
                          <div className="px-2">
                            <div className="flex flex-row justify-between items-center">
                              <p className="font-normal text-lg">C.</p>
                              <div className="flex flex-row justify-between items-center">
                                <p>Resposta Correta</p>
                                <div className="flex items-center space-x-2 pl-2">
                                  <Switch
                                    checked={answerCRight}
                                    onCheckedChange={() => {
                                      setAnswerARight(false);
                                      setAnswerBRight(false);
                                      setAnswerCRight(true);
                                      setAnswerDRight(false);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <Input
                              type="text"
                              value={answerC}
                              onChange={(e) =>
                                setAnswerC(e.currentTarget.value)
                              }
                              placeholder="Insira uma Resposta"
                              className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                            />
                          </div>
                          <div className="px-2">
                            <div className="flex flex-row justify-between items-center">
                              <p className="font-normal text-lg">D.</p>
                              <div className="flex flex-row justify-between items-center">
                                <p>Resposta Correta</p>
                                <div className="flex items-center space-x-2 pl-2">
                                  <Switch
                                    checked={answerDRight}
                                    onCheckedChange={() => {
                                      setAnswerARight(false);
                                      setAnswerBRight(false);
                                      setAnswerCRight(false);
                                      setAnswerDRight(true);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <Input
                              type="text"
                              value={answerD}
                              onChange={(e) =>
                                setAnswerD(e.currentTarget.value)
                              }
                              placeholder="Insira uma Resposta"
                              className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                            />
                          </div>
                        </ScrollArea>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => {
                          setQuestao("");
                          setAnswerA("");
                          setAnswerB("");
                          setAnswerC("");
                          setAnswerD("");
                        }}
                      >
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="rounded-[10px] h-12"
                        onClick={() => {
                          if (!questao)
                            return alert("Falta preencher o Título");
                          if (!answerA || !answerB || !answerC || !answerD)
                            return alert("Falta preencher as alternativas");
                          addQuestion({
                            id: questaoId ? questaoId : uuid().toString(),
                            title: questao,
                            answers: [
                              {
                                id: uuid().toString(),
                                letra: "A",
                                isRight: answerARight,
                                title: answerA,
                              },
                              {
                                id: uuid().toString(),
                                letra: "B",
                                isRight: answerBRight,
                                title: answerB,
                              },
                              {
                                id: uuid().toString(),
                                letra: "C",
                                isRight: answerCRight,
                                title: answerC,
                              },
                              {
                                id: uuid().toString(),
                                letra: "D",
                                isRight: answerDRight,
                                title: answerD,
                              },
                            ],
                          });
                          resetQuestionAnswers();
                        }}
                      >
                        Adicionar Questão
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="space-y-2 px-3">
                {questions.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row justify-between items-center space-x-3"
                  >
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => {
                        deleteQuestion(item.id);
                      }}
                      className="rounded-full"
                    >
                      <Trash2 />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger
                        onClick={() => {
                          const q = questions.filter(
                            (question) => question.id === item.id,
                          );
                          // console.log(q[0].answers);
                          setQuestaoId(q[0].id);
                          setQuestao(q[0].title);
                          setAnswerA(q[0].answers[0].title);
                          setAnswerB(q[0].answers[1].title);
                          setAnswerC(q[0].answers[2].title);
                          setAnswerD(q[0].answers[3].title);
                          setAnswerARight(q[0].answers[0].isRight);
                          setAnswerBRight(q[0].answers[1].isRight);
                          setAnswerCRight(q[0].answers[2].isRight);
                          setAnswerDRight(q[0].answers[3].isRight);
                        }}
                        className={`flex-1 ring-1 flex flex-row justify-between items-center ring-blue-500 px-2 py-3 rounded-2xl`}
                      >
                        <span>{item.title}</span>
                        <ChevronLeft />
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            <Label className="font-title text-2xl text-[#2A416F] font-bold">
                              Pergunta
                            </Label>
                            <Input
                              type="text"
                              value={questao}
                              onChange={(e) =>
                                setQuestao(e.currentTarget.value)
                              }
                              placeholder="Título"
                              className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                            />
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <p className="font-title text-2xl text-[#2A416F] font-bold">
                              Alternativas
                            </p>
                            <ScrollArea className="flex flex-col space-y-6 h-86 px-2">
                              <div>
                                <div className="flex flex-row justify-between items-center">
                                  <p className="font-normal text-lg">A.</p>
                                  <div className="flex flex-row justify-between items-center">
                                    <p>Resposta Correta</p>
                                    <div className="flex items-center space-x-2">
                                      <Switch
                                        checked={answerARight}
                                        onCheckedChange={() => {
                                          setAnswerARight(true);
                                          setAnswerBRight(false);
                                          setAnswerCRight(false);
                                          setAnswerDRight(false);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <Input
                                  type="text"
                                  value={answerA}
                                  onChange={(e) =>
                                    setAnswerA(e.currentTarget.value)
                                  }
                                  placeholder="Insira uma Resposta"
                                  className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                                />
                              </div>
                              <div>
                                <div className="flex flex-row justify-between items-center">
                                  <p className="font-normal text-lg">B.</p>
                                  <div className="flex flex-row justify-between items-center">
                                    <p>Resposta Correta</p>
                                    <Switch
                                      checked={answerBRight}
                                      onCheckedChange={() => {
                                        setAnswerARight(false);
                                        setAnswerBRight(true);
                                        setAnswerCRight(false);
                                        setAnswerDRight(false);
                                      }}
                                    />
                                  </div>
                                </div>
                                <Input
                                  type="text"
                                  value={answerB}
                                  onChange={(e) =>
                                    setAnswerB(e.currentTarget.value)
                                  }
                                  placeholder="Insira uma Resposta"
                                  className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                                />
                              </div>
                              <div>
                                <div className="flex flex-row justify-between items-center">
                                  <p className="font-normal text-lg">C.</p>
                                  <div className="flex flex-row justify-between items-center">
                                    <p>Resposta Correta</p>
                                    <Switch
                                      checked={answerCRight}
                                      onCheckedChange={() => {
                                        setAnswerARight(false);
                                        setAnswerBRight(false);
                                        setAnswerCRight(true);
                                        setAnswerDRight(false);
                                      }}
                                    />
                                  </div>
                                </div>
                                <Input
                                  type="text"
                                  value={answerC}
                                  onChange={(e) =>
                                    setAnswerC(e.currentTarget.value)
                                  }
                                  placeholder="Insira uma Resposta"
                                  className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                                />
                              </div>
                              <div>
                                <div className="flex flex-row justify-between items-center">
                                  <p className="font-normal text-lg">D.</p>
                                  <div className="flex flex-row justify-between items-center">
                                    <p>Resposta Correta</p>
                                    <Switch
                                      checked={answerDRight}
                                      onCheckedChange={() => {
                                        setAnswerARight(false);
                                        setAnswerBRight(false);
                                        setAnswerCRight(false);
                                        setAnswerDRight(true);
                                      }}
                                    />
                                  </div>
                                </div>
                                <Input
                                  type="text"
                                  value={answerD}
                                  onChange={(e) =>
                                    setAnswerD(e.currentTarget.value)
                                  }
                                  placeholder="Insira uma Resposta"
                                  className="bg-transparent border-2 rounded-[8px] border-blue-500 h-12 px-4 py-2 mb-4 mt-3"
                                />
                              </div>
                            </ScrollArea>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => {
                              setQuestao("");
                              setAnswerA("");
                              setAnswerB("");
                              setAnswerC("");
                              setAnswerD("");
                            }}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              if (!questao)
                                return alert("Falta preencher o Título");
                              if (!answerA || !answerB || !answerC || !answerD)
                                return alert("Falta preencher as alternativas");
                              if (questaoId) deleteQuestion(questaoId);
                              addQuestion({
                                id: questaoId ? questaoId : uuid().toString(),
                                title: questao,
                                answers: [
                                  {
                                    id: uuid().toString(),
                                    letra: "A",
                                    isRight: answerARight,
                                    title: answerA,
                                  },
                                  {
                                    id: uuid().toString(),
                                    letra: "B",
                                    isRight: answerBRight,
                                    title: answerB,
                                  },
                                  {
                                    id: uuid().toString(),
                                    letra: "C",
                                    isRight: answerCRight,
                                    title: answerC,
                                  },
                                  {
                                    id: uuid().toString(),
                                    letra: "D",
                                    isRight: answerDRight,
                                    title: answerD,
                                  },
                                ],
                              });
                              resetQuestionAnswers();
                            }}
                          >
                            Adicionar Questão
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
          <Button
            onClick={adicionarQuiz}
            className="flex flex-row items-center justify-center font-medium rounded-2xl bg-blue-500 py-8 mx-4 my-3 text-white text-2xl"
          >
            Finalizar Quiz
          </Button>
        </div>
      </motion.div>
    </IonContent>
  );
}
