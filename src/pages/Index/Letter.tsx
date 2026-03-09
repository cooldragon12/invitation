import React, { FC, PropsWithChildren, useReducer, useTransition } from 'react'
import LetterContent from './LetterContent';
import { invitationReducer, initialState } from '@/utils/reducer/invitationReducer';
import { AnswerType } from '@/@types/card.types';

const Letter:FC<PropsWithChildren> = ({children,...props})=>{
    const [isPending, startTransition] = useTransition();
    const [state, dispatch] = useReducer(invitationReducer, initialState);

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

    const handleEmailFlow = () => {
        dispatch({ type: 'GO_TO_EMAIL_FLOW' });
    };

    const handleReconsider = () => {
        dispatch({ type: 'RECONSIDER' });
    };

    return (
        <div className={` ${state.open? 'w-220 h-170':'w-200 h-140'} transition-all overflow-hidden delay-300 bg-white rounded-3xl flex justify-center relative`}>
            <LetterContent  
                state={state}
                dispatch={dispatch}
                openCallback={openCallback}
                onAnswer={handleAnswer}
                onActivitySelect={handleActivitySelect}
                onEmailFlow={handleEmailFlow}
                onReconsider={handleReconsider}
            />
        </div>
    )
}

export default Letter;