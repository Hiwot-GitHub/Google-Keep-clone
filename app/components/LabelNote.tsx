'use client';
import React, { SetStateAction, useEffect, FormEvent, ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Label, NoteLabel } from "@prisma/client";
import { prisma } from "@/prisma/client";
import { number } from "zod";

const LabelNote = (props:{noteId: number}) => {
  const [newLabel, setNewLabel] = useState('');
  const [labels, setLabels] = useState<Label[]>([]); 
  const [notelabels, setNotelabels] = useState<NoteLabel[]>([]); // to store get request to NoteLabel endpoint
  const [filltered, setFilltered] = useState<NoteLabel[]>([]);  // to store labeles of the current note to enable prechecked inputboxes
  const [preCheckedLabels, setPreCheckedLabels] = useState<number[]>([]);

  useEffect(() => {
    const getLabels = async () => {
      try{
        const response = await fetch('http://localhost:3000/api/Label');
        if(!response.ok){
          throw new Error('Network error');
        }
        const jsonResponse = await response.json();
        setLabels(jsonResponse);
      }catch(error){
        console.log(error);
      }
    };
    getLabels();
  },[labels])



  useEffect(() => {
    
    const getNotLabels = async() => {
      try{
        const response = await fetch('http://localhost:3000/api/NoteLabel');
        if(!response.ok){
          throw new Error('Network error');
         }
         const jsonResponse = await response.json();
         setNotelabels(jsonResponse);
      }catch(error){
        console.log(error)
      }
     
    }
    getNotLabels();
    setFilltered(notelabels.filter((notelabel) => {
      if(notelabel.noteId === props.noteId){
        return notelabel;
      } // return all notelabels that are associated with the current note
      
    }));
   setPreCheckedLabels(filltered.map((notelabel) => {
      return notelabel.labelId
    })
   )
  
  }) 


  const handleLabelInpuChange = (event:{target:{value: SetStateAction<string> }; }) => {
    setNewLabel(event.target.value);
  }

  //adding Label to a note can be done when a new label is created or from an existing label 
  const handleCreateLabel = (arg: React.FormEvent<HTMLButtonElement> | number) => {
    let body: RequestInit | undefined;
  if (typeof arg === 'number'){
      const label_Id = arg;
      body = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          noteId: props.noteId,
          labelId: label_Id,
         })
      
        }
    } else{
      const event = arg;
      if (event as React.FormEvent<HTMLButtonElement>){
        event.preventDefault();
        body = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: newLabel,
            noteId: props.noteId,
           })
        
          }
      }
    }
    

    const postLabel = async () => {
      try{
      const response = await fetch('http://localhost:3000/api/NoteLabel', body);
        if(!response.ok){
          throw new Error('Failed to create a new label');
        }
        const jsonResponse = await response.json();
        setLabels((labels) => [...labels, jsonResponse]);
      }catch(error){
        console.log(error);
      }
    }
    postLabel();
    setNewLabel('');
  }

  return (
    
    <div className="w-[225px] h-[250px] mt-[-40px] ml-[-20px] pt-[11px] pb-0 px-0 shadow-lg rounded-sm z-50 bg-white bg-blend-overlay">
        <div className="w-[225px] h-[17px] text-BlackRussian py-0 px-3 text-[14px]">Label note</div>
        <form>
        <div className="w-[225px] h-9 py-2 px-3 flex">
                <input type="text" onChange={handleLabelInpuChange} value={newLabel} className="w-[201px] h-5 pt-[2px] pr-[11px] pb-[2px] pl-[2px] focus:outline-none" placeholder="Enter label name" autoFocus/>
                <div className="w-[18px] h-[18px] mx-0 my-[1px]"><CiSearch  /></div>
              
        </div>
       {newLabel && (<button type="submit" onClick={handleCreateLabel}><div className="w-[225px] h-[30px] bg-ShuterGreyLight pt-[5px] px-[10px] pb-[3px]">
          <div className="w-[205px] h-[21px] flex"><div className="w-[18px] h-[18px]"><IoIosAdd /></div><div className="w-auto h-[17px] mx-0 mr-0 ml-[7px] pt-[2px] px-0 pb-0 text-[13px]">`Create "{newLabel}"</div></div>
        </div></button>)}
        </form>
        <div className="w-[225px] h-[162px] overflow-y-auto overflow-x-hidden py-[6px] px-0 bg-white ">
          {labels.map((label) => {
           return  <DisplayLabel key={label.id} label={label} createLabel={handleCreateLabel} isChecked={preCheckedLabels.includes(label.id)} />
          })}
        </div>
         
    </div>
  );

  }

  //This component displays an existing label
  const DisplayLabel: React.FC<{label:Label; createLabel: (arg: React.FormEvent<HTMLButtonElement> | number) => void ; isChecked: boolean}> = ({label, createLabel, isChecked}) => {
    const [checkedItems, setCheckedItems] = useState<{[key: number]: boolean}>({});


    useEffect(() => {
      //rendering prechecked items
      setCheckedItems(prevCheckedItems => ({
        ...prevCheckedItems,
        [label.id]: isChecked
      })
      );
    },[isChecked])

    const ToggleCheckBox = (label_Id:number) => {
      setCheckedItems((prevCheckedItems) => {
       const updatedCheckedItems = { 
        ...prevCheckedItems, 
        [label_Id]: !prevCheckedItems[label_Id],
        
      };
      
      if (updatedCheckedItems[label_Id]){
        createLabel(label_Id);
      }
      return updatedCheckedItems;
      
      });
    
    };
    return(
      <div className="w-[209px] h-[29px] pt-[5px] pr-[10px] pb-[3px] pl-[10px] flex hover:bg-AliceBlue">
           <div className="w-[18px] h-[18px] flex align-middle"><input type="checkbox" id={label.id.toString()}  onChange={() => ToggleCheckBox(label.id) } checked={checkedItems[label.id]} /></div>
           <div className="w-[38.7px] h-[17px] mt-0 mr-0 mb-0 ml-[7px] pt-[2px] pr-0 pb-0 pl-0 text-BlackRussian text-[13px] font-arial font-serif"> <label htmlFor="bakary">{label.name}</label></div>
          </div>
    )
  }

export default LabelNote;