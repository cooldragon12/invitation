import clsx from 'clsx'
import type { ButtonHTMLAttributes, FC } from 'react'

const variants = {
  primary:
    'bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-300/60 hover:-translate-y-0.5 disabled:from-pink-200 disabled:to-rose-200 disabled:shadow-none',
  secondary:
    'bg-white text-rose-600 ring-2 ring-rose-200 hover:bg-rose-50 hover:ring-rose-300',
  muted: 'bg-white/80 text-rose-400 ring-1 ring-rose-200 hover:bg-white',
}

export type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}

const PillButton: FC<PillButtonProps> = ({
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={clsx(
      'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 disabled:cursor-not-allowed disabled:hover:translate-y-0 sm:text-lg',
      variants[variant],
      className,
    )}
    {...rest}
  />
)

export default PillButton
