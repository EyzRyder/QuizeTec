import { create } from 'zustand';

interface QuestionType {
  id: string
  title: string
  answers: AnswersType[]
}

interface AnswersType {
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
  Questions: QuestionType[]
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
  addQuestions: (questions: QuestionType) => void
  resetQuiz: () => void
}
type QuestionsStoreType = {
  questions: QuestionType[] | null
  addQuestion: (item: QuestionType) => void
  deleteQuestion: (id: string) => void
  resetQuestion: () => void
}

export const useQuizStore = create<QuizStoreType>()((set) => ({
  quizes: [],
  addQuiz: (item) => set((state) => ({ quizes: [...state.quizes, item] }),),
  deleteQuiz: (id) => set((state) => ({ quizes: state.quizes.filter(quiz => { quiz.id !== id }) }))
}))
export const useQuestionsStore = create<QuestionsStoreType>()((set) => ({
  questions: [],
  addQuestion: (item) => set((state) => ({ questions: [...state.questions, item] }),),
  deleteQuestion: (id) => set((state) => ({ questions: state.questions.filter(question => { question.id !== id }) })),
  resetQuestion: () => set((state) => ({ questions: [] }),),
}))

export const useNewQuiz = create<AddingQuizStoreType>()((set) => ({
  quiz: {
    id: '',
    title: '',
    opened: false,
    level: '',
    materia: '',
    Questions: [],
  },
  addId: (id) => set((state) => ({ quiz: { ...state.quiz, id } }),),
  addTitle: (title) => set((state) => ({ quiz: { ...state.quiz, title } }),),
  addLevel: (level) => set((state) => ({ quiz: { ...state.quiz, level } }),),
  addMateria: (materia) => set((state) => ({ quiz: { ...state.quiz, materia } }),),
  addQuestions: (questions) => set((state) => ({ quiz: { ...state.quiz, questions } }),),
  resetQuiz: () => set((state) => ({ quiz: { id: '', title: '', opened: false, level: '', materia: '', Questions: [], } }),),
}))
