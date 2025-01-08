'use client'

import { on } from "events";
import { IconType } from "react-icons";

interface CategoryInputProps{
    icon:IconType,
    label:string,
    selected?:boolean,
    onClick:(value:string)=>void;
}

const CategoryInput:React.FC<CategoryInputProps> = ({
    icon:Icon,
    label,
    selected,
    onClick
}) => {
    return (
        <div className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-slate-600
            transition
            cursor-pointer
            ${selected?'border-[#293040]':'border-slate-200'}
            `}
        onClick={()=>onClick(label)}
        >
            <Icon size={30} />
            <div className="font-semibold">
                {label}
            </div>
        </div>
    );
}

export default CategoryInput;