import type { PropsWithChildren } from 'react'
import React from 'react'

import FloatingHearts from './FloatingHearts'

const Layout: React.FC<PropsWithChildren> = ({ children, ...rest }) => {
  return (
    <main
      className="relative isolate flex min-h-svh w-full items-center justify-center overflow-x-hidden bg-linear-to-br from-pink-100 via-rose-50 to-pink-200 px-4 py-8"
      {...rest}
    >
      <FloatingHearts />
      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        {children}
      </div>
    </main>
  )
}

export default Layout
