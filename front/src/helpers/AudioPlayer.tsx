// компонент для програвання фонової музики.
import React, { useEffect, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, loop = false }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audioInstance = new Audio(src);
    audioInstance.loop = loop;
    setAudio(audioInstance);

    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
      }
    };
  }, [src, loop]);

  useEffect(() => {
    if (audio) {
      audio.muted = isMuted;
    }
  }, [isMuted, audio]);

  const startPlayback = () => {
    if (audio) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Помилка програвання : ', error);
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(prevMuted => !prevMuted);
  };
  
// Тут лишив стилі всередині компоненту для доступа до змінної isMuted
// та динамічної зміни стилів. Так, костилі я теж вмію ліпити. 
    const muteButtonStyle:React.CSSProperties = {
        width:"150px",
        height:"150px",
        borderRadius:"50%",
        backgroundColor: isMuted?"black":"green",
        color: isMuted?"white":"white"
    }

  return (
    <div>
      {!isPlaying && (
        <button style={muteButtonStyle} onClick={startPlayback}>
          Play Music
        </button>
      )}
      {isPlaying && (
        <button style={muteButtonStyle} onClick={toggleMute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      )}
    </div>

  );
};

export default AudioPlayer;
