// src/App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);

  const startGame = async () => {
    const response = await axios.post('http://localhost:3001/start_game');
    setGameId(response.data.gameId);
    setMessage(null);
    setGuess('');
  };
  useEffect(()=>{
    startGame()
  },[])


  const makeGuess = async () => {
    if (!gameId) return;

    const response = await axios.post('http://localhost:3001/guess', {
      gameId,
      guess: parseInt(guess, 10),
    });

    setMessage(response.data.message);

    if (response.data.status === 'guessed') {
      setTimeout(startGame, 2000);
    }
  };

  return (
    <div className="App">
      <h1>Вгадай число</h1>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Введіть число"
      />
      <button onClick={makeGuess}>Відправити</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default App;
