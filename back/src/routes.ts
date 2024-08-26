import { Request, Response } from 'express';

interface Game {
  id: string;
  secretNumber: number;
}

const games: { [key: string]: Game } = {};

const generateGameId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const startGame = (req: Request, res: Response) => {
  const gameId = generateGameId();
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  games[gameId] = { id: gameId, secretNumber };
  res.status(200).json({ gameId });
};

export const makeGuess = (req: Request, res: Response) => {
  const { gameId, guess } = req.body;
  const game = games[gameId];

  if (!game) {
    return res.status(400).json({ message: 'Game not found.' });
  }

  if (isNaN(guess)) {
    return res.status(400).json({ message: 'Invalid guess. Please provide a number.' });
  }

  if (guess < game.secretNumber) {
    res.status(200).json({ message: 'The secret number is higher.', status: 'wrong' });
  } else if (guess > game.secretNumber) {
    res.status(200).json({ message: 'The secret number is lower.', status: 'wrong' });
  } else {
    delete games[gameId];
    res.status(200).json({ message: 'Congratulations! You guessed the number.', status: 'guessed' });
  }
};
