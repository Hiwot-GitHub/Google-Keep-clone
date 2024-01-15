'use client'
import Image from 'next/image'
import {useState, useEffect, Children, ReactNode,} from 'react';
import CreateNote from './components/CreateNote';
import { error } from 'console';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Heading from './components/Heading';





export default function Home() {
  
  return (
    <>
    <header>
       <Heading />
    </header>
    <main className='w-full h-full flex'>
    <nav className='flex max-w-[280px] h-full relative bg-white pt-2 px-0 pb-0'>
      <div className='w-20 h-auto flex-col '>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center bg-Oasis rounded-full'><div className='w-12 h-6 py-0 px-3'>
         <Image src='bulb.svg' alt='bulb' width={48} height={24} />
          </div></div>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center hover:bg-AliceBlue rounded-full'><div className='w-12 h-6 py-0 px-3'>
         <Image src='bell.svg' alt='reminder' width={48} height={24} />
          </div></div>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center hover:bg-AliceBlue rounded-full'><div className='w-12 h-6 py-0 px-3'>
        <Image src='label.svg' alt='labels' width={48} height={24} />
          </div></div>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center hover:bg-AliceBlue rounded-full'><div className='w-12 h-6 py-0 px-3'>
         <Image src='edit.svg' alt='edit' width={48} height={24} />
          </div></div>
         <div className='flex w-12 h-12 my-0 ml-3 mr-0 items-center hover:bg-AliceBlue rounded-full'><div className='w-12 h-6 py-0 px-3'>
         <Image src='trash.svg' alt='trash' width={48} height={24} />
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
