import type { PropsWithChildren } from 'react'
import React from 'react'

import styles from './Layout.module.css'

const Layout: React.FC<PropsWithChildren> = ({ children, ...rest }) => {
  return (
    <main className="w-full h-full bg-linear-to-br from-pink-50 via-rose-50 to-teal-50 flex items-center justify-center p-4" {...rest}>
      <div className={styles.container}>{children}</div>
    </main>
  )
}

export default Layout
