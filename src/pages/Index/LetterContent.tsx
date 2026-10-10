import clsx from 'clsx';
import type { Dispatch } from 'react';

import type { AnswerType, CardSlides } from '@/@types/card.types';
import { activities, getActivitiesByIds } from '@/constants/activities';
import Asking from '@/pages/Index/Cards/Asking';
import EmailFlow from '@/pages/Index/Cards/EmailFlow';
import Grateful from '@/pages/Index/Cards/Grateful';
import Greetings from '@/pages/Index/Cards/Greetings';
import Preference from '@/pages/Index/Cards/Preference';
import Regret from '@/pages/Index/Cards/Regret';
import Start from '@/pages/Index/Cards/Start';
import type { InvitationState, InvitationAction } from '@/utils/reducer/invitationReducer';

// Which progress dot each card lights up
const steps: Record<string, number> = {
  greetings: 0,
  asking: 1,
  preference: 2,
  regret: 2,
  grateful: 3,
  emailFlow: 3,
};
const TOTAL_STEPS = 4;

// Going back from greetings would land on the opened envelope, and the last
// cards auto-advance / send the email, so only these allow going back
const canGoBackFrom: CardSlides[] = ['asking', 'preference', 'regret'];

interface LetterContentProps {
  state: InvitationState;
  dispatch: Dispatch<InvitationAction>;
  openCallback: () => void;
  onAnswer: (response: AnswerType) => void;
  onActivitySelect: (activities: number[]) => void;
  onEmailFlow: () => void;
  onReconsider: () => void;
  onGoBack?: () => void;
}

const LetterContent = ({
  state,
  dispatch,
  openCallback,
  onAnswer,
  onActivitySelect,
  onEmailFlow,
  onReconsider,
  onGoBack,
}: LetterContentProps) => {
  const renderPage = (card: string) => {
    switch (card) {
      case 'greetings':
        return <Greetings onNext={() => dispatch({ type: 'SET_CARD', payload: 'asking' })} />;
      case 'asking':
        return <Asking onAnswer={onAnswer} />;
      case 'preference':
        return <Preference onSubmit={onActivitySelect} />;
      case 'regret':
        return <Regret onEmailFlow={onEmailFlow} onReconsider={onReconsider} />;
      case 'grateful':
        return (
          <Grateful
            onEmailFlow={onEmailFlow}
            plans={getActivitiesByIds(state.selectedActivities)}
          />
        );
      case 'emailFlow':
        return (
          <EmailFlow
            answer={state.answer}
            selectedActivities={state.selectedActivities}
            activities={activities}
          />
        );
      default:
        return <div>Unknown card</div>;
    }
  };

  if (state.card === 'start') {
    return <Start open={state.open} callback={openCallback} />;
  }

  const step = steps[state.card] ?? 0;
  const showBack = onGoBack && canGoBackFrom.includes(state.card) && state.cardHistory.length > 0;

  return (
    <div className="flex min-h-[min(36rem,85svh)] flex-col">
      <header className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6">
        <div className="w-20">
          {showBack && (
            <button
              type="button"
              onClick={onGoBack}
              className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold text-rose-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
            >
              ← Back
            </button>
          )}
        </div>
        <ol className="flex items-center gap-2" aria-label={`Step ${step + 1} of ${TOTAL_STEPS}`}>
          {Array.from({ length: TOTAL_STEPS }, (_, index) => (
            <li
              key={index}
              aria-hidden="true"
              className={clsx(
                'h-2 rounded-full transition-all duration-500',
                index === step ? 'w-6 bg-rose-500' : 'w-2',
                index < step && 'bg-rose-300',
                index > step && 'bg-pink-100',
              )}
            />
          ))}
        </ol>
        <div className="w-20" />
      </header>
      <div key={state.card} className="flex flex-1 animate-fadeIn">
        {renderPage(state.card)}
      </div>
    </div>
  );
};

export default LetterContent;
