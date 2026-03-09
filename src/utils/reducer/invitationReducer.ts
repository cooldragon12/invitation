import type { CardSlides, AnswerType } from '@/@types/card.types';

export interface InvitationState {
  card: CardSlides;
  open: boolean;
  answer: AnswerType;
  selectedActivities: number[];
}

export type InvitationAction =
  | { type: 'SET_CARD'; payload: CardSlides }
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'SET_ANSWER'; payload: AnswerType }
  | { type: 'SET_SELECTED_ACTIVITIES'; payload: number[] }
  | { type: 'ANSWER_YES' }
  | { type: 'ANSWER_MAYBE' }
  | { type: 'SELECT_ACTIVITIES'; payload: number[] }
  | { type: 'OPEN_LETTER' }
  | { type: 'SHOW_GREETINGS' }
  | { type: 'GO_TO_EMAIL_FLOW' }
  | { type: 'RECONSIDER' }
  | { type: 'RESET' };

export const initialState: InvitationState = {
  card: 'start',
  open: false,
  answer: null,
  selectedActivities: [],
};

export function invitationReducer(
  state: InvitationState,
  action: InvitationAction
): InvitationState {
  switch (action.type) {
    case 'SET_CARD':
      return { ...state, card: action.payload };
    case 'SET_OPEN':
      return { ...state, open: action.payload };
    case 'SET_ANSWER':
      return { ...state, answer: action.payload };
    case 'SET_SELECTED_ACTIVITIES':
      return { ...state, selectedActivities: action.payload };
    case 'OPEN_LETTER':
      return { ...state, open: true };
    case 'SHOW_GREETINGS':
      return { ...state, card: 'greetings' };
    case 'ANSWER_YES':
      return {
        ...state,
        answer: 'yes',
        card: 'preference',
      };
    case 'ANSWER_MAYBE':
      return {
        ...state,
        answer: 'maybe',
        card: 'regret',
      };
    case 'SELECT_ACTIVITIES':
      return {
        ...state,
        selectedActivities: action.payload,
        card: 'grateful',
      };
    case 'GO_TO_EMAIL_FLOW':
      return { ...state, card: 'emailFlow' };
    case 'RECONSIDER':
      return {
        ...state,
        answer: null,
        selectedActivities: [],
        card: 'asking',
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
