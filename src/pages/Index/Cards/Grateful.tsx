import { memo, useEffect} from 'react';

type GratefulProps = {
  onEmailFlow: () => void;
};

const Grateful = memo(({ onEmailFlow }: GratefulProps) => {

  const executes = ()=>{
    // Delay transition to email flow for better UX
    setTimeout(() => {
      onEmailFlow();
    }, 3000);
  }

  useEffect(() => {
    executes();
  }, [])

  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-6 py-8 animate-fadeIn">
      <div className="text-7xl mb-6 animate-bounce">🎉</div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        You made my day! 💖
      </h2>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        I'm the happiest person alive right now! Can't wait to celebrate with you! ✨
      </p>
      <p className="text-gray-600 mb-6 text-center">
        I'm sending you an email with all the details right now... 💌
      </p>
      <div className="flex gap-2 justify-center text-4xl mb-8">
        <span className="animate-pulse">❤️</span>
        <span className="animate-pulse" style={{ animationDelay: '0.1s' }}>
          💕
        </span>
        <span className="animate-pulse" style={{ animationDelay: '0.25s' }}>
          💖
        </span>
        <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>
          💝
        </span>
      </div>
    </div>
  );
});

Grateful.displayName = 'Grateful';
export default Grateful;
