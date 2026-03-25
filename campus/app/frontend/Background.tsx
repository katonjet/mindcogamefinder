'use client';

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const useEffectFunc_gameBackDrop: ((arg0: string) => void)[] = [];
export function setGameBackdrop(url: string){
    useEffectFunc_gameBackDrop.forEach(element => {
        element(url);
    });
}

const useEffectFunc_backColor: ((arg0: string) => void)[] = [];
export function setBackColor(url: string){
    useEffectFunc_backColor.forEach(element => {
        element(url);
    });
}

export function Background () {
    
    const pathname = usePathname(), searchParams = useSearchParams();
    const [backdropUrl, setBackdropUrl] = useState("");
    const [backColorProp, setBackColorProp] = useState("#007899");
    const [opaque, setOpaque] = useState("");//to make game backdrop visible

    useEffectFunc_gameBackDrop.push(setBackdropUrl);
    useEffectFunc_backColor.push(setBackColorProp);

    useEffect(()=>{//Remove backdrop on URI change
        setBackdropUrl("");
        setBackColorProp("#007899");
    },[pathname,searchParams])

    useEffect(()=>{
        if (backdropUrl===""){
            setOpaque('opacity-1')
        } else {
            setOpaque('opacity-100')
        }
    },[backdropUrl]);

    const defaultCss: React.CSSProperties = {
        backgroundImage: `url('${(backdropUrl!=="")?(backdropUrl):''}')`,
    }

    //const colorPallete = '#0033ff';

    const bgBoxShadow: React.CSSProperties = {
        boxShadow: `0px 0px 120px ${backColorProp} inset, 0px 0px 60px ${backColorProp} inset, 0px 0px 30px ${backColorProp} inset`
    };
    const bgBackColor : React.CSSProperties = {
        backgroundColor: backColorProp,
        
    }
    
    return (
        <>
            {/* Background (color) */}
            <div
                style={bgBackColor}
                className={`transition-all delay-75 inset-0 -z-20 brightness-24 fixed h-screen`}
            >
            </div>

            {/* Lines */}
            <div className="transition-all delay-75 inset-0 -z-19 fixed h-screen overflow-hidden`">
                <div className="transition-all delay-75 flex top-[5vh] items-center justify-center fixed rotate-30 w-[200vw] min-w-[200vw] h-[200vh] min-h-[200vh] " style={bgBoxShadow}>
                    <div className="transition-all delay-75 left-[20vw] fixed flex items-center justify-center w-[200vw] min-w-[200vw] h-[200vh] min-h-[200vh]" style={bgBoxShadow}>
                        <div className="transition-all delay-75 left-[40vw] fixed flex items-center justify-center w-[200vw] min-w-[200vw] h-[200vh] min-h-[200vh]" style={bgBoxShadow}>
                            <div className="transition-all delay-75 left-[60vw] fixed flex items-center justify-center w-[200vw] min-w-[200vw] h-[200vh] min-h-[200vh]" style={bgBoxShadow}>
                                <div className="transition-all delay-75 left-[80vw] fixed flex items-center justify-center w-[200vw] min-w-[200vw] h-[200vh] min-h-[200vh]" style={bgBoxShadow}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom image for games */}
            <div    style={defaultCss}
                    className={`bg-cover bg-center inset-0 transition-opacity delay-75 fixed h-screen ${opaque}`}
            >

            </div>
        </>
    )
}