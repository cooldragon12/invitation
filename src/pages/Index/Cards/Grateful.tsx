import { memo, useEffect } from 'react';

import type { Activity } from '@/@types/card.types';

// Delay transition to email flow so the celebration can be seen
const ADVANCE_AFTER_MS = 3000;

type GratefulProps = {
  onEmailFlow: () => void;
  plans?: Activity[];
};

const Grateful = memo(({ onEmailFlow, plans = [] }: GratefulProps) => {
  useEffect(() => {
    const timer = setTimeout(onEmailFlow, ADVANCE_AFTER_MS);
    return () => clearTimeout(timer);
  }, [onEmailFlow]);

  return (
    <div className="flex w-full flex-col items-center justify-center px-6 pb-12 pt-2 text-center sm:px-12">
      <div className="mb-5 text-7xl animate-bounce" aria-hidden="true">🎉</div>
      <h2 className="mb-3 font-script text-5xl font-bold text-rose-600 sm:text-6xl">
        You made my day! 💖
      </h2>
      <p className="mb-6 max-w-md text-lg text-rose-900/75">
        I'm the happiest person alive right now! Can't wait to celebrate with you! ✨
      </p>

      {plans.length > 0 && (
        <ul className="mb-8 flex max-w-lg flex-wrap justify-center gap-2" aria-label="Our plans">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className="rounded-full bg-pink-50 px-3 py-1 text-sm font-semibold text-rose-600 ring-1 ring-pink-200"
            >
              {plan.icon} {plan.name}
            </li>
          ))}
        </ul>
      )}

      <div className="w-full max-w-xs">
        <p className="mb-2 text-sm text-rose-900/60">
          Sealing your answer in a letter... 💌
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-pink-100">
          <div
            className="h-full rounded-full bg-linear-to-r from-pink-400 to-rose-500 animate-fill"
            style={{ animationDuration: `${ADVANCE_AFTER_MS}ms` }}
          />
        </div>
      </div>
    </div>
  );
});

Grateful.displayName = 'Grateful';
export default Grateful;
