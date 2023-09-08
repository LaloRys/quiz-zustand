import { Button } from "@mui/material"
import { useQuestionsStore } from "./store/questions"

const LIMIT_QUESTIONS = 10

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleStart =() => {
    fetchQuestions(LIMIT_QUESTIONS)
  }
  return (
    <Button onClick={handleStart} variant="contained">
      Empezar
    </Button>
  )
}