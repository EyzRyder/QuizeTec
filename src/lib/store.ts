import { create } from 'zustand';

interface Questions {
  id: string
  title: string
  answers: AnswersType[]
}

interface AnswersType{
  id: string
  title: string
  isRight: boolean
}

interface QuizType {
  id: string
  title: string
  opened: boolean
  level: string
  materia: string
  QuestionsId: string
}

type QuizStoreType = {
  quizes: QuizType[] | null
  addQuiz: (item: QuizType) => void
  deleteQuiz: (id: string) => void
}
type AddingQuizStoreType = {
  quiz: QuizType
  addId: (id: string) => void
  addTitle: (title: string) => void
  addLevel: (level: string) => void
  addMateria: (materia: string) => void
  addQuestionsId: (questionsId: string) => void
  resetQuiz: () => void
}

export const useQuizStore = create<QuizStoreType>()((set) => ({
  // quizes: [
  //    {
  //   id: '10',
  //   opened: true,
  //   level: '1',
  //   materia: 'Portuguese'
  // },
  // {
  //   id: '12',
  //   opened: false,
  //   level: '3',
  //   materia: 'Biologia'
  // },
  // {
  //   id: '17',
  //   opened: true,
  //   level: '1',
  //   materia: 'Biologia'
  // },
  // {
  //   id: '13',
  //   opened: false,
  //   level: '2',
  //   materia: 'Física'
  // },
  // {
  //   id: '133',
  //   opened: true,
  //   level: '1',
  //   materia: 'Física'
  // },
  // {
  //   id: '15',
  //   opened: false,
  //   level: '3',
  //   materia: 'Física'
  // },
  // ],
  quizes: [],
  addQuiz: (item) => set((state) => ({ quizes: [...state.quizes, item] }),),
  deleteQuiz: (id) => set((state) => ({ quizes: state.quizes.filter(quiz => { quiz.id !== id }) }))
}))

export const useNewQuiz = create<AddingQuizStoreType>()((set) => ({
  quiz: {
    id: '',
    title: '',
    opened: false,
    level: '',
    materia: '',
    QuestionsId: '',
  },
  addId: (id) => set((state) => ({ quiz: { ...state.quiz, id } }),),
  addTitle: (title) => set((state) => ({ quiz: { ...state.quiz, title } }),),
  addLevel: (level) => set((state) => ({ quiz: { ...state.quiz, level } }),),
  addMateria: (materia) => set((state) => ({ quiz: { ...state.quiz, materia } }),),
  addQuestionsId: (questionsId) => set((state) => ({ quiz: { ...state.quiz, questionsId } }),),
  resetQuiz: () => set((state) => ({ quiz: { id: '', title: '', opened: false, level: '', materia: '', QuestionsId: '', } }),),
}))
