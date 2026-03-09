export type CardSlides = string | 'start' | 'greetings' | 'asking' | 'preference' | 'regret' | 'grateful' | 'emailFlow';
export type AnswerType = 'yes' | 'maybe' | null;
export interface Activity {
  id: number;
  name: string;
  icon: string;
  color: string;
}
