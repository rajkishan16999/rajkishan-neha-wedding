import { useCountdown } from '../../hooks/useCountdown';
import { getWeddingInstant } from '../../utils/date';

export function CountdownTimer() {
  const weddingInstant = getWeddingInstant();
  const { days, hours, minutes, seconds, isComplete } = useCountdown(weddingInstant);

  if (isComplete) {
    return (
      <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-gold bg-cream/90 px-6 py-3 shadow-md backdrop-blur-sm">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-deep"></span>
        </span>
        <span className="font-serif text-lg font-bold tracking-wide text-maroon">
          The Celebrations are Underway! Bless the Couple 🌸
        </span>
      </div>
    );
  }

  const units = [
    { label: 'Days', hindi: 'दिन', value: days },
    { label: 'Hours', hindi: 'घंटे', value: hours },
    { label: 'Mins', hindi: 'मिनट', value: minutes },
    { label: 'Secs', hindi: 'सेकंड', value: seconds },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="group relative flex flex-col items-center justify-center rounded-2xl border border-gold/40 bg-ivory/90 px-3.5 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-gold hover:shadow-md sm:min-w-22 sm:px-5 sm:py-4"
        >
          {/* Subtle top gold highlight */}
          <div className="absolute inset-x-2 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-maroon tabular-nums">
            {String(unit.value).padStart(2, '0')}
          </span>
          <div className="mt-1 flex flex-col items-center">
            <span className="font-sans text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-widest text-muted">
              {unit.label}
            </span>
            <span className="text-deva text-[0.6rem] text-gold-deep/80 leading-none">
              {unit.hindi}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

