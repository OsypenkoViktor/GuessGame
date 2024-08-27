import { Request, Response } from 'express';

interface Game {
  id: string;
  secretNumber: number;
}

const games: { [key: string]: Game } = {};

//дозволяє грати з кількома гравцями. Генерацію поцупив у чатаGPT, сподобався підхід
const generateGameId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

export const startGame = (req: Request, res: Response) => {
  const gameId = generateGameId();
  //генерація самого номера для вгадування
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  games[gameId] = { id: gameId, secretNumber };
  res.status(200).json({ gameId });
};

export const makeGuess = (req: Request, res: Response) => {
  const { gameId, guess } = req.body;
  const game = games[gameId];

  if (!game) {
    return res.status(400).json({ message: 'Гра не знайдена' });
  }

  if (isNaN(guess)) {
    return res.status(400).json({ message: 'Щось пішло не так. Спробуй-но ще раз!' });
  }

  if (guess < game.secretNumber) {
    res.status(200).json({ message: 'Загадане число більше', status: 'wrong' });
  } else if (guess > game.secretNumber) {
    res.status(200).json({ message: 'Загадане число меньше', status: 'wrong' });
  } else {
    delete games[gameId];
    res.status(200).json({ message: 'Число вгадано!', status: 'guessed' });
  }
};
