'use client';
import React from 'react';
import { IoIosClose } from "react-icons/io";
import { useState } from 'react';



const Label = () => {
  const [isLabelActive, setIsLabelActive] = useState(false);
  const [isBtnActive, setIsBtnActive] = useState(false);
  return (
    <div onMouseEnter={() => setIsLabelActive(true)} onMouseLeave={() => setIsLabelActive(false)}>
        <div className={`${isLabelActive? 'hidden':''} min-w-[12] w-auto h-6 py-[3px] px-[5px] bg-AliceBlue rounded-3xl '><div className='w-[37px]  p-[1px] text-[11px] text-DarkGrayishBlue`}>Bakary</div>
        {/* below is to what to replace label with when it is hovered */}
         <div className={`${isLabelActive?'block':'hidden'} w-[45.73px] h-6 py-[3px] px-[5px] bg-AliceBlue rounded-3xl`}>
           <div className='flex'>
            <div className='w-[27.73px] h-6 text-[11px] p-[1px] text-BlackRussian '>Ba...</div>
             <button onMouseEnter={() =>setIsBtnActive(true)} onMouseLeave={() => setIsBtnActive(false)} className='w-5 h-5 hover:bg-AliceBlueDark  hover:rounded-full'><IoIosClose className='w-5 h-5' />
             {isBtnActive && <div className='bg-Charchol  w-20 ml-[-20px] text-slate-50'>Remove label</div>}</button></div>
         </div>
    </div>
  )
}

export default Label