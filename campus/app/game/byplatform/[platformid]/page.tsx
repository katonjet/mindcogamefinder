//platformid

"use client";

import { setBackColor } from "@/app/frontend/Background";
import { H1, P } from "@/app/frontend/Common";
import { Glass } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import LoadingPage, { DelayLoad } from "@/app/frontend/LoadingPage";
import { serverURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Platform({params}: {params: {platformid: string;}}) {

    const [gameList, setGameList] = useState<any>([]);
    const [headingTitle, setHeadingTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const asyncFn = async () => {

            try {
                const { platformid } = await params;
                const data = await (await fetch(`${serverURL}/api/games/byplatform/${platformid}`)).json();
                setGameList(data)

                //setBackColor()
                await DelayLoad(2000);
                if (gameList) {
                    setBackColor(data[0].systemplatform.themecolor)
                    setHeadingTitle(data[0].systemplatform.title)
                }
                setLoading(false)
            } catch (error) {
                const errorMsg = (error instanceof Error)? (`${error.name}: ${error.message}`) : String(error) 
                console.error(errorMsg)
            }

        }
        asyncFn()
    },[]);

    const renderDefault = (<>
        <div className="ml-40 mr-40">
            <H1 className="mt-20 mb-20">{headingTitle} platform</H1>
            <div className="grid grid-cols-3 gap-5">
                {Array.from(gameList).map((game: any)=>{
                    return  <Link key={game.game.id} className="" href={`/game/${game.game.id}`}>
                        <Glass  className="p-0 z-3 flex flex-col-reverse min-w-[450px] min-h-[254px] overflow-hidden relative snap-start bg-cover bg-center" 
                                style={{boxShadow: 'none' , backgroundImage: `url(${serverURL}${game.game.backdropimagepath})` }}
                          >
                          <Glass className="fixed z-2 min-h-full min-w-full backdrop-blur-none bg-transparent cursor-pointer">
                          </Glass>
                          <div className="fixed z-1 p-4 text-2xl min-w-full backdrop-blur-xs min-h-max line-clamp-2 bg-black/40">
                            <P>{game.game.title}</P>
                            <P className="font-extrabold text-yellow-500"><span className={GlyphClass().className}>F</span> {Number(game.game.avgrating).toFixed(1)}</P>
                          </div>
                        </Glass>
                      </Link>
                })}
            </div>
            <div className="m-20"></div>
        </div>
    </>);


    return loading ? LoadingPage() : renderDefault;
}