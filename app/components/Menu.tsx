import React from 'react'

const Menu = () => {
  return (
    <div className='w-[163px] h-[236px] py-[6px] px-0 shadow-lg rounded-md z-50'>
        <div className='w-[163px] h-8 pt-[5px] pr-[10px] pb-[5px] pl-[17px] hover:bg-AliceBlue'>
            <button className='w-[134px] h-5 text-DarkGrayishBlue text-[14px] font-sans text-left'>Delete note</button>
        </div>
        <div className='w-[163px] h-8 pt-[5px] pr-[10px] pb-[5px] pl-[17px] hover:bg-AliceBlue'>
            <button className='w-[134px] h-5 text-DarkGrayishBlue text-[14px] font-sans text-left'>Add label</button>
        </div>
        <div className='w-[163px] h-8 pt-[5px] pr-[10px] pb-[5px] pl-[17px] hover:bg-AliceBlue'>
            <button className='w-[134px] h-5 text-DarkGrayishBlue text-[14px] font-sans text-left'>Add drawing</button>
        </div>
        <div className='w-[163px] h-8 pt-[5px] pr-[10px] pb-[5px] pl-[17px] hover:bg-AliceBlue'>
            <button className='w-[134px] h-5 text-DarkGrayishBlue text-[14px] font-sans text-left'>Make a copy</button>
        </div>
        <div className='w-[163px] h-8 pt-[5px] pr-[10px] pb-[5px] pl-[17px] hover:bg-AliceBlue'>
            <button className='w-[134px] h-5 text-DarkGrayishBlue text-[14px] font-sans text-left'>Show checkboxes</button>
        </div>
        <div className='w-[163px] h-8 pt-[5px] pr-[10px] pb-[5px] pl-[17px] hover:bg-AliceBlue'>
            <button className='w-[134px] h-5 text-DarkGrayishBlue text-[14px] font-sans text-left'>Copy to Google Docs</button>
        </div>
        <div className='w-[163px] h-8 pt-[5px] pr-[10px] pb-[5px] pl-[17px] hover:bg-AliceBlue'>
            <button className='w-[134px] h-5 text-DarkGrayishBlue text-[14px] font-sans text-left'>Version history</button>
        </div>
    </div>
  )
}

export default Menu