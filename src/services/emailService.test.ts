import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

// mock generative ai and emailjs
vi.mock('@google/generative-ai', () => {
  // return a fake class that works with `new`
  class FakeGenAI {
    apiKey: string
    constructor(key: string) {
      this.apiKey = key
    }
    getGenerativeModel(_opts: any) {
      return {
        generateContent: async () => ({ response: { text: () => 'mocked body' } }),
      }
    }
  }
  return {
    GoogleGenerativeAI: FakeGenAI,
  }
})

vi.mock('@emailjs/browser', () => {
  return {
    default: {
      send: vi.fn(),
    },
  }
})

import emailjs from '@emailjs/browser'

// helper to stub import.meta.env (configurable to allow multiple calls)
function configureEnv(env: Record<string, string | undefined>) {
  Object.defineProperty(import.meta, 'env', {
    value: env,
    configurable: true,
  })
}

describe('emailService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.resetModules()
  })

  describe('generateEmailContent', () => {
    beforeEach(() => {
      configureEnv({ VITE_GOOGLE_API_KEY: 'key' })
    })

    it('returns yes subject/body when answer yes', async () => {
      const { generateEmailContent } = await import('./emailService')
      const result = await generateEmailContent('yes', ['A', 'B'], 'Test')
      expect(result.subject).toContain("can't wait")
      expect(result.body).toBe('mocked body')
    })

    it('returns maybe subject when answer maybe', async () => {
      const { generateEmailContent } = await import('./emailService')
      const result = await generateEmailContent('maybe', [], 'Test')
      expect(result.subject).toContain("I'll wait")
    })
  })

  describe('sendEmail', () => {

    it('calls emailjs.send and returns success', async () => {
      configureEnv({
        VITE_EMAILJS_SERVICE_ID: 's',
        VITE_EMAILJS_TEMPLATE_ID: 't',
        VITE_EMAILJS_USER_ID: 'u',
      })
      ;(emailjs.send as Mock).mockResolvedValue({ status: 200 })
      const { sendEmail } = await import('./emailService')
      const res = await sendEmail({ to: 'a', from: 'b', subject: 'c', body: 'd', recipientName: 'x', answer: 'yes' })
      expect(emailjs.send).toHaveBeenCalled()
      expect(res.success).toBe(true)
    })

    it('returns error when emailjs throws', async () => {
      configureEnv({
        VITE_EMAILJS_SERVICE_ID: 's',
        VITE_EMAILJS_TEMPLATE_ID: 't',
        VITE_EMAILJS_USER_ID: 'u',
      })
      ;(emailjs.send as Mock).mockRejectedValue(new Error('fail'))
      const { sendEmail } = await import('./emailService')
      const res = await sendEmail({ to: 'a', from: 'b', subject: 'c', body: 'd', recipientName: 'x', answer: 'maybe' })
      expect(res.success).toBe(false)
      expect(res.error).toBe('fail')
    })
  })
})
