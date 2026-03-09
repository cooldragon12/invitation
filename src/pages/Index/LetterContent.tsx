import { Dispatch } from 'react';
import Greetings from '@/pages/Index/Cards/Greetings';
import Start from '@/pages/Index/Cards/Start';
import Asking from '@/pages/Index/Cards/Asking';
import Preference from '@/pages/Index/Cards/Preference';
import Regret from '@/pages/Index/Cards/Regret';
import Grateful from '@/pages/Index/Cards/Grateful';
import EmailFlow from '@/pages/Index/Cards/EmailFlow';
import { InvitationState, InvitationAction } from '../../utils/reducer/invitationReducer';
import { AnswerType } from '../../@types/card.types';

interface Activity {
  id: number;
  name: string;
}

const activities: Activity[] = [
  { id: 1, name: 'Romantic Dinner' },
  { id: 2, name: 'Movie Night' },
  { id: 3, name: 'Stargazing' },
  { id: 4, name: 'Beach Walk' },
  { id: 5, name: 'Coffee Date' },
  { id: 6, name: 'Picnic' },
  { id: 7, name: 'Dancing' },
  { id: 8, name: 'Cook Together' },
];

interface LetterContentProps {
  state: InvitationState;
  dispatch: Dispatch<InvitationAction>;
  openCallback: () => void;
  onAnswer: (response: AnswerType) => void;
  onActivitySelect: (activities: number[]) => void;
  onEmailFlow: () => void;
  onReconsider: () => void;
}

const LetterContent = ({
  state,
  dispatch,
  openCallback,
  onAnswer,
  onActivitySelect,
  onEmailFlow,
  onReconsider,
}: LetterContentProps) => {
  const renderPage = (card: string) => {
    switch (card) {
      case 'start':
        return <Start open={state.open} callback={openCallback} />;
      case 'greetings':
        return <Greetings onNext={() => dispatch({ type: 'SET_CARD', payload: 'asking' })} />;
      case 'asking':
        return <Asking onAnswer={onAnswer as (response: AnswerType) => void} />;
      case 'preference':
        return <Preference onSubmit={onActivitySelect} />;
      case 'regret':
        return <Regret onEmailFlow={onEmailFlow} onReconsider={onReconsider} />;
      case 'grateful':
        return <Grateful onEmailFlow={onEmailFlow} />;
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
  return renderPage(state.card);
};

export default LetterContent;