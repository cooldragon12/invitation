import { render, screen, waitFor } from '@testing-library/react'

import EmailFlow from '@/pages/Index/Cards/EmailFlow';

import { describe, it, expect, vi } from 'vitest'

// mock the service functions so they resolve immediately
vi.mock('@/services/emailService', () => {
  return {
    generateEmailContent: vi.fn().mockResolvedValue({ subject: 'sub', body: 'body' }),
    sendEmail: vi.fn().mockResolvedValue({ success: true }),
  }
})

import { generateEmailContent, sendEmail } from '@/services/emailService'

describe('EmailFlow card', () => {
  beforeEach(() => {
    // clear localStorage so auto send runs
    localStorage.clear()
  })

  it('shows loading state then success message', async () => {
    render(<EmailFlow answer="yes" selectedActivities={[]} activities={[]} />)

    // loader should appear first
    expect(screen.getByText(/Preparing your message/i)).toBeInTheDocument()

    // wait for async effects to complete
    await waitFor(() => {
      expect(generateEmailContent).toHaveBeenCalled()
      expect(sendEmail).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(screen.getByText(/Email sent!/i)).toBeInTheDocument()
    })
  })
})
