import {memo} from 'react';

import ButtonBeating from '@/components/Button';

const Start = memo(({open, callback}:{open:boolean, callback:()=>void})=>{
    return (
        <>
            <div className={`w-190 h-190 rotate-45 border-pink-50 shadow-lg border-2 rounded-[6em] absolute duration-500  transition-transform transform  ${open ? '-translate-y-[120%]':'-translate-y-[70%]'}  bg-white z-20`}></div>
            <div className={`w-[45em] h-[45em]  rotate-45 border-pink-50 shadow-lg border-2 rounded-3xl absolute duration-500 delay-200 transition-transform transform  ${open ? 'translate-y-[120%]':'translate-y-[50%]'}`}></div>
            <div className='w-full h-full flex justify-center items-center'>
                <ButtonBeating className={`duration-100  transition-all transform  ${open ? '-translate-y-[300%] opacity-0':'opacity-100'} `} onClick={()=>{callback()}}>OPEN</ButtonBeating>
            </div>
        </>
    )
})


export default Start;