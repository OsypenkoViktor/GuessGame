import React, { useEffect, useState } from "react";
import AudioPlayer from './helpers/AudioPlayer';
import sound from "./assets/bgSound.mp3"
import failSound from "./assets/errorSound.mp3"
import succSound from "./assets/successSound.mp3"
import axios from "axios";
import "./App.css";
import {
  appStyle,
  buttonStyle,
  centralDivStyle,
  infoMessage,
  inputStyle,
} from "./cssInJs";

const App: React.FC = () => {

  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  //Дозволяє серверу обробляти запити з кількох клієнтів. 
  const [gameId, setGameId] = useState<string | null>(null);

  const [failureSound] = useState<HTMLAudioElement>(new Audio(failSound));
  const [successSound] = useState<HTMLAudioElement>(new Audio(succSound));

  //в конкретно цій аплікації файл зі змінними енва зовсім не обов'язковий.
  //код нижче - просто ілюстрація того що я розумію як працювати з данними
  const apiUrl = import.meta.env.VITE_API_URL;

  const startGame = async () => {
    //розумію що логічніше в данному конкретному випадку було б налаштувати базовий URL для аксіоса.
    const response = await axios.post(apiUrl + "/start_game");
    setGameId(response.data.gameId);
    setMessage(null);
    setGuess("");
  };
  useEffect(() => {
    startGame();
  }, []);

  const makeGuess = async () => {
    if (!gameId) return;
    const response = await axios.post(apiUrl + "/guess", {
      gameId,
      guess: parseInt(guess),
    });
    setMessage(response.data.message);
    if (response.data.status === "guessed") {
      successSound.play()
      setTimeout(startGame, 2000);
    }else{
      failureSound.play()
    } 
  };

  // умисно не використовував ніяких UI - бібліотек і інших прикрашань.
  return (
    <div style={appStyle} className="App">
      <div className="title">
      <h1>Вгадай число</h1>
      </div>
      <div style={centralDivStyle}>
      <AudioPlayer src={sound} loop={true} />
      <input
        style={inputStyle}
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Введіть число"
      />
        <button style={buttonStyle} onClick={makeGuess}>Відправити</button>
        </div>
        <div style={infoMessage}>{message||"Спробуй вгадати число!"}</div>
    </div>
  );
};

export default App;

