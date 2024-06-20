export interface QuestionType {
  id: string;
  title: string;
  type: string;
  answers: AnswersType[];
}

export interface AnswersType {
  id: string;
  letra: string;
  title: string;
  isRight: boolean;
}

export interface QuizType {
  id: string;
  title: string;
  level: string;
  materia: string;
  Questions: QuestionType[];
  createdBy: string;
}
export interface AnsweringType extends AnswersType {
  questionId: string;
  question: string;
}

export interface OptionsType {
  id: string;
  nome: string;
}
export type quizAnswers = {
  quizId: string;
  title: string;
  usersAnswer: usersAnswerType[];
};

export type usersAnswerType = {
  userId: string;
  pastAnswers: pastAnswersType[];
};

type pastAnswersType = {
  questions: questionsType[];
};
type questionsType = {
  questionId: string;
  title: string;
  isRight: boolean;
  question: string;
  id: string;
  letra: string;
};
