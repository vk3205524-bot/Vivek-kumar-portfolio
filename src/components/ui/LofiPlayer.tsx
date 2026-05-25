'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LofiPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check local storage for user preferences
    const savedPlayState = localStorage.getItem('lofi-music-enabled');
    const savedVolume = localStorage.getItem('lofi-music-volume');
    
    let initialVolume = 0.3;
    if (savedVolume !== null) {
      initialVolume = parseFloat(savedVolume);
      setVolume(initialVolume);
      setIsMuted(initialVolume === 0);
    }

    setIsReady(true);

    // Give React a frame to mount the audio element before we access the ref
    const timer = setTimeout(() => {
      const audio = audioRef.current;
      if (!audio) return;

      // Apply initial settings to DOM element
      audio.volume = initialVolume;
      audio.muted = initialVolume === 0;

      const handleAutoPlay = () => {
        if (savedPlayState === 'false') {
          // User explicitly paused it in a previous session, do not force play
          return;
        }
        
        audio.play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch((err) => {
            // Autoplay blocked by browser policy, keep listeners active
            console.log('Autoplay blocked. Audio will play on first interaction.', err);
          });
      };

      const removeInteractionListeners = () => {
        window.removeEventListener('click', handleAutoPlay);
        window.removeEventListener('scroll', handleAutoPlay);
        window.removeEventListener('touchstart', handleAutoPlay);
        window.removeEventListener('keydown', handleAutoPlay);
      };

      // Try playing immediately
      handleAutoPlay();

      // Set up listeners for the first interaction to bypass autoplay policy
      window.addEventListener('click', handleAutoPlay, { passive: true });
      window.addEventListener('scroll', handleAutoPlay, { passive: true });
      window.addEventListener('touchstart', handleAutoPlay, { passive: true });
      window.addEventListener('keydown', handleAutoPlay, { passive: true });

      return () => {
        removeInteractionListeners();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem('lofi-music-enabled', 'false');
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem('lofi-music-enabled', 'true');
        })
        .catch(err => console.error("Error playing audio:", err));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = val;
      audio.muted = val === 0;
    }
    setIsMuted(val === 0);
    localStorage.setItem('lofi-music-volume', val.toString());
    if (val > 0) {
      localStorage.setItem('lofi-music-enabled', 'true');
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.muted = newMuted;
    
    if (newMuted) {
      localStorage.setItem('lofi-music-volume', '0');
    } else {
      const restoreVol = volume > 0 ? volume : 0.3;
      audio.volume = restoreVol;
      setVolume(restoreVol);
      localStorage.setItem('lofi-music-volume', restoreVol.toString());
    }
  };

  if (!isReady) return null;

  return (
    <>
      {/* HTML5 Audio Element in DOM */}
      <audio
        ref={audioRef}
        src="/audio/lofi-ambient.mp3"
        loop
        preload="auto"
      />

      {/* Injected custom styles for visualizer bouncing animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lofi-bar-bounce {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
        .animate-lofi-bar-1 { animation: lofi-bar-bounce 1.0s ease-in-out infinite; transform-origin: bottom; }
        .animate-lofi-bar-2 { animation: lofi-bar-bounce 0.7s ease-in-out infinite 0.15s; transform-origin: bottom; }
        .animate-lofi-bar-3 { animation: lofi-bar-bounce 1.3s ease-in-out infinite 0.3s; transform-origin: bottom; }
        .animate-lofi-bar-4 { animation: lofi-bar-bounce 0.9s ease-in-out infinite 0.05s; transform-origin: bottom; }
        .animate-lofi-bar-5 { animation: lofi-bar-bounce 1.1s ease-in-out infinite 0.2s; transform-origin: bottom; }
      `}} />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
      >
        <div 
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className={`relative flex items-center gap-3 p-3 rounded-2xl glass-strong border border-cyber-cyan/20 shadow-glow-cyan/5 transition-all duration-500 ease-out overflow-hidden ${isExpanded ? 'w-64 max-w-xs' : 'w-[52px]'} h-[52px] group`}
        >
          {/* Neon Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Trigger Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="relative flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all duration-300"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              // Pause Icon
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <rect x="4" y="4" width="4" height="16" rx="1" />
                <rect x="16" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play Icon
              <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Expanded Content Panel */}
          <div className={`flex items-center justify-between w-full transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Track metadata */}
            <div className="flex flex-col gap-0.5 select-none overflow-hidden max-w-[120px]">
              <span className="text-[10px] font-mono tracking-widest text-cyber-cyan uppercase font-bold leading-none">
                Lofi Ambient
              </span>
              <span className="text-[9px] text-white/40 truncate font-sans">
                {isPlaying ? 'tuning in...' : 'muted/paused'}
              </span>
            </div>

            {/* Micro Equalizer Visualizer */}
            <div className="flex items-end gap-[2px] h-3.5 w-6 flex-shrink-0 mr-1">
              {[1, 2, 3, 4, 5].map((bar) => (
                <span
                  key={bar}
                  className={`w-[2px] bg-cyber-cyan rounded-full transition-all duration-300 ${isPlaying ? `animate-lofi-bar-${bar}` : 'h-[3px] opacity-30'}`}
                  style={{
                    height: isPlaying ? undefined : '3px',
                  }}
                />
              ))}
            </div>

            {/* Volume Deck */}
            <div className="flex items-center gap-1.5 flex-shrink-0 border-l border-white/10 pl-2">
              <button
                onClick={toggleMute}
                className="text-white/60 hover:text-cyber-cyan transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  // Mute Icon
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 2.94-1.56 5.51-3.89 6.91l1.41 1.41C19.9 18.57 21.5 15.48 21.5 12s-1.6-6.57-4.98-8.32l-1.41 1.41C17.44 6.49 19 9.06 19 12zM3 9v6h4l5 5V4L7 9H3zm7 5.5l-2.5-2.5H5v-2h2.5L10 7.5v7z" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  // Volume Icon
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm7 5.5l-2.5-2.5H5v-2h2.5L10 7.5v7zm4-2.5c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-12 h-1 rounded-lg appearance-none cursor-pointer bg-white/20 accent-cyber-cyan focus:outline-none transition-all duration-300 hover:bg-white/30"
                style={{
                  background: `linear-gradient(to right, #00f0ff 0%, #00f0ff ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Collapsed notification tooltip */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -10 }}
              className="px-2.5 py-1 rounded-md glass text-[8px] font-mono tracking-wider text-cyber-cyan border border-cyber-cyan/10 uppercase select-none pointer-events-none whitespace-nowrap shadow-glow-cyan/5"
            >
              {isPlaying ? 'LOFI PLAYING' : 'LOFI OFF'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
