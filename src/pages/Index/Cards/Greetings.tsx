import { memo } from 'react';

type GreetingsProps = {
  onNext?: () => void;
};

const Greetings = memo(({ onNext }: GreetingsProps) => {
    return (
        <div className='animate-fadeIn w-full h-full flex flex-col justify-center items-center px-6'>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              Hello KY <span className="animate-waving">👋</span>
            </h1>
            <p className="text-gray-600 text-center mb-8 max-w-sm">
              I have something special to ask you...
            </p>
            <button
              onClick={onNext}
              type='button'
              className="bg-linear-to-r from-pink-400 to-rose-400 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Continue 💕
            </button>
        </div>
    )
});

Greetings.displayName = 'Greetings';
export default Greetings;