import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";


export default function Heading() {
    const {status, data: session} = useSession();
    const [isFocused, setIsFocused] = useState(false);

    return (
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
<div className={`hidden sm:block flex-grow max-w-lg h-12  pt-0 pr-7.5 pb-0 pl-2.5 border-2 rounded ${isFocused ? 'bg-white shadow-black-shadow-xl':'bg-AliceBlue'}`}>
  <button className='w-14 h-11.5 py-0 px-1.25'>
    <IoIosSearch className='w-10 h-10 m-0.75 p-2' />
  </button>

  <input type='text' className='h-11.5 py-auto px-0 border-0 mx-auto bg-AliceBlue focus:outline-none focus:bg-white transition-colors duration-0'
  onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder='Search' />
   { isFocused && <button className='w-10 h-10 p-2 ml-auto mr-0 relative hover:bg-AliceBlue rounded-full'><IoMdClose /></button> }
   
</div>
<div className='block sm:hidden w-10 h-10 my-[3px] mx-[1px] p-2'>
<button className=' w-14 h-11.5 py-0 px-1.25'>
    <IoIosSearch className='w-10 h-10 m-0.75 p-2' />
  </button>
</div>



{session && <Link href={"/api/auth/signin"}>{session.user?.name}</Link> && <Link href={"/api/auth/signout"} className='ml-4'>signout</Link>}
{!session && <Link href="/api/auth/signin" className='ml-8'>Login</Link>}

</div>
    );

}