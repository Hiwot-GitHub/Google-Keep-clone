'use client'
import Image from 'next/image'
import {useState} from 'react'

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <header>
    <div className='h-16 w-100% p-2  border-b-2 border-ShuterGrey flex '>
      <div className='min-w-[232px] h-12 flex'>
        <div className='h-12 w-12 mx-0 my-1 p-3'>
          <img src='menu.png' />
        </div>
        <a className='w-24.38 h-11 flex items-center'>
        <img src='keep_logo.png' className='h-11 w-10 mt-0 ml-0 mr-0 mb-1'/>
        <span className='w-13.88 h-6 font-serif pt-0 pl-1 pr-0 pb-0 text-2xl text-ShuterGrey'>Keep</span>
        </a>
        
      </div>
      <div className={`w-180.5 relative flex h-12 pt-0 pr-7.5 pb-0 pl-2.5 border-2 bg-AliceBlue rounded ${isFocused ? 'bg-white shadow-black-shadow-xl':'bg-AliceBlue'}`}>
        <button className='w-14 h-11.5 py-0 px-1.25'>
          <img src='search.svg' className='w-10 h-10 m-0.75 p-2' />
        </button>
        <input type='text' className='w-83.75 flex-grow flex-shrink h-11.5 py-2.75 px-0 border-0 bg-AliceBlue focus:outline-none focus:bg-white transition-colors duration-0'
        onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder='Search' />
          <button className='w-10 h-10 p-2 mr-0.75 right-0 z-10 lg:absolute lg:insset-y-0 lg:right-0'><img src='close.svg' /></button>
        
      </div>
     
    </div>
    </header>
  )
}
