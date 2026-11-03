import { useMemo } from 'react';

interface PetalItem {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  color: string;
  opacity: number;
}

export function Petals() {
  const petals = useMemo<PetalItem[]>(() => {
    const colors = [
      '#f59e0b', // marigold gold
      '#d97706', // deep amber
      '#e11d48', // rose crimson
      '#fb7185', // soft rose pink
      '#c49a48', // royal gold
    ];

    return Array.from({ length: 24 }, (_, i) => {
      const left = `${(i * 4.1 + (i % 3) * 1.5).toFixed(1)}%`;
      const delay = `${((i * 0.7) % 6).toFixed(1)}s`;
      const duration = `${(7 + (i % 5) * 1.8).toFixed(1)}s`;
      const size = 12 + (i % 4) * 4;
      const color = colors[i % colors.length]!;
      const opacity = 0.65 + (i % 3) * 0.12;

      return { id: i, left, delay, duration, size, color, opacity };
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 24 32"
            fill={p.color}
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
              transform: `rotate(${p.id * 35}deg)`,
            }}
          >
            <path d="M12 0 C18 8 24 18 16 30 C12 33 8 30 4 24 C-2 16 4 6 12 0 Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

