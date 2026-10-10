import clsx from 'clsx';
import { memo, useState } from 'react';

import PillButton from '@/components/Button/PillButton';
import { activities } from '@/constants/activities';

type PreferenceProps = {
  onSubmit: (activities: number[]) => void;
};

const Preference = memo(({ onSubmit }: PreferenceProps) => {
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const count = selectedActivities.length;

  const toggleActivity = (activityId: number) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 pb-10 pt-2 text-center sm:px-10">
      <div className="mb-3 text-5xl" aria-hidden="true">💝</div>
      <h2 className="mb-2 text-2xl font-bold text-rose-900 sm:text-3xl">
        What would you like to do together?
      </h2>
      <p className="mb-6 text-rose-900/70">
        Pick as many as you'd like! Let's make it special ✨
      </p>

      <div className="mb-6 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {activities.map((activity) => {
          const selected = selectedActivities.includes(activity.id);
          return (
            <button
              key={activity.id}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleActivity(activity.id)}
              className={clsx(
                'relative cursor-pointer rounded-2xl p-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-300',
                selected
                  ? 'scale-[1.03] bg-linear-to-br from-pink-400 to-rose-500 text-white shadow-lg shadow-rose-300/50'
                  : 'bg-pink-50 text-rose-900/80 ring-1 ring-pink-100 hover:-translate-y-0.5 hover:bg-pink-100',
              )}
            >
              <div className="mb-1 text-3xl" aria-hidden="true">{activity.icon}</div>
              <div className="text-sm font-semibold">{activity.name}</div>
              {selected && (
                <div
                  aria-hidden="true"
                  className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-rose-500 shadow ring-2 ring-rose-400"
                >
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="mb-5 min-h-6 text-sm font-semibold text-rose-500" aria-live="polite">
        {count === 0
          ? 'Tap at least one to move on 💭'
          : `${count} picked — this is going to be unforgettable! 💕`}
      </p>

      <PillButton
        onClick={() => onSubmit(selectedActivities)}
        disabled={count === 0}
      >
        Continue 💌
      </PillButton>
    </div>
  );
});

Preference.displayName = 'Preference';
export default Preference;
