import React, { memo } from 'react'

const Notfound: React.FC = memo(() => (
  <div className="justify-between text-center h-full">
    <h1 className='text-2xl font-bold'>404: Page Not Found</h1>
  </div>
))
Notfound.displayName = 'Notfound'

export default Notfound
