import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from './App'

test('renders the open button on start page', () => {
  render(<App />)
  expect(screen.getByText(/OPEN/i)).toBeInTheDocument()
})

test('clicking open navigates into greeting card', async () => {
  const user = userEvent.setup()
  render(<App />)
  const openBtn = screen.getByText(/OPEN/i)
  await user.click(openBtn)
  expect(await screen.findByText(/Hello KY/i)).toBeInTheDocument()
})
