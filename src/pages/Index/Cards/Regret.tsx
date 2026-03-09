import { memo, useState } from 'react';

type RegretProps = {
  onEmailFlow: () => void;
  onReconsider: () => void;
};

const Regret = memo(({ onEmailFlow, onReconsider }: RegretProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-6 py-8 animate-fadeIn">
      <div className="text-7xl mb-6">🥺</div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        I'll wait for you... 💭
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Take all the time you need. The offer stands whenever you're ready! 💕
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={onReconsider}
          className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
        >
          Reconsider? 👉👈
        </button>
        <button
          onClick={onEmailFlow}
          className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
        >
          Send Response 📧
        </button>
      </div>
    </div>
  );
});

Regret.displayName = 'Regret';
export default Regret;
