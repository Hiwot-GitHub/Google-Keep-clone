'use client';
import React, { SetStateAction, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { Label } from "@prisma/client";

const LabelNote = (props:{noteId:{}}) => {
  const [newLabel, setNewLabel] = useState('');
  const [labels, setLabels] = useState<Label[]>([]);

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

  const handleLabelInpuChange = (event:{target:{value: SetStateAction<string> }; }) => {
    setNewLabel(event.target.value);
  }

  const handleCreateLabel = (event:{preventDefault: () => void; }) => {
    event.preventDefault();
    let label: { id: number; name: string; } | undefined;
    label = labels.find((label) => label.name === newLabel);
    

    const postLabel = async () => {
      try{
      const response = await fetch('http://localhost:3000/api/NoteLabel', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: newLabel,
          noteId: props.noteId,
          labelId: label?.id
         }),
      
        });
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
    
    <div className="w-[225px] h-[250px]  pt-[11px] pb-0 px-0 shadow-lg rounded-sm z-50 bg-white">
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
        <div className="w-[225px] h-[262px] py-[6px] px-0">
          {labels.map((label) => {
           return  <DisplayLabel key={label.id} label={label} />
          })}
        </div>
         
    </div>
  );

  }

  //This component displays an existing label
  const DisplayLabel: React.FC<{label:Label}> = ({label}) => {
    const [isChecked, setIsChecked] = useState(false);
    const ToggleCheckBox = () => {
      setIsChecked(!isChecked)
      
    }
    return(
      <div className="w-[209px] h-[29px] pt-[5px] pr-[10px] pb-[3px] pl-[10px] flex">
           <div className="w-[18px] h-[18px] flex align-middle"><input type="checkbox" id={label.id.toString()} onClick={() => ToggleCheckBox} /></div>
           <div className="w-[38.7px] h-[17px] mt-0 mr-0 mb-0 ml-[7px] pt-[2px] pr-0 pb-0 pl-0 text-BlackRussian text-[13px] font-arial font-serif"> <label htmlFor="bakary">{label.name}</label></div>
          </div>
    )
  }

export default LabelNote;