"use client";

import React from "react";
import { divCommon } from "./Common";

//Color palettes
export const onClickAmberStyles = 'hover:bg-amber-600 active:bg-amber-700';
export const onClickTealStyles = 'hover:bg-teal-600 active:bg-teal-700';

export function Glass({className, style, children, onClick}: divCommon){

    const boxShadowBrightness = (255).toString();

    const cssDef: React.CSSProperties = {
        boxShadow: `0px 0px 6px rgba(${boxShadowBrightness}, ${boxShadowBrightness}, ${boxShadowBrightness}, 0.9) inset`,
        //backgroundColor: `rgba(${backgroundBrighness}, ${backgroundBrighness}, ${backgroundBrighness}, 0.3)`, -> HEX: #6464644d (migrated to tailwind)
        //textShadow: `3px 3px 15px rgb(0,0,0)`, -> Migrated to tailwind
    }

    const styleMerge = {...cssDef, ...style}

    const onClickColorStyles = `${((className as string).includes('bg-')) ? null : onClickTealStyles}`; //to prevent color override
    const defaultStyles = 'bg-[#6464644d] font-bold rounded-[30px] backdrop-blur-[5px]';
    const onClickStyles = `${(onClick) ? `${onClickColorStyles} text-shadow-none transition-colors delay-75 cursor-pointer` : 'cursor-default text-shadow-[3px_3px_15px_rgb(0,0,0)]'}`;
    const mainStyles = `${onClickStyles} ${defaultStyles}`;

    return (<>
        <div onClick={onClick} className={`${mainStyles} ${className}`}
                style={styleMerge}              
        >
            {children}
        </div>
    </>);
}