import type { Activity } from '@/@types/card.types'

export const activities: Activity[] = [
  { id: 1, name: 'Romantic Dinner', icon: '🍝' },
  { id: 2, name: 'Movie Night', icon: '🎬' },
  { id: 3, name: 'Stargazing', icon: '✨' },
  { id: 4, name: 'Beach Walk', icon: '🌊' },
  { id: 5, name: 'Coffee Date', icon: '☕' },
  { id: 6, name: 'Picnic', icon: '🧺' },
  { id: 7, name: 'Dancing', icon: '💃' },
  { id: 8, name: 'Cook Together', icon: '👨‍🍳' },
]

export const getActivitiesByIds = (ids: number[]): Activity[] =>
  activities.filter((activity) => ids.includes(activity.id))
