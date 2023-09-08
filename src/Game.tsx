import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import {ArrowForwardIos, ArrowBackIos,} from '@mui/icons-material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs' //el estilo

import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types'
import { Footer } from './Footer'


//Funcion que se crear una sola vez
const getAnswerColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // Usuario no ha seleccionado nada 
  if (userSelectedAnswer == null) return 'transparent'
  // Si ya selecciono pero la solucion es incorrecta
  if (index != correctAnswer && index != userSelectedAnswer) return 'transparent'
  // si es la solucion correcta
  if (index == correctAnswer) return 'green'
  //Si esta es la seleccion del usuario pero no es correcta
  if (index == userSelectedAnswer) return 'red'
  //Si no es ninguna de las anteriores
  return 'transparent'
}


const Question = ({ info }: { info: QuestionType }) => {

  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const handleAnswerClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }


  return (
    <Card variant='outlined' sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 2 }}>

      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={handleAnswerClick(index)}
              sx={{ backgroundColor: getAnswerColor(info, index), p: 2 }}
            
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Card>
  )
}


export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
  

  console.log(questions);

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion == 0}>
          <ArrowBackIos />
        </IconButton>

        {currentQuestion + 1}/{questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}