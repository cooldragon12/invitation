import { memo } from 'react'

// Fixed positions so the hearts don't jump around on re-render
const hearts = [
  { left: '4%', size: 'text-xl', duration: 14, delay: 0 },
  { left: '12%', size: 'text-3xl', duration: 18, delay: 4 },
  { left: '22%', size: 'text-lg', duration: 12, delay: 8 },
  { left: '33%', size: 'text-2xl', duration: 16, delay: 2 },
  { left: '45%', size: 'text-xl', duration: 20, delay: 10 },
  { left: '56%', size: 'text-3xl', duration: 15, delay: 6 },
  { left: '67%', size: 'text-lg', duration: 13, delay: 1 },
  { left: '76%', size: 'text-2xl', duration: 17, delay: 9 },
  { left: '86%', size: 'text-xl', duration: 19, delay: 3 },
  { left: '94%', size: 'text-3xl', duration: 14, delay: 7 },
]

const FloatingHearts = memo(() => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {hearts.map((heart) => (
      <span
        key={heart.left}
        className={`animate-floatUp absolute -bottom-12 text-pink-300/70 ${heart.size}`}
        style={{
          left: heart.left,
          animationDuration: `${heart.duration}s`,
          animationDelay: `${heart.delay}s`,
        }}
      >
        ♥
      </span>
    ))}
  </div>
))

FloatingHearts.displayName = 'FloatingHearts'
export default FloatingHearts
