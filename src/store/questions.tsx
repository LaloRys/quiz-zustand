import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'
import data from '../assets/data.json'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}
//Persist devuelve una funcion por eso () ante de el
export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0, //Posicion de array de cuestion

    fetchQuestions: async (limit: number) => {
      // const res = await fetch('http://localhost:5173/data.json')
      // const json = await res.json()
      
      const questions = data.sort(() => Math.random() -0.5).slice(0, limit)
      set({questions})
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const state = get()
      //Usar structuredClone para clonar el objeto
      const newQuestions = structuredClone(state.questions)
      //Encontramos el indice de la pregunta 
      const questionIndex = newQuestions.findIndex( q => q.id === questionId)
      //Obtenemos la informacion de la pregunta
      const questionInfo = newQuestions[questionIndex]
      //Obtenemos la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if(isCorrectUserAnswer) confetti()

      //Cambiar la informacion en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo, 
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      //Actualizar el estado
      set({questions: newQuestions})
    },
    goNextQuestion: () => {
      const {currentQuestion, questions} = get()
      const nextQuestion = currentQuestion + 1

      if(nextQuestion < questions.length) {
        set({currentQuestion: nextQuestion})
      }
    },
    goPreviousQuestion: () => {
      const {currentQuestion} = get()
      const prevQuestion = currentQuestion - 1

      if(prevQuestion >= 0) {
        set({currentQuestion: prevQuestion})
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
},{
  name: 'questions-storage',
  // getStorage: () => sessionStorage  | Por defecto es localStorage
})))