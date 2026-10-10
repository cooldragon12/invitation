import clsx from 'clsx';
import {memo} from 'react';

import ButtonBeating from '@/components/Button';

const Start = memo(({open, callback}:{open:boolean, callback:()=>void})=>{
    return (
        <div className='relative h-full w-full overflow-hidden rounded-3xl bg-pink-200 shadow-2xl shadow-rose-300/40 [perspective:1200px]'>
            {/* The letter tucked inside the envelope */}
            <div
                className={clsx(
                    'absolute inset-x-[8%] top-[10%] bottom-[6%] z-10 flex justify-center rounded-2xl bg-white pt-[6%] shadow-md transition-transform duration-700 ease-out',
                    open ? '-translate-y-[4%]' : 'translate-y-[18%]',
                )}
            >
                <p className='font-script text-2xl text-rose-500 sm:text-4xl'>For you, Ysa 💗</p>
            </div>

            {/* Envelope pockets */}
            <div className='absolute inset-0 z-20 bg-pink-300' style={{ clipPath: 'polygon(0 0, 52% 56%, 0 100%)' }} />
            <div className='absolute inset-0 z-20 bg-pink-300' style={{ clipPath: 'polygon(100% 0, 48% 56%, 100% 100%)' }} />
            <div className='absolute inset-0 z-20 bg-pink-400/80' style={{ clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)' }} />

            {/* Top flap that flips open */}
            <div
                className={clsx(
                    'absolute inset-x-0 top-0 h-[58%] origin-top bg-pink-200 transition-transform duration-700 ease-in-out',
                    open ? 'z-0 [transform:rotateX(180deg)]' : 'z-30',
                )}
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />

            {/* Wax seal */}
            <div className='absolute top-[58%] left-1/2 z-40 -translate-x-1/2 -translate-y-1/2'>
                <ButtonBeating
                    aria-label='Open the letter'
                    className={clsx(open ? 'pointer-events-none scale-50 opacity-0' : 'animate-beating')}
                    onClick={callback}
                >
                    <span aria-hidden='true' className='text-2xl leading-none'>♥</span>
                    <span className='text-sm sm:text-base'>OPEN</span>
                </ButtonBeating>
            </div>

            <p
                className={clsx(
                    'absolute inset-x-0 bottom-[6%] z-40 text-center text-sm font-semibold text-white transition-opacity duration-300 sm:text-base',
                    open && 'opacity-0',
                )}
            >
                You've got mail — tap the seal 💌
            </p>
        </div>
    )
})

Start.displayName = 'Start';
export default Start;
