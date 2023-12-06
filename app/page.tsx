'use client'
import Image from 'next/image'
import {useState, useEffect} from 'react';
import CreateNote from './components/CreateNote';
import { error } from 'console';



export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <>
    <header>
    <div className='h-16 w-100% p-2 border-b-2 border-ShuterGrey flex '>
      <div className='min-w-[232px] h-12 flex'>
        <div className='h-12 w-12 mx-0 my-1 p-3'>
          <img src='menu.png' />
        </div>
        <a className='w-24.38 h-11 flex items-center'>
        <img src='keep_logo.png' className='h-11 w-10 mt-0 ml-0 mr-0 mb-1'/>
        <span className='w-13.88 h-6 font-serif pt-0 pl-1 pr-0 pb-0 text-2xl text-ShuterGrey'>Keep</span>
        </a>
        
      </div>
      <div className={`flex-1 flex max-w-2xl h-12 pt-0 pr-7.5 pb-0 pl-2.5 border-2 rounded ${isFocused ? 'bg-white shadow-black-shadow-xl':'bg-AliceBlue'}`}>
        <button className='w-14 h-11.5 py-0 px-1.25'>
          <img src='search.svg' className='w-10 h-10 m-0.75 p-2' />
        </button>
        <input type='text' className='flex-1 h-11.5 py-auto px-0 border-0 mx-auto bg-AliceBlue focus:outline-none focus:bg-white transition-colors duration-0'
        onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder='Search' />
          <button className='w-10 h-10 p-2 mr-0.75 right-0 z-10 ml-1 relative hover:bg-AliceBlue rounded-full'><img src='close.svg' /></button>
        
      </div>
     
    </div>
    </header>
    <main className='w-full h-full flex'>
    <nav className='flex max-w-[280px] h-full relative bg-white pt-2 px-0 pb-0'>
      <div className='w-20 h-auto flex-col '>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center bg-Oasis rounded-full'><div className='w-12 h-6 py-0 px-3'>
         <img src='bulb.svg' />
          </div></div>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center hover:bg-AliceBlue rounded-full'><div className='w-12 h-6 py-0 px-3'>
         <img src='bell.svg'/>
          </div></div>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center hover:bg-AliceBlue rounded-full'><div className='w-12 h-6 py-0 px-3'>
        <img src='label.svg'/>
          </div></div>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center hover:bg-AliceBlue rounded-full'><div className='w-12 h-6 py-0 px-3'>
         <img src='edit.svg'/>
          </div></div>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center hover:bg-AliceBlue rounded-full'><div className='w-12 h-6 py-0 px-3'>
         <img src='trash.svg'/>
          </div></div>
      </div>
      <div className='hidden flex-col text-BlackRussian text-[14px] sm:block'>
        <span className='h-12 ml-5 flex items-center'>Notes</span>
        <span className='h-12 ml-5 flex items-center'>Reminders</span>
        <span className='h-12 ml-5 flex items-center'>Labels</span>
        <span className='h-12 ml-5 flex items-center'>Edit labels</span>
        <span className='h-12 ml-5 flex items-center'>Trash</span>
      </div>
    </nav>
  <CreateNote />
  <div>

  
  </div>
 
    </main>
    </>
  )
  }
