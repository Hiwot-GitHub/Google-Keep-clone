'use client';
import {JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useState, useEffect} from 'react';
import { POST } from '../Api/Notes/route';
import { json } from 'stream/consumers';
import { stringify } from 'querystring';

interface Note{
  id: Number,
  title: string,
  content: string,
  ownerid: Number
}



const  CreateNote = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
 

  useEffect(() => {
    const getNotes = async () => {
      try{
        const response = await fetch('http://localhost:3000/Api/Notes');
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
  const handleSubmit = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    //I should create note object by sending POST request and calling getNotes function to refresh the data.
    const postNote = async () => {
      try{
        const response = await fetch('http://localhost:3000/Api/Notes', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title: 'try',
            content: `${inputValue}`,
            ownerid: 1
          }),

        });
        if (!response.ok){
          throw new Error('Failed to create a new note.')
        }
      const newNote:Note = await response.json();
      
      setNotes([newNote, ...notes]);
      } catch(error){
        console.log(error);
      }
    }
    postNote();
    
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
                <button type='submit' className='w-10 h-10 bg-AliceBlue rounded-md text-sm'>Submit</button>
                </form>
           </div>  
           <div  className='flex justify-center px-16'>
           <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-1 align-top w-full h-full m-4 '>
              
              <>
              {notes.map(note => {
                return <DisplayNote note={note} />
              })}
              </>
            </div>
            </div>
       </div>
       
       </>
    );
}

const DisplayNote: React.FC<{note: Note}> =({note})  =>{

  const handleDelete = (note_id: Number) => {
    const url = `http://localhost:3000/Api/Notes/${note_id.toString()}`;
    
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
  return (
    <div className="flex-col min-h-[80px] h-auto  flex w-60  shadow-md rounded-md p-1 m-auto text-xs  text-BlackRussian ">
      <div className='hidden w-[238px] h-[38px] pt-3 px-4 pb-0 '>{note.title}</div>
      <div>{note.content}</div>
      <div className='w-[238px] h-[34px] mb-0 mt-[26px] borde-2 border-t-2 '>
        <button onClick={() => handleDelete(note.id)}>Delete</button>
      </div>
      </div>
  );
             
}


export default CreateNote;