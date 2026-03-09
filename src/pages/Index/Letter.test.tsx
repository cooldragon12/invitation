import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { describe, it, expect, vi } from 'vitest'

import Letter from './Letter'

describe('Letter container', () => {
  it('moves from start to greetings after opening', () => {
    vi.useFakeTimers()
    render(<Letter />)
    const openBtn = screen.getByText(/OPEN/i)
    act(() => {
      fireEvent.click(openBtn)
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText(/Hello KY/i)).toBeInTheDocument()
    vi.useRealTimers()
  })
})
