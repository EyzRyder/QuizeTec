export interface QuestionType {
  id: string
  title: string
  answers: AnswersType[]
}

export interface AnswersType {
  id: string
  letra: string
  title: string
  isRight: boolean
}

export interface QuizType {
  id: string
  title: string
  level: string
  materia: string
  Questions: QuestionType[]
  createdBy:string
}
export interface AnsweringType extends AnswersType {
  questionId: string,
  question: string,
}

export interface OptionsType {
  id: string
  nome: string
}