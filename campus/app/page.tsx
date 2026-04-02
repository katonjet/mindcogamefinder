"use client";

import { Glass } from "@/app/frontend/Glass";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { H1, P } from "@/app/frontend/Common";
import { GlyphClass } from "@/app/frontend/Glyphs";
import LoadingPage, { DelayLoad } from "@/app/frontend/LoadingPage";
import { serverURL } from "@/lib/axios";

function GameCarosel(title: string, items: any[]){

  const itemHolder: React.ReactNode = <>
    <div className="flex relative mb-14">
      <div className="flex overflow-x-scroll whitespace-nowrap snap-mandatory mt-6" 
                style={{
                  scrollbarWidth: 'none',
                }}>

            {items.map((game: any)=>{
              return  <Link key={game.id} className="mr-5 first:ml-40 last:mr-40" href={`/game/${game.id}`}>
                        <Glass  className="p-0 z-3 flex flex-col-reverse min-w-[450px] min-h-[254px] overflow-hidden relative snap-start bg-cover bg-center" 
                                style={{boxShadow: 'none' , backgroundImage: `url(${serverURL}${game.backdropimagepath})` }}
                          >
                          <Glass className="fixed z-2 min-h-full min-w-full backdrop-blur-none bg-transparent cursor-pointer">
                          </Glass>
                          <div className="fixed z-1 p-4 text-2xl min-w-full backdrop-blur-xs min-h-max line-clamp-2 bg-black/40">
                            <P>{game.title}</P>
                            <P className="font-extrabold text-yellow-500"><span className={GlyphClass().className}>F</span> {Number(game.avgrating).toFixed(1)}</P>
                          </div>
                        </Glass>
                      </Link>
            })}

      </div>
    </div>
  </>

  return <>
    <H1 className="ml-40 mb-0">{title}</H1>
    {itemHolder}
  </>

}

export default function Home() {

  const [todaysList, setTodaysList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const asyncFn = async ()=>{
      
      const data = await fetch(`${serverURL}/api/games`);

      if (data.ok) {

        setTodaysList(await data.json())

      } else {
        setTodaysList([])
      }
      await DelayLoad(2000);
      setLoading(false)

    }
    asyncFn()

  },[]);

  const defaultReturn = <>

        {/*<Glass className="m-8 h-100 p-3 text-center">
          <h1>Hello</h1>
          <p>This is a Carosel Demo</p>
          </Glass>*/}

        <div className="mt-20"></div>

        {GameCarosel(`What's new`, todaysList)}

        <div className="mt-20"></div>

    </>;

  return (loading) ? LoadingPage() : (defaultReturn);
}
