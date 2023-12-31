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
import LabelNote from './LabelNote';
import Label from './Label';



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
            ownerid:  'clqqko8yq0000uv7ir4pnx3cs'
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
  const [isAddLabelVisible, setAddLabelVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isBtnTwo, setIsBtnTwo] = useState(false);
  const [isBtnThree, setIsBtnThree] = useState(false);
  const [isBtnFour, setIsBtnFour] = useState(false);
  const [isBtnFive, setIsBtnFive] = useState(false);
  const [isBtnOne, setIsBtnOne] = useState(false);
  const [isBtnSix, setIsBtnSix] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const addLabelRef = useRef<HTMLDivElement>(null);
  const btnAddLabelRef = useRef<HTMLButtonElement>(null);

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
    setIsBtnSix(false);
    
    
    
  }

  
 const addLabel =  () => {
      setMenuVisible(false);
      setAddLabelVisible(true);
      setIsBtnSix(false);
  };


 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && btnRef.current && !menuRef.current.contains(event.target as Node) 
            && !btnRef.current.contains(event.target as Node) ){
          setMenuVisible(false);
        }
      if (addLabelRef.current && !addLabelRef.current.contains(event.target as Node)){
        setAddLabelVisible(false);
      }
     
    };
    

    // Attach the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);
   

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
     
    };
  }, [isMenuVisible, isAddLabelVisible]);




  return (
    <>
    
   <div onClick={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)} className={`group ${isActive?'active':''} flex-col min-h-[174px] h-auto  flex w-60  shadow-md rounded-md p-1 m-auto text-xs  text-BlackRussian relative `}>
   <button onClick={openModal} className={isModalOpen?'hidden':''}>
    <div className='w-[42px] h-38 mt-0 ml-[200px] absolute flex align-bottom justify-start '>
    <div  className="hidden w-[34px] h-[34px] mr-0 group-hover:block align-bottom justify-center rounded-full hover:bg-AliceBlue group-active:block"><TfiPin2  /></div>
    </div>
    <div className={`${title.length === 0 ? 'hidden': 'block'}`}>
    <div className='w-[238px] h-[38px] pt-3 px-4 pb-0 text-sm '>{note.title}</div></div>
      <div>{note.content}</div></button>

       {/* Below  is the code to display label if the not has any label*/}
      <div className='w-[238px] h-10 py-[5px] px-[10px] flex mt-3'>
        <Label />
      </div>

      <div className={`hidden absolute group-hover:block group-active:block mt-[114px]`}>
      <div className='flex w-[238px] h-[34px] mb-0 mt-[26px] borde-2 align-middle justify-around '> 
        <button onMouseEnter={() => setIsBtnOne(true)} onMouseLeave={() => setIsBtnOne(false)} onClick={() => setIsBtnOne(false)} className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BiBellPlus />{isBtnOne && <div className='w-16 bg-Charchol text-slate-50 ml-[-30px]'>Remind me</div>}</button>
        <button onMouseEnter={() => setIsBtnTwo(true)} onMouseLeave={() => setIsBtnTwo(false)}  className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' >< HiOutlineUserAdd />{isBtnTwo && <div className='w-18 bg-Charchol text-slate-50 ml-[-16px] mr-[-16px]'>Collaborator</div>}</button>
        <button onMouseEnter={() => setIsBtnThree(true)} onMouseLeave={() => setIsBtnThree(false)}  className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><PiCookieLight />{isBtnThree && <div className='w-30 bg-Charchol text-slate-50 ml-[-50px] mr-[-50px]'>Background options</div>}</button>
        <button onMouseEnter={() => setIsBtnFour(true)} onMouseLeave={() => setIsBtnFour(false)}  className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><FaRegImage />{isBtnFour && <div className='w-16 bg-Charchol text-slate-50 ml-[-30px]'>Add image</div>}</button>
        <button onMouseEnter={() => setIsBtnFive(true)} onMouseLeave={() => setIsBtnFive(false)}  className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BiArchiveIn />{isBtnFive && <div className='w-12S bg-Charchol text-slate-50 ml-[-20px]'>Archive</div>}</button>
        <div onMouseEnter={() => setIsBtnSix(true)} onMouseLeave={() => setIsBtnSix(false)}  onClick={toggleMenu} ref={btnRef} className='w-[18px] h-[18px] hover:bg-AliceBlue rounded-full' ><BsThreeDotsVertical />{isBtnSix && <div className='w-8 bg-Charchol text-slate-50 ml-[-10px] py-[2px] px-[4px] text-[12px]'>More</div>}
        <div className='z-50' ref={menuRef} onClick={(e) => e.stopPropagation()}>{ isMenuVisible && <Menu onDelete={() => handleDelete(note.id)} onAddLabel={() => addLabel()} btnRef={btnAddLabelRef} />}
        <div className='z-50' ref={addLabelRef} onClick={(e) => e.stopPropagation()}> { isAddLabelVisible && !isMenuVisible &&  <LabelNote noteId={note.id} />} </div> </div> </div>
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