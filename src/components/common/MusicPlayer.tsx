import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingConfig } from '../../config/weddingConfig';

export function MusicPlayer() {
  const { src, title } = weddingConfig.music;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audioRef.current = audio;

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  if (!src) return null;

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Playback error:', err);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={toggleMusic}
        title={isPlaying ? 'Pause background music' : `Play ${title}`}
        aria-label={isPlaying ? 'Pause background music' : `Play ${title}`}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full border border-gold/60 bg-ivory/90 text-maroon shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:shadow-xl active:scale-95"
      >
        <span
          className={`absolute inset-0 rounded-full bg-gold/20 transition-opacity duration-500 ${
            isPlaying ? 'animate-ping opacity-60' : 'opacity-0'
          }`}
        />
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-gold-deep transition-transform group-hover:scale-110" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Music className="h-5 w-5 text-muted transition-transform group-hover:scale-110" />
            <VolumeX className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-maroon" />
          </div>
        )}
      </button>
    </div>
  );
}
