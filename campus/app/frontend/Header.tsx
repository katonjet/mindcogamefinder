"use client";

import { Glass } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import { isLoggedIn, registerReactComp } from "@/lib/user";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import path from "path";
import { useEffect, useRef, useState } from "react";

//only one function exists (index zero)
var hideHeader_: ((arg0: boolean)=>void);
export function hideHeaderFn(state: boolean){if (hideHeader_) hideHeader_(state)}

export default function Header(){

  const router = useRouter();
  
  const searchbox: any = useRef(null);
  
  const [username, setUsername] = useState("Login");
  const [hideHeader, setHideHeader] = useState(false);

  const pathname = usePathname(), searchParams = useSearchParams();

  const [searchTarget, setSearchTarget] = useState("");
  const searchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {setSearchTarget(event.target.value);};

  useEffect(() => {
    hideHeader_ = setHideHeader; //for dynamic toggle to show and hide header based on page context
    registerReactComp({dataColumn: 'username', reactFunction: setUsername})

    if (isLoggedIn()) setUsername(
        JSON.parse(localStorage.getItem('userData') as string).username
    );
    
  },[]);

  useEffect(()=>{searchbox.current.value=''},[pathname, searchParams])

  const triggerSearch = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if (e.key === 'Enter' && (searchTarget!=="" || searchTarget!==null)) {
      router.push(`/search?q=${searchTarget}`)
    }
  }

  return (
    <>
    <div className={`flex ${(hideHeader) ? 'h-0 min-h-0 m-0 p-0' : 'mt-3 ml-40 mr-40'}`}>
        <div className={`flex-1 font-[1000] text-3xl p-0 mt-2 mb-2
          text-shadow-[0_0_30px_black,0_0_30px_black,0_0_35px_black]`}>
            <Link href={'/'}>GameFinder</Link>
        </div>
        <Glass className={`flex-3 p-0 m-1 rounded-[30px] overflow-hidden flex flex-row`}>
          <input ref={searchbox} placeholder="Search" title="Search" onKeyDown={triggerSearch} onChange={searchHandle} className={`flex-1 font-bold p-0 m-0 pl-6 bg-transparent min-h-full rounded-[30px] `} />
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