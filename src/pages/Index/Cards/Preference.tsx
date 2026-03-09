import { memo, useState } from 'react';

type PreferenceProps = {
  onSubmit: (activities: number[]) => void;

};

interface Activity {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const activities: Activity[] = [
  { id: 1, name: 'Romantic Dinner', icon: '🍝', color: 'from-pink-300 to-pink-400' },
  { id: 2, name: 'Movie Night', icon: '🎬', color: 'from-teal-300 to-teal-400' },
  { id: 3, name: 'Stargazing', icon: '✨', color: 'from-rose-300 to-rose-400' },
  { id: 4, name: 'Beach Walk', icon: '🌊', color: 'from-teal-300 to-teal-400' },
  { id: 5, name: 'Coffee Date', icon: '☕', color: 'from-pink-300 to-pink-400' },
  { id: 6, name: 'Picnic', icon: '🧺', color: 'from-rose-300 to-rose-400' },
  { id: 7, name: 'Dancing', icon: '💃', color: 'from-pink-300 to-pink-400' },
  { id: 8, name: 'Cook Together', icon: '👨‍🍳', color: 'from-teal-300 to-teal-400' },
];

const Preference = memo(({ onSubmit }: PreferenceProps) => {
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);

  const toggleActivity = (activityId: number) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 py-6 overflow-y-auto animate-fadeIn">
      <div className="text-5xl mb-4">💝</div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center">
        What would you like to do together?
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Pick as many as you'd like! Let's make it special ✨
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 w-full max-w-2xl animate-fadeLeftIn">
        {activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => toggleActivity(activity.id)}
            className={`relative p-4 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 ${
              selectedActivities.includes(activity.id)
                ? `bg-linear-to-br ${activity.color} text-white scale-105`
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="text-3xl mb-1">{activity.icon}</div>
            <div className="text-xs font-semibold">{activity.name}</div>
            {selectedActivities.includes(activity.id) && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
        <div className='animate-fadeLeftIn'>
            {selectedActivities.length > 0 && (
                <div className="bg-linear-to-r from-pink-100 to-rose-100 rounded-2xl p-4 mb-6 w-full max-w-md text-center ">
                <p className="text-base text-gray-700 mb-2">
                    You picked {selectedActivities.length} amazing{' '}
                    {selectedActivities.length === 1 ? 'activity' : 'activities'}! 🎊
                </p>
                <p className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-rose-500">
                    This is going to be unforgettable! 💕
                </p>
                </div>
            )}
        </div>
      <button
        onClick={() => onSubmit(selectedActivities)}
        disabled={selectedActivities.length === 0}
        className="disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed bg-linear-to-r from-pink-400  text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
      >
        Continue 📧
      </button>
        {/* <button
        onClick={() => onSubmit(selectedActivities)}
        className=" px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
      >
         ← Back
      </button> */}
      
    </div>
  );
});

Preference.displayName = 'Preference';
export default Preference;
