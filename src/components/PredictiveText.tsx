import * as React from 'react';

interface PredictiveTextProps {
  text: string;
  className?: string;
  replayable?: boolean;
  label?: string;
}

export function PredictiveText({ text, className, replayable = false, label }: PredictiveTextProps) {
  const [displayed, setDisplayed] = React.useState(() => text[0] ?? '');
  const [activeIndex, setActiveIndex] = React.useState(1);
  const [runId, setRunId] = React.useState(0);
  const tokenDelayMs = 8;

  React.useEffect(() => {
    const letters = text.split('');
    const candidateSets = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
    };

    setDisplayed(letters[0] ?? '');
    setActiveIndex(1);

    function candidateFor(target: string, index: number, tick: number) {
      if (target === ' ') return '\u00A0';
      const pool = target === target.toUpperCase() ? candidateSets.upper : candidateSets.lower;
      return pool[(index * 7 + tick * 11) % pool.length];
    }

    const startedAt = performance.now();
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const tick = Math.floor(elapsed / 18);
      let nextActiveIndex = letters.length;
      const nextChars: string[] = [];

      letters.forEach((target, index) => {
        if (index === 0) {
          nextChars.push(target);
          return;
        }

        const start = 120 + index * tokenDelayMs;
        const lock = start + 86;

        if (elapsed >= lock) {
          nextChars.push(target === ' ' ? '\u00A0' : target);
          return;
        }

        if (elapsed >= start) {
          nextActiveIndex = Math.min(nextActiveIndex, index);
          nextChars.push(candidateFor(target, index, tick));
          return;
        }

        nextActiveIndex = Math.min(nextActiveIndex, index);
      });

      setDisplayed(nextChars.join(''));
      setActiveIndex(nextActiveIndex);

      if (elapsed > 120 + letters.length * tokenDelayMs + 120) {
        setDisplayed(text);
        setActiveIndex(letters.length);
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [text, runId]);

  const content = (
    <span aria-label={text} className={className}>
      <span aria-hidden="true" className="relative inline-grid">
        <span className="col-start-1 row-start-1 opacity-0">{text}</span>
        <span className="col-start-1 row-start-1 justify-self-start">
          {displayed.split('').map((char, index) => (
            <span
              key={`${char}-${index}`}
              className={index === activeIndex ? 'inline-block text-gold/80' : 'inline-block'}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
    </span>
  );

  if (!replayable) return content;

  return (
    <button
      type="button"
      aria-label={label ?? `Replay animation for ${text}`}
      onClick={() => setRunId((current) => current + 1)}
      className="inline-block cursor-pointer text-left focus:outline-none focus-visible:rounded-sm focus-visible:ring-1 focus-visible:ring-gold/40"
    >
      {content}
    </button>
  );
}
