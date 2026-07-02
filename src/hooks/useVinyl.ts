import { useEffect, useCallback, useRef } from 'react';

export const useVinyl = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const audio = new Audio('/sounds/vnyl_intro.mp3');
    audio.loop = false;
    audio.volume = 0.3;
    audio.preload = "none";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startAtmosphere = useCallback(() => {
    const audio = audioRef.current;

    if (audio && !hasPlayed.current) {
      audio.preload = "auto";
      audio.currentTime = 0;

      audio.play()
        .then(() => {
          hasPlayed.current = true;
        })
        .catch(() => {});
    }
  }, []);

  return { startAtmosphere };
};