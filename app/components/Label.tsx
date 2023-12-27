import React from 'react';
import { IoIosClose } from "react-icons/io";

const Label = () => {
  return (
    <div className='group'>
        <div className='w-12 h-6 py-[3px] px-[5px] bg-AliceBlue rounded-3xl group-hover:hidden'><div className='w-[37px] h-6 p-[1px] text-[11px] text-DarkGrayishBlue'>Bakary</div></div>
        {/* below is to what to replace label with when it is hovered */}
         <div className='hidden w-[45.73px] h-6 py-[3px] px-[5px] bg-AliceBlue rounded-3xl group-hover:block'><div className='w-[27.73px] h-6 text-[11px] p-[1px] text-BlackRussian'>Ba...</div><div className='w-5 h-20'><IoIosClose /></div> </div>
         </div>
  )
}

export default Label