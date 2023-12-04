'use client';
import {JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useState} from 'react';

const  CreateNote = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  }
  const handleSubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
  
    
  }
    return(
        <>
        <div className='flex flex-col w-full h-full ml-70 mt-4'>
            <div className='flex-1 flex flex-col max-w-lg h-auto bg-white mx-auto my-4 rounded-md shadow-lg justify-start items-center'>
                <form onSubmit={handleSubmit} className='w-full'>
                <div className={!isFocused ?'hidden':'block'}>
                <input type='text' id='title' className='w-full px-4 py-2 focus:outline-none' placeholder='Title'/></div>
                <textarea onFocus={() => setIsFocused(true)} id='add-note' rows={1} cols={33} value={inputValue} onChange={handleInputChange}
                 className='w-full h-auto py-2 px-4 focus:outline-none' placeholder='Take a note...' ></textarea>
                <button type='submit' className='hidden w-10 h-10 bg-AliceBlue rounded-md text-sm'>Submit</button>
                </form>
           </div>  
           <div className='flex w-full m-4 '>
              <DisplayNote note={inputValue} />
            </div>
       </div>
       
       </>
    );
}

const DisplayNote = (props: { note: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) =>{
  return (
    <div className="w-auto h-auto max-w-sm shadow-md rounded-md p-4 m-2">{props.note}</div>
  );
             
}

export default CreateNote;