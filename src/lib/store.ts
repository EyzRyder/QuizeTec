import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserAttemptResponse, CreatingQuestionType } from "./type";

type QuestionsStoreType = {
  questions: CreatingQuestionType[] | [];
  addQuestion: (item: CreatingQuestionType) => void;
  editQuestion: (item: CreatingQuestionType, index: number) => void;
  deleteQuestion: (id: string) => void;
  resetQuestion: () => void;
};
type UserStoreType = {
  user: any | [];
  updateUser: (userData: any) => void;
};

type CurAnswersStoreType = {
  curQuestionIndex: number;
  curAnswers: UserAttemptResponse[] | [];
  addAnswer: (answer: UserAttemptResponse) => void;
  startQuiz: () => void;
  NextQuestion: () => void;
  resetAnswer: () => void;
};

export const useQuestionsStore = create<QuestionsStoreType>((set) => ({
  questions: [],
  addQuestion: (item) =>
    set((state) => ({ questions: [...state.questions, item] })),
  deleteQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((question) => question.id !== id),
    })),
  editQuestion: (item, index) =>
    set((state) => ({
      questions: state.questions.map((question, i) => {
        if (i == index) {
          return item;
        } else {
          return question;
        }
      }),
    })),
  resetQuestion: () => set((_) => ({ questions: [] })),
}));

export const useUserStore = create<UserStoreType>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        updateUser: (userData) => set((_) => ({ user: userData })),
      }),
      {
        name: "user-storage",
      },
    ),
  ),
);

export const useCurAnswersStore = create<CurAnswersStoreType>((set) => ({
  curQuestionIndex: 0,
  curAnswers: [],
  addAnswer: (answer) =>
    set((state) => ({ curAnswers: [...state.curAnswers, answer] })),
  resetAnswer: () => set((_) => ({ curAnswers: [] })),
  startQuiz: () => set((_) => ({ curQuestionIndex: 0 })),
  NextQuestion: () =>
    set((state) => ({ curQuestionIndex: state.curQuestionIndex + 1 })),
}));
