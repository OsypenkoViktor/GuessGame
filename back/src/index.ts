import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { startGame, makeGuess } from './routes';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/start_game', startGame);
app.post('/guess', makeGuess);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
