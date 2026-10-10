import { memo, useState } from 'react';

import type { AnswerType } from '@/@types/card.types';
import PillButton from '@/components/Button/PillButton';

type AskingProps = {
  onAnswer: (response: AnswerType) => void;
};

// Each "No" makes the "Yes" a little bigger and the plea a little stronger
const noLabels = [
  'No 😔',
  'Are you sure? 🥺',
  'Really sure? 😢',
  'Think again? 💭',
  "You're breaking my heart 💔",
];
const NEED_TIME_AFTER = 3;
const MAX_YES_SCALE = 1.6;

const Asking = memo(({ onAnswer }: AskingProps) => {
    const [noCount, setNoCount] = useState(0);
    const yesScale = Math.min(1 + noCount * 0.15, MAX_YES_SCALE);

    return (
    <div className="flex w-full flex-col items-center justify-center px-6 pb-10 pt-2 text-center sm:px-12">
      <div className="mb-4 text-5xl animate-beating" aria-hidden="true">💗</div>

      <h2 className="mb-5 font-script text-4xl font-bold text-rose-600 sm:text-5xl">
        To Someone Special...
      </h2>

      <div className="mb-8 max-w-xl space-y-4 leading-relaxed text-rose-900/75">
        <p className="text-base sm:text-lg">
          You always stun me, and you always complete my day — you're someone I
          have been looking for from the moment I wake up until the night before
          sleeping. You are my dream that I don't want to end.
        </p>
        <p className="font-semibold text-rose-500">
          So here's my question...
        </p>
      </div>

      <div className="w-full max-w-md rounded-3xl bg-linear-to-br from-pink-50 to-rose-100 p-6 ring-1 ring-pink-100 sm:p-8">
        <h3 className="mb-6 text-2xl font-bold text-rose-900 sm:text-3xl">
          Will you go out with me? 💕
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <PillButton
            onClick={() => onAnswer('yes')}
            style={{ scale: `${yesScale}` }}
            className="relative z-10 px-9"
          >
            Yes! 😊
          </PillButton>
          <PillButton
            variant="muted"
            onClick={() => setNoCount((count) => count + 1)}
            name='no-button'
            className="shake-on-hover"
          >
            {noLabels[Math.min(noCount, noLabels.length - 1)]}
          </PillButton>
        </div>

        {noCount >= NEED_TIME_AFTER && (
          <button
            type="button"
            onClick={() => onAnswer('maybe')}
            className="mt-6 cursor-pointer text-sm font-semibold text-rose-400 underline decoration-dotted underline-offset-4 animate-fadeIn hover:text-rose-600"
          >
            I need a little time to think 💭
          </button>
        )}
      </div>
    </div>
  );
});

Asking.displayName = 'Asking';
export default Asking;
