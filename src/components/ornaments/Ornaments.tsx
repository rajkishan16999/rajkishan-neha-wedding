import { useId, type SVGProps } from 'react';

type SvgProps = SVGProps<SVGSVGElement>;

/* ─────────────────────────── Mandala ─────────────────────────── */

/** Fine-line mandala drawn in `currentColor`. Purely decorative. */
export function Mandala(props: SvgProps) {
  const outer = Array.from({ length: 24 }, (_, i) => i * 15);
  const mid = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="-100 -100 200 200" fill="none" stroke="currentColor" strokeWidth={0.55} aria-hidden="true" {...props}>
      <circle r={98} />
      <circle r={94.5} strokeDasharray="0.8 2.6" />
      {outer.map((deg) => (
        <g key={`o${deg}`} transform={`rotate(${deg})`}>
          <path d="M0,-91 C7,-81 8,-68 0,-60 C-8,-68 -7,-81 0,-91Z" />
          <path d="M0,-84 C3,-78 3,-71 0,-66 C-3,-71 -3,-78 0,-84Z" />
          <circle cx={0} cy={-76} r={1.2} transform="rotate(7.5)" fill="currentColor" stroke="none" />
        </g>
      ))}
      <circle r={58} />
      <circle r={55} strokeDasharray="0.6 2" />
      {mid.map((deg) => (
        <path key={`m${deg}`} transform={`rotate(${deg})`} d="M0,-53 C11,-44 11,-34 0,-28 C-11,-34 -11,-44 0,-53Z" />
      ))}
      <circle r={27} />
      <circle r={23.5} strokeDasharray="0.6 1.8" />
      {inner.map((deg) => (
        <path key={`i${deg}`} transform={`rotate(${deg})`} d="M0,-21 C6,-15 6,-9 0,-5 C-6,-9 -6,-15 0,-21Z" />
      ))}
      <circle r={3.2} fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ─────────────────────────── Divider ─────────────────────────── */

/** Ornamental gold divider with a lotus-diamond centrepiece. */
export function GoldDivider({ className = '', ...props }: SvgProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 240 24" className={`h-5 w-48 sm:w-60 ${className}`} fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`dl${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#c49a48" stopOpacity="0" />
          <stop offset="1" stopColor="#c49a48" />
        </linearGradient>
        <linearGradient id={`dr${id}`} x1="1" x2="0">
          <stop offset="0" stopColor="#c49a48" stopOpacity="0" />
          <stop offset="1" stopColor="#c49a48" />
        </linearGradient>
      </defs>
      <path d="M2 12H98" stroke={`url(#dl${id})`} strokeWidth="1" />
      <path d="M142 12H238" stroke={`url(#dr${id})`} strokeWidth="1" />
      <g stroke="#c49a48" strokeWidth="0.9">
        <path d="M120 2.5 L128 12 L120 21.5 L112 12Z" />
        <path d="M112 12 C107 6.5 102 7.5 100.5 12 C102 16.5 107 17.5 112 12Z" />
        <path d="M128 12 C133 6.5 138 7.5 139.5 12 C138 16.5 133 17.5 128 12Z" />
      </g>
      <path d="M120 7 L124 12 L120 17 L116 12Z" fill="#791f2b" />
      <circle cx="96" cy="12" r="1.5" fill="#c49a48" />
      <circle cx="144" cy="12" r="1.5" fill="#c49a48" />
    </svg>
  );
}

/* ─────────────────────────── Lotus ─────────────────────────── */

