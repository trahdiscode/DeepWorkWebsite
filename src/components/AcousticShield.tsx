import { useState, useRef, useEffect } from 'react';
import { audioTracks } from '../content';
import { useTheme } from '../context/ThemeContext';

export function AcousticShield() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const { isLight } = useTheme();
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
    <section
      id="sounds"
      className={`relative py-28 px-4 sm:px-6 border-t overflow-hidden w-full max-w-full transition-colors duration-300 ${
        isLight ? 'bg-[#f5efe6] text-[#20130b] border-[#bb9457]/20' : 'bg-[#000000] text-white border-[#432818]/60'
      }`}
    >
      <audio ref={audioRef} preload="none" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between border-b pb-8 gap-6 ${isLight ? 'border-[#bb9457]/20' : 'border-[#432818]/60'}`}>
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold tracking-[0.25em] text-[#bb9457] uppercase flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#bb9457]" />
              OFFLINE AUDIO SYNTHESIZER
            </div>
            <h2 className={`font-display text-3xl sm:text-5xl tracking-wide transition-colors ${isLight ? 'text-[#20130b]' : 'text-white'}`}>
              The soundscapes that seal off the world.
            </h2>
          </div>
          <p className={`font-sans text-sm max-w-sm leading-relaxed transition-colors ${isLight ? 'text-[#6b584c]' : 'text-neutral-400'}`}>
            Click any frequency below to sample the built-in sound engine with real-time waveform synthesis.
          </p>
        </div>

        {/* Minimal Player Container with Live Waveform Canvas */}
        <div
          className={`rounded-3xl border backdrop-blur-xl p-6 sm:p-10 space-y-8 transition-all duration-300 ${
            isLight
              ? 'border-[#bb9457]/25 bg-white/95 shadow-[0_15px_45px_rgba(67,40,24,0.06)]'
              : 'border-[#432818]/80 bg-[#140d09]/90 shadow-2xl'
          }`}
        >
          {/* Status & Volume Strip */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-4 font-mono text-xs ${isLight ? 'border-[#bb9457]/20' : 'border-[#432818]/60'}`}>
            <div className="flex items-center gap-3 min-w-0">
              <span className={`size-2.5 rounded-full shrink-0 ${isPlaying ? 'bg-[#bb9457] animate-pulse' : 'bg-neutral-600'}`} />
              <span className={`font-medium tracking-wider text-[11px] sm:text-xs truncate ${isLight ? 'text-[#20130b]' : 'text-white'}`}>
                {isPlaying ? `SYNTHESIZING: ${activeTrack?.toUpperCase()} FREQUENCY` : 'ENGINE STANDBY • SELECT A FREQUENCY'}
              </span>
            </div>

            <div className={`flex items-center gap-3 shrink-0 ${isLight ? 'text-[#6b584c]' : 'text-neutral-400'}`}>
              <span className="text-[10px] uppercase font-semibold">LEVEL:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 sm:w-28 accent-[#bb9457] cursor-pointer"
                aria-label="Volume slider"
              />
              <span className={`w-8 text-right font-mono text-[11px] font-bold ${isLight ? 'text-[#6f1d1b]' : 'text-[#ffe6a7]'}`}>
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* Living Fluid Audio Waveform Canvas */}
          <div className="h-28 w-full rounded-2xl bg-[#18110b] border border-[#432818] relative overflow-hidden flex items-center justify-center shadow-inner">
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
                      ? isLight
                        ? 'border-[#6f1d1b] bg-[#ffe6a7]/35 shadow-[0_4px_25px_rgba(111,29,27,0.12)] scale-102'
                        : 'border-[#bb9457] bg-[#bb9457]/20 shadow-[0_0_25px_rgba(187,148,87,0.3)] scale-102'
                      : isLight
                      ? 'border-[#bb9457]/20 bg-[#faf7f2] hover:border-[#bb9457]/60 hover:bg-white shadow-sm hover:scale-101'
                      : 'border-[#432818]/60 bg-[#1c120c]/60 hover:border-[#bb9457]/50 hover:bg-[#1c120c] hover:scale-101'
                  }`}
                >
                  <div className={`flex items-center justify-between text-[10px] font-mono mb-2.5 ${isLight ? 'text-[#6b584c]' : 'text-neutral-400'}`}>
                    <span className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-[#bb9457]/30 text-[#432818]' : 'bg-black/60 border-[#432818] text-[#ffe6a7]'}`}>
                      {track.badge}
                    </span>
                    <span className={isActive ? (isLight ? 'text-[#6f1d1b] font-bold' : 'text-[#ffe6a7] font-bold') : 'text-neutral-500'}>
                      {isActive ? '● ACTIVE' : 'STANDBY'}
                    </span>
                  </div>

                  <h3 className={`font-display text-base font-bold transition-colors ${isLight ? 'text-[#20130b] group-hover:text-[#6f1d1b]' : 'text-white group-hover:text-[#ffe6a7]'}`}>
                    {track.title}
                  </h3>
                  <p className={`mt-1.5 text-xs font-sans leading-relaxed ${isLight ? 'text-[#6b584c]' : 'text-neutral-300'}`}>
                    {track.sub}
                  </p>

                  <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${isLight ? 'border-[#bb9457]/20' : 'border-[#432818]/60'}`}>
                    <span className={`font-medium transition-colors ${isLight ? 'text-[#432818] group-hover:text-[#6f1d1b]' : 'text-[#bb9457] group-hover:text-[#ffe6a7]'}`}>
                      {isActive ? 'Pause Soundscape' : 'Engage Freq'}
                    </span>
                    <span
                      className={`size-6 rounded-full flex items-center justify-center text-[11px] transition-colors ${
                        isLight
                          ? 'bg-[#432818]/10 text-[#432818] group-hover:bg-[#432818] group-hover:text-white'
                          : 'bg-white/10 text-white group-hover:bg-[#bb9457] group-hover:text-[#20130b]'
                      }`}
                    >
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
