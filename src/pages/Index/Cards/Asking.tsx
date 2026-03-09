import { memo, useEffect, useRef, useState } from 'react';
import ButtonBeating from '@/components/Button';
import { AnswerType } from '../../../@types/card.types';

type AskingProps = {
  onAnswer: (response: AnswerType) => void;
};

const Asking = memo(({ onAnswer }: AskingProps) => {
    const [newPos, setNewPos] = useState({ x: 500, y: 500 });
    const [newScale, setScale] = useState(1);
    const ref_cont = useRef<HTMLDivElement>(null);
    // const clickNoHandler = (e: React.MouseEvent) => {
    //     const button = e.currentTarget as HTMLElement;

    //     const mouseX = e.clientX;
    //     const mouseY = e.clientY;
    //     const x = Math.random() * (832- ref_cont.current?.clientWidth!)  + ref_cont.current?.clientWidth! / 2 + mouseX/10;
    //     const y = Math.random() * (616 - ref_cont.current?.clientWidth!) + ref_cont.current?.clientWidth! / 2 +mouseY/10;
    //     setNewPos({ x, y });
    // };
    const clickNoHandler = (e: React.MouseEvent) => {
        setScale((prev) => prev + 0.1);
    };
    return (
    <div ref={ref_cont} className="w-full h-full flex flex-col justify-center items-center px-6 py-8 animate-fadeIn">
      <div className="text-6xl mb-6 animate-beating">❤️</div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        To Someone Special... 💌
      </h2>

      <div className="space-y-4 text-gray-700 leading-relaxed mb-8 max-w-xl text-center">
        <p className="text-base md:text-lg">
          You always stun me, and you always complete my day — you're someone I
          have been looking for from the moment I wake up until the night before
          sleeping. You are my dream that I don't want to end.
        </p>
        <p className="text-lg font-semibold text-center text-rose-500 mt-8">
          So here's my question...
        </p>
      </div>

      <div className="bg-linear-to-r from-pink-100 to-rose-100 rounded-2xl p-6 md:p-8 text-center w-full max-w-md">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Will you go out with me? 💕
        </h3>

        <div className="flex gap-4 justify-center flex-wrap animate-fadeIn animate-delay-500">
          <button
            onClick={() => onAnswer('yes')}
            style={{ scale: `${newScale}` }}
            className="bg-linear-to-r hover:cursor-pointer from-rose-400 to-pink-400 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
          >
            Yes! 😊
          </button>
          <button
            onClick={clickNoHandler}
            onMouseEnter={clickNoHandler}
            name='no-button'
            className={`shake-on-hover hover:cursor-pointer bg-linear-to-r from-gray-400 to-gray-400 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200`}
          >
            No 😔
          </button>
        </div>

      </div>
    </div>
  );
});

Asking.displayName = 'Asking';
export default Asking;