export function Lotus(props: SvgProps) {
  return (
    <svg viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M32 3 C38.5 13 38.5 25 32 34 C25.5 25 25.5 13 32 3Z" fill="currentColor" fillOpacity={0.12} />
      <path d="M32 34 C24 30 17 22 15 11 C23 13.5 29.5 21 32 34Z" />
      <path d="M32 34 C40 30 47 22 49 11 C41 13.5 34.5 21 32 34Z" />
      <path d="M32 34 C22 34.5 10 31 3.5 22 C14 19.5 25 24 32 34Z" />
      <path d="M32 34 C42 34.5 54 31 60.5 22 C50 19.5 39 24 32 34Z" />
      <path d="M12 37.5 H52" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────── Kalash ─────────────────────────── */

/** Traditional kalash with coconut and mango leaves in gold line art. */
export function Kalash(props: SvgProps) {
  const id = useId().replace(/:/g, '');
  const leaves = [-62, -34, 34, 62];
  return (
    <svg viewBox="0 0 120 160" fill="none" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`kg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dfae" />
          <stop offset="0.5" stopColor="#d9b875" />
          <stop offset="1" stopColor="#a57c32" />
        </linearGradient>
      </defs>
      {/* Mango leaves */}
      {leaves.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 60 58)`}>
          <path d="M60 58 C51 45 50 30 57 16 C64 30 65 45 60 58Z" fill="#c49a48" fillOpacity={0.18} stroke="#a57c32" strokeWidth={1} />
          <path d="M60 56 C58 44 57.5 31 57 19" stroke="#a57c32" strokeWidth={0.6} />
        </g>
      ))}
      {/* Coconut */}
      <path d="M60 13 C71 18 76 32 72.5 45 C69 53 51 53 47.5 45 C44 32 49 18 60 13Z" fill="#791f2b" fillOpacity={0.12} stroke="#791f2b" strokeWidth={1.1} />
      <path d="M60 13 C58 9 61 6 63.5 7.5" stroke="#791f2b" strokeWidth={1} />
      <path d="M53 26 C55 32 55 40 52.5 46 M60 22 V48 M67 26 C65 32 65 40 67.5 46" stroke="#791f2b" strokeWidth={0.5} strokeOpacity={0.6} />
      {/* Rim */}
      <ellipse cx="60" cy="59" rx="25" ry="5" fill={`url(#kg${id})`} stroke="#a57c32" strokeWidth={1} />
      {/* Body */}
      <path
        d="M41 62 C42 69 45 73 40 79 C22 91 20 123 39 139 C49 147 71 147 81 139 C100 123 98 91 80 79 C75 73 78 69 79 62"
        fill={`url(#kg${id})`}
        fillOpacity={0.55}
        stroke="#a57c32"
        strokeWidth={1.2}
      />
      {/* Decorative bands */}
      <path d="M33 92 C50 98 70 98 87 92" stroke="#791f2b" strokeWidth={1} />
      <path d="M28 120 C49 127 71 127 92 120" stroke="#791f2b" strokeWidth={1} />
      <g fill="#791f2b">
        {[40, 50, 60, 70, 80].map((x) => (
          <circle key={x} cx={x} cy={x === 60 ? 96.5 : x === 50 || x === 70 ? 95.8 : 94.6} r={1.2} />
        ))}
      </g>
      {/* Centre lotus motif */}
      <g transform="translate(47 100) scale(0.42)" stroke="#791f2b" strokeWidth={2}>
        <path d="M32 3 C38.5 13 38.5 25 32 34 C25.5 25 25.5 13 32 3Z" fill="#791f2b" fillOpacity={0.2} />
        <path d="M32 34 C24 30 17 22 15 11 C23 13.5 29.5 21 32 34Z" />
        <path d="M32 34 C40 30 47 22 49 11 C41 13.5 34.5 21 32 34Z" />
      </g>
      {/* Base */}
      <ellipse cx="60" cy="146" rx="22" ry="4" fill="#c49a48" fillOpacity={0.35} stroke="#a57c32" strokeWidth={1} />
    </svg>
  );
}

/* ─────────────────────────── Hanging bell ─────────────────────────── */

/** Temple bell on a chain; swings gently via CSS (disabled for reduced motion). */
export function HangingBell({ className = '', ...props }: SvgProps) {
  const links = Array.from({ length: 9 }, (_, i) => i * 9 + 4);
  return (
    <svg viewBox="0 0 40 150" fill="none" stroke="#a57c32" aria-hidden="true" className={`origin-top animate-swing ${className}`} {...props}>
      {links.map((y) => (
        <ellipse key={y} cx="20" cy={y} rx="2.4" ry="4.2" strokeWidth={1.1} />
      ))}
      <circle cx="20" cy="86" r="3.2" fill="#c49a48" strokeWidth={1} />
      <path
        d="M20 89 C12 89 9.5 97 9.5 107 C9.5 115 7 119 4 123.5 H36 C33 119 30.5 115 30.5 107 C30.5 97 28 89 20 89Z"
        fill="#d9b875"
        fillOpacity={0.55}
        strokeWidth={1.2}
      />
      <path d="M11 101 H29 M10 112 H30" stroke="#791f2b" strokeWidth={0.9} />
      <path d="M3 123.5 H37" strokeWidth={1.6} />
      <circle cx="20" cy="129" r="3" fill="#791f2b" stroke="none" />
      <path d="M20 132 V141 M17 141 L20 147 L23 141Z" stroke="#791f2b" strokeWidth={0.9} fill="#791f2b" fillOpacity={0.5} />
    </svg>
  );
}

/* ─────────────────────────── Card corner ─────────────────────────── */

/** Filigree corner for printed-card style frames. Rotate for each corner. */
export function CardCorner(props: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 70 V6 H70" strokeWidth={1.1} />
      <path d="M12 52 V12 H52" strokeWidth={0.6} />
      <path d="M6 34 C17 34 24 27 24 16 C24 9.5 19.5 6 13 6" strokeWidth={0.9} />
      <path d="M34 6 C34 17 27 24 16 24 C9.5 24 6 19.5 6 13" strokeWidth={0.9} />
      <path d="M24 24 C31 31 40 31 46 25 C40 23 34 21 24 24Z" fill="currentColor" fillOpacity={0.15} strokeWidth={0.8} />
      <path d="M24 24 C31 31 31 40 25 46 C23 40 21 34 24 24Z" fill="currentColor" fillOpacity={0.15} strokeWidth={0.8} />
      <circle cx="18" cy="18" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="74" cy="6" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="6" cy="74" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Places a CardCorner in all four corners of a relatively-positioned parent. */
export function FourCorners({ className = 'h-14 w-14 sm:h-20 sm:w-20 text-gold', inset = 'inset-3' }: { className?: string; inset?: string }) {
  const base = `pointer-events-none absolute ${className}`;
  return (
    <div className={`pointer-events-none absolute ${inset}`} aria-hidden="true">
      <CardCorner className={`${base} left-0 top-0`} />
      <CardCorner className={`${base} right-0 top-0 -scale-x-100`} />
      <CardCorner className={`${base} bottom-0 left-0 -scale-y-100`} />
      <CardCorner className={`${base} bottom-0 right-0 -scale-100`} />
    </div>
  );
}
