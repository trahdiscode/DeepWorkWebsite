import { useState, useRef, useEffect } from 'react';
import { audioTracks } from '../content';

export function AcousticShield() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop/play when active track changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (activeTrack) {
      const track = audioTracks.find((t) => t.id === activeTrack);
      if (track) {
        audioRef.current.src = track.file;
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeTrack]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleTrack = (id: string) => {
    if (activeTrack === id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setActiveTrack(id);
    }
  };

  return (
    <section id="acoustic" className="relative bg-[#05070c] text-white py-24 px-4 sm:px-8 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-amber-500/10 via-cyan-500/5 to-transparent blur-[120px] pointer-events-none"
      />

      <audio ref={audioRef} preload="none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2">
              <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
              ACOUSTIC RESONANCE ENGINE
            </div>
            <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-white">
              Test the soundscapes that seal off the world.
            </h2>
          </div>
          <p className="font-sans text-sm text-neutral-400 max-w-md leading-relaxed">
            Click any frequency below to sample the offline sound synthesizer bundled directly inside the Deep Work APK.
          </p>
        </div>

        {/* Console & Soundwave HUD */}
        <div className="rounded-2xl border border-white/10 bg-[#0b0f18]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <span className={`size-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 shadow-[0_0_10px_#10b981] animate-ping' : 'bg-neutral-600'}`} />
              <span className="text-white font-bold tracking-widest">
                {isPlaying ? `TRANSMITTING: ${activeTrack?.toUpperCase()}` : 'ENGINE IDLE // SELECT FREQUENCY'}
              </span>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-neutral-400 uppercase">SYNTH LEVEL:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-28 accent-amber-500 cursor-pointer"
                aria-label="Volume slider"
              />
              <span className="w-8 text-right font-mono text-white text-[11px]">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* Sound Wave Graphic Simulation */}
          <div className="h-20 sm:h-24 rounded-lg bg-black/60 border border-white/5 flex items-center justify-center px-4 gap-1 sm:gap-1.5 overflow-hidden">
            {Array.from({ length: 48 }).map((_, i) => {
              const active = isPlaying;
              const heightMultiplier = active ? (Math.sin(i * 0.35 + Date.now() * 0.003) * 0.5 + 0.5) : 0.15;
              const barHeight = Math.max(8, heightMultiplier * 70);
              return (
                <div
                  key={i}
                  className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                    active ? 'bg-gradient-to-t from-amber-500 to-cyan-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-white/10'
                  }`}
                  style={{ height: `${barHeight}px` }}
                />
              );
            })}
          </div>

          {/* 4 Interactive Audio Track Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audioTracks.map((track) => {
              const isActive = activeTrack === track.id && isPlaying;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => toggleTrack(track.id)}
                  className={`text-left p-5 rounded-xl border transition-all duration-300 relative group overflow-hidden ${
                    isActive
                      ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                      : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-neutral-400 mb-3">
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">
                      {track.type}
                    </span>
                    <span className={isActive ? 'text-amber-400 font-bold' : 'text-neutral-500'}>
                      {isActive ? '● PLAYING' : 'READY'}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-white font-bold group-hover:text-amber-400 transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-300 font-sans leading-relaxed">
                    {track.sub}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400/90 font-medium">
                      {isActive ? 'Click to Pause' : 'Click to Engage'}
                    </span>
                    <span className="size-5 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px]">
                      {isActive ? '❚❚' : '▶'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
