'use client';
import {JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useState, useEffect, useRef} from 'react';
import { TfiPin2 } from "react-icons/tfi";
import { HiOutlineTrash } from "react-icons/hi2";
import { BiBellPlus } from "react-icons/bi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { PiCookieLight } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa6";
import { BiArchiveIn } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { POST } from '../api/Notes/route';
import { json } from 'stream/consumers';
import { stringify } from 'querystring';
import { title } from 'process';
import React from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import Menu from './Menu';



interface Note{
  id: Number,
  title: string,
  content: string,
  ownerid: string
}


const  CreateNote = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const {status, data: session} = useSession();
 
 

  useEffect(() => {
    const getNotes = async () => {
      try{
        const response = await fetch('http://localhost:3000/api/Notes');
        if (!response.ok){
          throw new Error('Network error');
        }
        const jsonResponse: Note[] = await response.json();
        setNotes(jsonResponse);
        
      } catch(error) {
        console.log(error);
        };
    };
    getNotes();
   
  },[notes])
 
  
  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  }
  const handleTitleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setTitle(event.target.value);
  }
  const handleSubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    //I should create note object by sending POST request and calling getNotes function to refresh the data.
    setIsFocused(false);
    const postNote = async () => {
      try{
        const response = await fetch('http://localhost:3000/api/Notes', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title: `${title}`,
            content: `${inputValue}`,
            ownerid:  'clq2cwxqd000011xj6k46km6r'
          }),

        });
        if (!response.ok){
          throw new Error('Failed to create a new note.')
        }
      const newNote:Note = await response.json();
      
      setNotes((notes) => [ ...notes, newNote]);
      
      
      } catch(error){
        console.log(error);
      }
    }
    postNote();
    setInputValue('');
    setTitle('');
    
    
  }



  
    return(
        <>
        <div className='flex flex-col w-full h-full ml-70 mt-4'>
            <div className='flex-1 flex flex-col  h-auto bg-white mx-auto my-4 rounded-md shadow-lg justify-start items-center'>
                <form onSubmit={handleSubmit} className='w-full'>
                <div className={!isFocused ?'hidden':'block'}>
                <input type='text' id='title' className='w-full px-4 py-2 focus:outline-none' value={title} onChange={handleTitleChange} placeholder='Title'/></div>
                <textarea onFocus={() => setIsFocused(true)} id='add-note' rows={1} cols={33} value={inputValue} onChange={handleInputChange}
                 className='w-full h-auto py-2 px-4 focus:outline-none' placeholder='Take a note...' ></textarea>
                <div className={!isFocused ?'hidden':'block'}>
                <div className='flex w-full  h-[34px] mb-0 mt-[26px] borde-2 align-middle justify-around '> 
                  <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BiBellPlus /></button>
                  <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' >< HiOutlineUserAdd /></button>
                  <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><PiCookieLight /></button>
                  <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><FaRegImage /></button>
                  <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BiArchiveIn /></button>
                  <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BsThreeDotsVertical /></button>
                  <button type='submit' className='w-10 h-10  text-xm'>Close</button>
               </div>
               
                  </div>
                </form>
           </div>  
           <div  className='flex justify-center px-16'>
           <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-1 align-top w-full h-full m-4'>
              
              <>
              { status === 'authenticated' && notes.map(note => {
                return <DisplayNote  key={note.id.toString()} note={note} />
              })}
              </>
            </div>
            </div>
       </div>
       
       </>
    );
}

const DisplayNote: React.FC<{note: Note}> = ({note})  => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title || '');
  const [newContent, setNewContent] = useState(note.content || '');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const openModal = () =>{
    setIsModalOpen(true);
  }

  const handleDelete = (note_id: Number) => {
    const url = `http://localhost:3000/api/Notes/${note_id.toString()}`;
    
    const deleteNote = async () => {
      try{
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
      });
      if (!response.ok){
        throw new Error('Failed to delete note.')
      }
      
    } catch(error){
      console.log(error);
    }
      
  }
  deleteNote();
} 
const handleTitleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
  setNewTitle(event.target.value);
}
const handleContentChange = (event: {target: {value: SetStateAction<string>; }; }) => {
  setNewContent(event.target.value);
}

const handleUpdate = (event: { preventDefault: () => void; }, note_id: Number) => {
  event.preventDefault();
  const url = `http://localhost:3000/api/Notes/${note_id.toString()}`;

  const updateNote = async () => {
    try{
      const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: newTitle,
          content: newContent
    })
  });

     if (response.ok){
      throw new Error('Failed to delete note.')
    }
    
  } catch(error){
    console.log(error);
  }
  
  }
  updateNote();

}

  function toggleMenu(){
    setMenuVisible(!isMenuVisible);
  }

  function closeMenu(event: MouseEvent){
    if (menuRef.current && !menuRef.current.contains(event.target as Node) && !btnRef.current!.contains(event.target as Node)){
      setMenuVisible(false);
    }
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      closeMenu(event);
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
    
   <div className="group flex-col min-h-[114px] h-auto  flex w-60  shadow-md rounded-md p-1 m-auto text-xs  text-BlackRussian">
   <button onClick={openModal} className={isModalOpen?'hidden':''}>
    <div className='w-[42px] h-38 mt-0 ml-[200px] absolute flex align-bottom justify-start '>
    <div  className="hidden w-[34px] h-[34px] mr-0 group-hover:block align-bottom justify-center rounded-full hover:bg-AliceBlue"><TfiPin2  /></div>
    </div>
    <div className={`${title.length === 0 ? 'hidden': 'block'}`}>
    <div className='w-[238px] h-[38px] pt-3 px-4 pb-0 text-sm '>{note.title}</div></div>
      <div>{note.content}</div></button>

      <div className='hidden relative group-hover:block'>
      <div className='flex w-[238px] h-[34px] mb-0 mt-[26px] borde-2 align-middle justify-around '> 
        <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BiBellPlus /></button>
        <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' >< HiOutlineUserAdd /></button>
        <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><PiCookieLight /></button>
        <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><FaRegImage /></button>
        <button className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BiArchiveIn /></button>
        <button onClick={toggleMenu} ref={btnRef} className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BsThreeDotsVertical />
        <div className='z-50' ref={menuRef}>{ isMenuVisible && <Menu onDelete={() => handleDelete(note.id)} />} </div></button> 
      </div>
      </div>
    </div>
   
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(!isModalOpen)} style={{overlay:{background: 'rgba(0,0,0,0.5)'}}} className="modal h-[121px] w-[632px] p-4 ml-80 mt-40 ">
      <div className='modal-content shadow-md flex-col'>
        <form onSubmit={(event) => handleUpdate(event, note.id)}>
        <input type='text' value={newTitle} onChange={handleTitleChange} className='w-full h-auto py-2 px-4 focus:outline-none'/>
        <textarea rows={1} cols={33} value={newContent } onChange={handleContentChange} className='w-full h-auto py-2 px-4 focus:outline-none'></textarea>
        <button type='submit' className='bg-BlackRussian rounded-md text-white w-12 text-xs'>save</button>
        </form>
      </div>
    </Modal>
    </>
  );
             
}


export default CreateNote;