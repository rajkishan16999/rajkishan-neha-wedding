import { useEffect, useState } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the target moment has been reached or passed. */
  isComplete: boolean;
}

function compute(targetMs: number, nowMs: number): CountdownState {
  // Clamp at zero — the countdown must never show negative values.
  const diff = Math.max(0, targetMs - nowMs);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    isComplete: diff === 0,
  };
}

/**
 * Live countdown to an absolute instant. The target should be created with an
 * explicit UTC offset (see `istDateTime`) so it is correct in every time zone.
 * Ticks are aligned to the wall-clock second to avoid drift and skipped seconds.
 */
export function useCountdown(target: Date): CountdownState {
  const targetMs = target.getTime();
  const [state, setState] = useState<CountdownState>(() => compute(targetMs, Date.now()));

  useEffect(() => {
    let timer: number | undefined;

    const tick = () => {
      const now = Date.now();
      const next = compute(targetMs, now);
      setState(next);
      if (!next.isComplete) {
        timer = window.setTimeout(tick, 1000 - (now % 1000) + 5);
      }
    };

    tick();

    // Re-sync immediately when the tab becomes visible again (mobile browsers
    // throttle timers in background tabs).
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        window.clearTimeout(timer);
        tick();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [targetMs]);

  return state;
}
