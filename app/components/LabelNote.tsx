import React from "react";
import { CiSearch } from "react-icons/ci";

const LabelNote = () => {
  return (
    <div className="w-[225px] h-[250px] pt-[11px] pb-0 px-0 shadow-lg rounded-sm z-50 bg-white">
        <div className="w-[225px] h-[17px] text-BlackRussian py-0 px-3 text-[14px]">Label note</div>
        <div className="w-[225px] h-9 py-2 px-3 flex">
            
                <input type="text" className="w-[201px] h-5 pt-[2px] pr-[11px] pb-[2px] pl-[2px] focus:outline-none" placeholder="Enter label name" autoFocus/>
                <div className="w-[18px] h-[18px] mx-0 my-[1px]"><CiSearch  /></div>
            
        </div>
        <div className="w-[225px] h-[262px] py-[6px] px-0">
          <div className="w-[209px] h-[29px] pt-[5px] pr-[10px] pb-[3px] pl-[10px] flex">
           <div className="w-[18px] h-[18px] flex align-middle"><input type="checkbox" id="bakary"  /></div>
           <div className="w-[38.7px] h-[17px] mt-0 mr-0 mb-0 ml-[7px] pt-[2px] pr-0 pb-0 pl-0 text-BlackRussian text-[13px]  font-serif"> <label htmlFor="bakary">Bakary</label></div>
            
          </div>
        </div>
    </div>
  )
}

export default LabelNote