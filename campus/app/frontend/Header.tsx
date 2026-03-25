"use client";

import { Glass } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import { isLoggedIn, ReactState_, registerReactComp } from "@/lib/user";
import Link from "next/link";
import { useEffect, useState } from "react";

//only one function exists (index zero)
var hideHeader_: ((arg0: boolean)=>void);
export function hideHeaderFn(state: boolean){if (hideHeader_) hideHeader_(state)}

export default function Header(){

  const headerStyles: string = 'p-3 m-1';

  const [username, setUsername] = useState("Login");
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    hideHeader_ = setHideHeader; //for dynamic toggle to show and hide header based on page context
    registerReactComp({dataColumn: 'username', reactFunction: setUsername})

    if (isLoggedIn()) setUsername(
        JSON.parse(localStorage.getItem('userData') as string).username
    );
    
  },[]);

  return (
    <>
    <div className={`flex ${(hideHeader) ? 'h-0 min-h-0 m-0 p-0' : 'mt-3 ml-40 mr-40'}`}>
        <div className={`flex-1 font-[1000] text-3xl p-0 mt-2 mb-2`}>
            <Link href={'/'}>GameFinder</Link>
        </div>
        <Glass className={`flex-3 pl-6 ${headerStyles}`}>
          Search
        </Glass>
        <div className={`flex-1 flex m-1`}>
            <Glass className={`p-0 ml-1 mr-1 hover:bg-teal-600 active:bg-teal-900 transition-colors delay-50 text-shadow-none`}>
                <Link href={'/user'} className="flex justify-center flex-row">
                  <span className={`${GlyphClass().className} text-5xl`}>A</span>
                  <div className="p-3 pl-1">{username}</div>
                </Link>
            </Glass>
        </div>
    </div>
    </>
  );
}