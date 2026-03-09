import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Preference from './Preference'
import { describe, it, expect, vi } from 'vitest'

describe('Preference card', () => {
  it('disables continue button when no activities selected', () => {
    const onSubmit = vi.fn()
    render(<Preference onSubmit={onSubmit} />)
    const continueBtn = screen.getByText(/Continue/i)
    expect(continueBtn).toBeDisabled()
  })

  it('enables button after selecting an activity and submits correct array', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<Preference onSubmit={onSubmit} />)

    const activityBtn = screen.getByText(/Romantic Dinner/i)
    await user.click(activityBtn)

    const continueBtn = screen.getByText(/Continue/i)
    expect(continueBtn).not.toBeDisabled()

    await user.click(continueBtn)
    expect(onSubmit).toHaveBeenCalledWith([1])
  })
})
