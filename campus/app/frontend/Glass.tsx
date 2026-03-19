"use client";

import React from "react";
import { divCommon } from "./Common";

export function Glass({className, style, children}: divCommon){

    const boxShadowBrightness = (255).toString();
    const backgroundBrighness = (100).toString();

    const cssDef: React.CSSProperties = {
        boxShadow: `0px 0px 6px rgba(${boxShadowBrightness}, ${boxShadowBrightness}, ${boxShadowBrightness}, 0.9) inset`,
        //backgroundColor: `rgba(${backgroundBrighness}, ${backgroundBrighness}, ${backgroundBrighness}, 0.3)`, -> HEX: #6464644d (migrated to tailwind)
        //textShadow: `3px 3px 15px rgb(0,0,0)`, -> Migrated to tailwind
    }

    const styleMerge = {...cssDef, ...style}

    return (<>
        <div className={`bg-[#6464644d] text-shadow-[3px_3px_15px_rgb(0,0,0)] cursor-default font-bold rounded-[30px] backdrop-blur-[5px] ${className}`}
                style={styleMerge}              
        >
            {children}
        </div>
    </>);
}