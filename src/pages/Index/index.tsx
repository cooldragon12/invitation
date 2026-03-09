import React, { memo, Suspense } from 'react'

import Spinner from '@/components/Spinner'
import Letter from './Letter'

const Index: React.FC = memo(() => {
  return (
    <>
        <Suspense fallback={<Spinner size="xl" />}>
          <Letter />
        </Suspense>
    </>
  )
})
Index.displayName = 'Index'

export default Index
