import clsx from 'clsx';
import React from 'react'
import type { PropsWithChildren, HTMLAttributes } from 'react'

// Heart-shaped wax seal used to open the envelope
const ButtonBeating: React.FC<PropsWithChildren<HTMLAttributes<HTMLButtonElement>>> = ({ children, className, ...rest}) => {
  return (
    <button
      {...rest}
      type='button'
      className={clsx(
        'group relative flex size-24 cursor-pointer flex-col items-center justify-center rounded-full bg-linear-to-br from-rose-400 to-rose-600 font-bold tracking-widest text-white shadow-xl shadow-rose-400/50 ring-4 ring-rose-300/60 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-pink-200 sm:size-28',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default ButtonBeating
