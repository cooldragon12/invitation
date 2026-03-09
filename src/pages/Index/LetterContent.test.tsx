import { describe, it, expect, vi } from 'vitest'

// stub out EmailFlow so it doesn't trigger network effects
vi.mock('@/pages/Index/Cards/EmailFlow', () => {
  return {
    default: ({ answer, selectedActivities, activities }: any) => (
      <div>Mocked EmailFlow</div>
    ),
  }
})

import { render, screen } from '@testing-library/react'
import LetterContent from './LetterContent'
import { initialState } from '@/utils/reducer/invitationReducer'

// we'll render LetterContent with various states to verify correct card

describe('LetterContent component', () => {
  const dispatch = vi.fn()
  const openCallback = vi.fn()
  const onAnswer = vi.fn()
  const onActivitySelect = vi.fn()
  const onEmailFlow = vi.fn()
  const onReconsider = vi.fn()

  const renderWithState = (state: typeof initialState) =>
    render(
      <LetterContent
        state={state}
        dispatch={dispatch}
        openCallback={openCallback}
        onAnswer={onAnswer}
        onActivitySelect={onActivitySelect}
        onEmailFlow={onEmailFlow}
        onReconsider={onReconsider}
      />,
    )

  it('shows start card when state.card is start', () => {
    renderWithState(initialState)
    expect(screen.getByText(/OPEN/i)).toBeInTheDocument()
  })

  it('shows greetings when card is greetings', () => {
    renderWithState({ ...initialState, card: 'greetings' })
    expect(screen.getByText(/Hello KY/i)).toBeInTheDocument()
  })

  it('shows asking when card is asking', () => {
    renderWithState({ ...initialState, card: 'asking' })
    expect(screen.getByText(/Will you go out with me/i)).toBeInTheDocument()
  })

  it('shows preference when card is preference', () => {
    renderWithState({ ...initialState, card: 'preference' })
    expect(screen.getByText(/What would you like to do together/i)).toBeInTheDocument()
  })

  it('shows regret when card is regret', () => {
    renderWithState({ ...initialState, card: 'regret' })
    expect(screen.getByText(/I'll wait for you/i)).toBeInTheDocument()
  })

  it('shows grateful when card is grateful', () => {
    renderWithState({ ...initialState, card: 'grateful' })
    expect(screen.getByText(/You made my day!/i)).toBeInTheDocument()
  })

  it('shows emailFlow when card is emailFlow', () => {
    renderWithState({ ...initialState, card: 'emailFlow', answer: 'yes' })
    expect(screen.getByText(/Mocked EmailFlow/i)).toBeInTheDocument()
  })
})
