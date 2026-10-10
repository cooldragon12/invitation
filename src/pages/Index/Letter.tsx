import clsx from 'clsx';
import type { FC, PropsWithChildren} from 'react';
import { useCallback, useReducer, useTransition } from 'react'

import type { AnswerType } from '@/@types/card.types';
import { invitationReducer, initialState } from '@/utils/reducer/invitationReducer';

import LetterContent from './LetterContent';

const Letter:FC<PropsWithChildren> = ()=>{
    const [isPending, startTransition] = useTransition();
    const [state, dispatch] = useReducer(invitationReducer, initialState);
    const isEnvelope = state.card === 'start';

    const openCallback = ()=>{
        startTransition(()=>{
            dispatch({ type: 'OPEN_LETTER' });
            setTimeout(()=>{
                dispatch({ type: 'SHOW_GREETINGS' });
            },1000)
        });
    };

    const handleAnswer = (response: AnswerType) => {
        if (response === 'yes') {
            dispatch({ type: 'ANSWER_YES' });
        } else {
            dispatch({ type: 'ANSWER_MAYBE' });
        }
    };

    const handleActivitySelect = (activities: number[]) => {
        dispatch({ type: 'SELECT_ACTIVITIES', payload: activities });
    };

    // Stable so Grateful's auto-advance timer isn't reset on re-render
    const handleEmailFlow = useCallback(() => {
        dispatch({ type: 'GO_TO_EMAIL_FLOW' });
    }, []);

    const handleReconsider = () => {
        dispatch({ type: 'RECONSIDER' });
    };

    const handleGoBack = () => {
        dispatch({ type: 'GO_BACK' });
    };

    return (
        <div
            aria-busy={isPending}
            className={clsx(
                'relative w-full transition-[max-width] duration-500',
                isEnvelope
                    ? 'aspect-[4/3] max-w-xl'
                    : 'max-w-3xl rounded-3xl bg-white/95 shadow-2xl shadow-rose-300/40 ring-1 ring-pink-100 backdrop-blur',
            )}
        >
            <LetterContent
                state={state}
                dispatch={dispatch}
                openCallback={openCallback}
                onAnswer={handleAnswer}
                onActivitySelect={handleActivitySelect}
                onEmailFlow={handleEmailFlow}
                onReconsider={handleReconsider}
                onGoBack={handleGoBack}
            />
        </div>
    )
}

export default Letter;
