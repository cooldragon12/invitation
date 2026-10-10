import { memo } from 'react';

import PillButton from '@/components/Button/PillButton';

type GreetingsProps = {
  onNext?: () => void;
};

const Greetings = memo(({ onNext }: GreetingsProps) => {
    return (
        <div className='flex w-full flex-col items-center justify-center px-6 pb-12 pt-4 text-center sm:px-12'>
            <p className='mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-pink-400'>
              A little letter
            </p>
            <h1 className="mb-6 font-script text-5xl font-bold leading-tight text-rose-600 sm:text-6xl">
              Hello Ysa My Love <span className="animate-waving">👋</span>
            </h1>
            <p className="mb-10 max-w-sm text-lg text-rose-900/70">
              I have something special to ask you...
            </p>
            <PillButton onClick={onNext}>
              Continue 💕
            </PillButton>
        </div>
    )
});

Greetings.displayName = 'Greetings';
export default Greetings;
