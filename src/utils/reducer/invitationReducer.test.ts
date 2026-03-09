import { describe, it, expect } from 'vitest'

import type { InvitationState } from './invitationReducer';
import { invitationReducer, initialState } from './invitationReducer'


describe('invitationReducer', () => {
  it('returns initial state when given unknown action', () => {
    const state = invitationReducer(initialState, { type: 'UNKNOWN' } as any)
    expect(state).toBe(initialState)
  })

  it('handles SET_CARD', () => {
    const next = invitationReducer(initialState, { type: 'SET_CARD', payload: 'greetings' })
    expect(next.card).toBe('greetings')
  })

  it('handles SET_OPEN', () => {
    const next = invitationReducer(initialState, { type: 'SET_OPEN', payload: true })
    expect(next.open).toBe(true)
  })

  it('handles SET_ANSWER', () => {
    const next = invitationReducer(initialState, { type: 'SET_ANSWER', payload: 'yes' })
    expect(next.answer).toBe('yes')
  })

  it('handles SET_SELECTED_ACTIVITIES', () => {
    const arr = [1, 2, 3]
    const next = invitationReducer(initialState, { type: 'SET_SELECTED_ACTIVITIES', payload: arr })
    expect(next.selectedActivities).toEqual(arr)
  })

  describe('shortcut actions', () => {
    it('OPEN_LETTER sets open true', () => {
    const next = invitationReducer(initialState, { type: 'OPEN_LETTER' })
    expect(next.open).toBe(true)
    })

    it('SHOW_GREETINGS changes card to greetings', () => {
      const next = invitationReducer(initialState, { type: 'SHOW_GREETINGS' })
      expect(next.card).toBe('greetings')
    })

    it('ANSWER_YES sets answer yes and card preference', () => {
      const next = invitationReducer(initialState, { type: 'ANSWER_YES' })
      expect(next.answer).toBe('yes')
      expect(next.card).toBe('preference')
    })

    it('ANSWER_MAYBE sets answer maybe and card regret', () => {
      const next = invitationReducer(initialState, { type: 'ANSWER_MAYBE' })
      expect(next.answer).toBe('maybe')
      expect(next.card).toBe('regret')
    })

    it('SELECT_ACTIVITIES updates array and card grateful', () => {
      const arr = [4, 5]
      const next = invitationReducer(initialState, { type: 'SELECT_ACTIVITIES', payload: arr })
      expect(next.selectedActivities).toEqual(arr)
      expect(next.card).toBe('grateful')
    })

    it('GO_TO_EMAIL_FLOW sets card to emailFlow', () => {
      const next = invitationReducer(initialState, { type: 'GO_TO_EMAIL_FLOW' })
      expect(next.card).toBe('emailFlow')
    })

    it('RECONSIDER clears answer and activities and sets card asking', () => {
      const modified: InvitationState = {
        card: 'regret',
        open: true,
        answer: 'yes',
        selectedActivities: [1, 2],
      }
      const next = invitationReducer(modified, { type: 'RECONSIDER' })
      expect(next.answer).toBeNull()
      expect(next.selectedActivities).toEqual([])
      expect(next.card).toBe('asking')
    })

    it('RESET returns initial state', () => {
      const modified: InvitationState = {
        card: 'grateful',
        open: true,
        answer: 'maybe',
        selectedActivities: [3],
      }
      const next = invitationReducer(modified, { type: 'RESET' })
      expect(next).toEqual(initialState)
    })
  })
})
