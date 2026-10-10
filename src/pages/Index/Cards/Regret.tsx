import { memo } from 'react';

import PillButton from '@/components/Button/PillButton';

type RegretProps = {
  onEmailFlow: () => void;
  onReconsider: () => void;
};

const Regret = memo(({ onEmailFlow, onReconsider }: RegretProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-6 pb-12 pt-2 text-center sm:px-12">
      <div className="mb-5 text-7xl" aria-hidden="true">🥺</div>
      <h2 className="mb-4 font-script text-4xl font-bold text-rose-600 sm:text-5xl">
        I'll wait for you... 💭
      </h2>
      <p className="mb-10 max-w-md text-lg text-rose-900/75">
        Take all the time you need. The invitation stays open whenever you're ready 💕
      </p>
      <div className="flex flex-col-reverse items-center justify-center gap-3 sm:flex-row">
        <PillButton variant="secondary" onClick={onEmailFlow}>
          Send my answer 💌
        </PillButton>
        <PillButton onClick={onReconsider}>
          Actually... yes? 👉👈
        </PillButton>
      </div>
    </div>
  );
});

Regret.displayName = 'Regret';
export default Regret;
