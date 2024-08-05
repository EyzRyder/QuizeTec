export interface QuestionType {
  id: string;
  title: string;
  type: string;
  Answers?: AnswersType[];
  AnswersId: string[];
  QuizId: string;
}

export interface AnswersType {
  id: string;
  letra?: string;
  title: string;
  isRight: boolean | number;
  QuestionId: string;
  questionType: string;
  QuizId: string;
}

export interface CreatingQuestionType {
  id: string;
  title: string;
  type: string;
  Answers: CreatingAnswersType[];
}

export interface CreatingAnswersType {
  id: string;
  title: string;
  isRight: boolean | number;
}

export interface QuizType {
  id: string;
  title: string;
  description: string;
  level: string;
  materia: string;
  Questions?: QuestionType[];
  QuestionsID: string[];
  createdBy: string;
  createdByName?: string | null;
  sharedWith: string[];
  isPublic?: boolean;
  isAnswersPublic?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OptionsType {
  id: string;
  nome: string;
}
export type QuizAnswers = {
  quizId: string;
  title: string;
  usersAnswer: UsersAnswerType[];
};

export type UsersAnswerType = {
  QuizId: string;
  UserId: string;
  createdAt: Date;
  id: string;
  tries: Attempt[];
  updatedAt: Date;
};

export type Attempt = {
  answers: UserAttemptResponse[];
  createdAt: Date;
};

export type UserAttemptResponse = {
  AnswerId: string;
  QuestionId: string;
  id: string;
  isRight: boolean | number;
};

export type UserType = {
  email: string;
  id: string;
  role?: string;
  userName: string;
};
