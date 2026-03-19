'use client';

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const useEffectFunc_gameBackDrop: ((arg0: string) => void)[] = [];
export function setGameBackdrop(url: string){
    useEffectFunc_gameBackDrop.forEach(element => {
        element(url);
    });
}

export function Background () {
    
    const pathname = usePathname(), searchParams = useSearchParams();
    const [backdropUrl, setBackdropUrl] = useState("");
    const [opaque, setOpaque] = useState("");//to make game backdrop visible

    useEffectFunc_gameBackDrop.push(setBackdropUrl);

    useEffect(()=>{//Remove backdrop on URI change
        setBackdropUrl("");
    },[pathname,searchParams])

    useEffect(()=>{
        if (backdropUrl===""){
            setOpaque('opacity-1')
        } else {
            setOpaque('')
        }
    },[backdropUrl]);

    const defaultCss: React.CSSProperties = {
        backgroundImage: `url('${(backdropUrl!=="")?(backdropUrl):'/backdrop.png'}')`,
    }
    
    return (
        <>
            <div
                    className={`bg-cover bg-center bg-[url('/backdrop.png')] inset-0 fixed h-screen`}
            >
                
            </div>
            <div    style={defaultCss}
                    className={`bg-cover bg-center inset-0 transition-opacity delay-200 fixed h-screen ${opaque}`}
            >

            </div>
        </>
    )
}