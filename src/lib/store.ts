import { create } from 'zustand';

import { AnsweringType, QuestionType, QuizType, quizAnswers } from './type';


type QuizStoreType = {
  quizes: QuizType[] | []
  addQuiz: (item: QuizType) => void
  addQuizes: (item: QuizType[]) => void
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
  questions: QuestionType[] | []
  addQuestion: (item: QuestionType) => void
  deleteQuestion: (id: string) => void
  resetQuestion: () => void
}
type UserStoreType = {
  user: any | []
  isUserAuthenticated: boolean | null
  updateUser: (userData: any) => void
  setIsUserAuthenticated: (data: any) => void
}

type CurAnswersStoreType = {
  curAnswers: AnsweringType[] | [],
  addAnswer: (answer: AnsweringType) => void,
  resetAnswer: () => void,
}
type useQuizeAnswersType = {
  quizeAnswers: quizAnswers[],
  userAnswerList: object[],
  addQuizeAnswers: (item: quizAnswers[]) => void,
  addCurUserAnswers: (item: object[]) => void,
}

export const useQuizStore = create<QuizStoreType>((set) => ({
  quizes: [],
  addQuiz: (item) => set((state) => ({ quizes: [...state.quizes, item] }),),
  addQuizes: (item) => set((state) => ({ quizes: [...item] }),),
  deleteQuiz: (id) => set((state) => ({ quizes: state.quizes.filter(quiz => quiz.id !== id) }))
}))
export const useQuizeAnswersStore = create<useQuizeAnswersType>((set) => ({
  quizeAnswers: [],
  userAnswerList: [],
  addQuizeAnswers: (item) => set((state) => ({ quizeAnswers: [...item] }),),
  addCurUserAnswers: (item) => set((state) => ({ userAnswerList: [...item] }),),

}))
export const useQuestionsStore = create<QuestionsStoreType>((set) => ({
  questions: [],
  addQuestion: (item) => set((state) => ({ questions: [...state.questions, item] }),),
  deleteQuestion: (id) => set((state) => ({ questions: state.questions.filter(question => question.id !== id) })),
  resetQuestion: () => set((state) => ({ questions: [] }),),
}))

export const useNewQuiz = create<AddingQuizStoreType>((set) => ({
  quiz: {
    id: '',
    title: '',
    level: '',
    materia: '',
    Questions: [],
    createdBy: ''
  },
  addId: (id) => set((state) => ({ quiz: { ...state.quiz, id } }),),
  addTitle: (title) => set((state) => ({ quiz: { ...state.quiz, title } }),),
  addLevel: (level) => set((state) => ({ quiz: { ...state.quiz, level } }),),
  addMateria: (materia) => set((state) => ({ quiz: { ...state.quiz, materia } }),),
  addQuestions: (questions) => set((state) => ({ quiz: { ...state.quiz, questions } }),),
  resetQuiz: () => set((state) => ({ quiz: { id: '', title: '', opened: false, level: '', materia: '', Questions: [], createdBy: '' } }),),
}))

export const useUserStore = create<UserStoreType>(
    (set) => (
      {
        user: null,
        isUserAuthenticated: false,
        updateUser: (userData) => set((state) => ({ user: userData })),
        setIsUserAuthenticated: (data) => set((state) => ({ isUserAuthenticated: data }))
      }
    )
);

export const useCurAnswersStore = create<CurAnswersStoreType>((set) => ({
  curAnswers: [],
  addAnswer: (answer) => set((state) => ({ curAnswers: [...state.curAnswers, answer] })),
  resetAnswer: () => set((state) => ({ curAnswers: [] })),
}))