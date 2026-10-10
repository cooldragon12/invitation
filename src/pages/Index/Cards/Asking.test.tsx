import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import Asking from './Asking'

describe('Asking card', () => {
  it('calls onAnswer with yes when yes button clicked', async () => {
    const onAnswer = vi.fn()
    const user = userEvent.setup()
    render(<Asking onAnswer={onAnswer} />)
    const yesBtn = screen.getByText(/Yes!/i)
    await user.click(yesBtn)
    expect(onAnswer).toHaveBeenCalledWith('yes')
  })

  it('does not call onAnswer when no button clicked', async () => {
    const onAnswer = vi.fn()
    const user = userEvent.setup()
    render(<Asking onAnswer={onAnswer} />)
    const noBtn = screen.getByRole('button', { name: /No/i })
    await user.click(noBtn)
    expect(onAnswer).not.toHaveBeenCalled()
  })
})

describe('Asking card escalation', () => {
  it('grows the plea with each no and offers a way to take time', async () => {
    const onAnswer = vi.fn()
    const user = userEvent.setup()
    render(<Asking onAnswer={onAnswer} />)

    expect(screen.queryByText(/little time to think/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /No/i }))
    await user.click(screen.getByRole('button', { name: /Are you sure/i }))
    await user.click(screen.getByRole('button', { name: /Really sure/i }))

    await user.click(screen.getByText(/little time to think/i))
    expect(onAnswer).toHaveBeenCalledWith('maybe')
  })
})
