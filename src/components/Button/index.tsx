import clsx from 'clsx';
import React from 'react'
import type { PropsWithChildren, HTMLAttributes } from 'react'



const ButtonBeating: React.FC<PropsWithChildren<HTMLAttributes<HTMLButtonElement>>> = ({ children, ...rest}) => {
  return (
    <button

      {...rest}
      type='button'
      className={clsx(`text-center items-center w-30 h-30 z-20 bg-linear-to-r from-pink-400 to-red-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 `,rest.className)}
    >
      {children}
    </button>
  )
}

export default ButtonBeating
