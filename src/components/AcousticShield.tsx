import { useState, useRef, useEffect } from 'react';
import { audioTracks } from '../content';

export function AcousticShield() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth || 800);
    let height = (canvas.height = canvas.offsetHeight || 120);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 800;
      height = canvas.height = canvas.offsetHeight || 120;
    };
    window.addEventListener('resize', onResize);

    let phase = 0;
    const render = () => {
      phase += isPlaying ? 0.08 : 0.015;
      ctx.clearRect(0, 0, width, height);

      const amp = isPlaying ? 28 * volume : 4;
      const centerY = height / 2;

      // Draw 3 harmonic ribbons in Camel, Light Apricot & Chocolate Brown
      const lines = [
        { color: 'rgba(187, 148, 87, 0.9)', speed: 1, freq: 0.015, width: 2.5 },
        { color: 'rgba(255, 230, 167, 0.65)', speed: 1.4, freq: 0.02, width: 1.5 },
        { color: 'rgba(153, 88, 42, 0.5)', speed: 0.7, freq: 0.01, width: 1 },
      ];

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.shadowBlur = isPlaying ? 10 : 0;
        ctx.shadowColor = line.color;

        for (let x = 0; x < width; x += 4) {
          const envelope = Math.sin((x / width) * Math.PI);
          const y =
            centerY +
            Math.sin(x * line.freq + phase * line.speed) *
              Math.cos(x * 0.005 + phase * 0.5) *
              amp *
              envelope;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [isPlaying, volume]);

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
      setIsPlaying(true);
      const track = audioTracks.find((t) => t.id === id);
      if (track && audioRef.current) {
        audioRef.current.src = track.file;
        audioRef.current.volume = volume;
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <section id="sounds" className="relative bg-[#000000] text-white py-28 px-4 sm:px-6 border-t border-[#432818]/60">
      <audio ref={audioRef} preload="none" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#432818]/60 pb-8 gap-6">
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold tracking-[0.25em] text-[#bb9457] uppercase flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#bb9457]" />
              OFFLINE AUDIO SYNTHESIZER
            </div>
            <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-white">
              The soundscapes that seal off the world.
            </h2>
          </div>
          <p className="font-sans text-sm text-neutral-400 max-w-sm leading-relaxed">
            Click any frequency below to sample the built-in sound engine with real-time waveform synthesis.
          </p>
        </div>

        {/* Minimal Player Container with Live Waveform Canvas */}
        <div className="rounded-3xl border border-[#432818]/80 bg-[#140d09]/90 backdrop-blur-xl p-6 sm:p-10 space-y-8 shadow-2xl">
          {/* Status & Volume Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#432818]/60 gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className={`size-2.5 rounded-full ${isPlaying ? 'bg-[#bb9457] animate-pulse' : 'bg-neutral-600'}`} />
              <span className="text-white font-medium tracking-wider">
                {isPlaying ? `SYNTHESIZING: ${activeTrack?.toUpperCase()} FREQUENCY` : 'ENGINE STANDBY • SELECT A FREQUENCY'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-neutral-400">
              <span className="text-[10px] uppercase">LEVEL:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-28 accent-[#bb9457] cursor-pointer"
                aria-label="Volume slider"
              />
              <span className="w-8 text-right font-mono text-[#ffe6a7] text-[11px]">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* Living Fluid Audio Waveform Canvas */}
          <div className="h-28 w-full rounded-2xl bg-black/80 border border-[#432818] relative overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* 4 Interactive Track Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audioTracks.map((track) => {
              const isActive = activeTrack === track.id && isPlaying;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => toggleTrack(track.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 group ${
                    isActive
                      ? 'border-[#bb9457] bg-[#bb9457]/20 shadow-[0_0_25px_rgba(187,148,87,0.3)] scale-102'
                      : 'border-[#432818]/60 bg-[#1c120c]/60 hover:border-[#bb9457]/50 hover:bg-[#1c120c] hover:scale-101'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2.5">
                    <span className="px-2 py-0.5 rounded bg-black/60 border border-[#432818] text-[#ffe6a7]">{track.badge}</span>
                    <span className={isActive ? 'text-[#ffe6a7] font-bold' : 'text-neutral-500'}>
                      {isActive ? '● ACTIVE' : 'STANDBY'}
                    </span>
                  </div>

                  <h3 className="font-display text-base text-white font-bold group-hover:text-[#ffe6a7] transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-300 font-sans leading-relaxed">
                    {track.sub}
                  </p>

                  <div className="mt-5 pt-3 border-t border-[#432818]/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#bb9457] font-medium group-hover:text-[#ffe6a7] transition-colors">
                      {isActive ? 'Pause Soundscape' : 'Engage Freq'}
                    </span>
                    <span className="size-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[11px] group-hover:bg-[#bb9457] group-hover:text-[#20130b] transition-colors">
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
