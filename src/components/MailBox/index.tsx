import type { PropsWithChildren ,FC} from 'react'


const MailBox:FC<PropsWithChildren> = ({children, ...props }) =>{
    return (
        <div {...props} className='
            w-[70%] h-[80%] animate-bounce
        '>  
            {children}
        </div>
    )
} 

export default MailBox