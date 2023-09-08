import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { JavaScriptLogo } from "./JavaScriptLogo";
import { Start } from "./Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./Game";


function App() {
  const questions = useQuestionsStore(state => state.questions)
  console.log(questions);
  
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptLogo/>
          <Typography variant="h2" component="h1">
            Squizz Game
          </Typography>
        </Stack>

        {
          questions.length === 0 ? <Start/> : <Game></Game>    
        }

      </Container>
    </main>
  );
}

export default App;
