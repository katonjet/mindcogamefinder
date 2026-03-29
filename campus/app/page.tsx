"use client";

import { Glass } from "@/app/frontend/Glass";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { H1, P } from "@/app/frontend/Common";
import { GlyphClass } from "@/app/frontend/Glyphs";
import LoadingPage, { DelayLoad } from "@/app/frontend/LoadingPage";
import { serverURL } from "@/lib/axios";
import { isLoggedIn, registerReactComp } from "@/lib/user";

function GameCarosel(title: string, items: any[]){

  const itemHolder: React.ReactNode = <>
    <div className="flex relative mb-14">
      <div className="flex overflow-x-scroll whitespace-nowrap snap-mandatory mt-6" 
                style={{
                  scrollbarWidth: 'none',
                }}>

            {(items.length>0) ? (items.map((game: any)=>{
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
            })) : (
              <Glass className="mr-5 first:ml-40 last:mr-40 flex items-center align-middle justify-items-center min-w-[450px] min-h-[254px] overflow-hidden">
                  <P>No games listed here</P>
              </Glass>
            )}

      </div>
    </div>
  </>

  return items.length>0 ? (<>
    <H1 className="ml-40 mb-0">{title}</H1>
    {itemHolder}
  </>) : null

}

function GenreCarosel(items: any[]){

  const itemHolder: React.ReactNode = <>
    <div className="flex relative mb-14">
      <div className="flex overflow-x-scroll whitespace-nowrap snap-mandatory mt-6" 
                style={{
                  scrollbarWidth: 'none',
                }}>

            {items.map((genre: any)=>{
              return  <Link key={genre.id} className="mr-5 first:ml-40 last:mr-40" href={`/game/bygenre/${genre.id}`}>
                        <Glass  className="p-0 z-3 flex flex-col-reverse min-w-[450px] min-h-[254px] overflow-hidden relative snap-start bg-cover bg-center" 
                                style={{boxShadow: 'none', backgroundColor: genre.themecolor }}
                          >
                          <Glass className="fixed z-2 min-h-full min-w-full backdrop-blur-none bg-transparent cursor-pointer">
                          </Glass>
                          <div className="fixed z-1 p-4 text-2xl min-w-full backdrop-blur-xs bg-linear-0 from-black/60 to-transparent">
                            <div className="m-30"></div>
                            <div className="text-4xl ml-3">{genre.title}</div>
                            <div className="m-6"></div>
                          </div>
                        </Glass>
                      </Link>
            })}

      </div>
    </div>
  </>

  return <>
    <H1 className="ml-40 mb-0">Browse by genre</H1>
    {itemHolder}
  </>

}

function PlatformCarosel(items: any[]){

  const itemHolder: React.ReactNode = <>
    <div className="flex relative mb-14">
      <div className="flex overflow-x-scroll whitespace-nowrap snap-mandatory mt-6" 
                style={{
                  scrollbarWidth: 'none',
                }}>

            {items.map((genre: any)=>{
              return  <Link key={genre.id} className="mr-5 first:ml-40 last:mr-40" href={`/game/byplatform/${genre.id}`}>
                        <Glass  className="p-0 z-3 flex flex-col-reverse min-w-[450px] min-h-[254px] overflow-hidden relative snap-start bg-cover bg-center" 
                                style={{boxShadow: 'none', backgroundColor: genre.themecolor }}
                          >
                          <Glass className="fixed z-2 min-h-full min-w-full backdrop-blur-none bg-transparent cursor-pointer">
                          </Glass>
                          <div className="fixed z-1 p-4 text-2xl min-w-full backdrop-blur-xs bg-linear-0 from-black/60 to-transparent">
                            <div className="m-30"></div>
                            <div className="text-4xl ml-3">{genre.title}</div>
                            <div className="m-6"></div>
                          </div>
                        </Glass>
                      </Link>
            })}

      </div>
    </div>
  </>

  return <>
    <H1 className="ml-40 mb-0">Browse by platform</H1>
    {itemHolder}
  </>

}

export default function Home() {

  const [todaysList, setTodaysList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [platformList, setPlatformList] = useState([]);

  //for recommendation
  const [popularList, setPopularList] = useState([]);
  const [userid, setUserId] = useState('1');
  const [favoriteList, setFavoriteList] = useState([]);
  const [randomList, setRandomList] = useState([]);
  const [randomListTitle, setRandomListTitle] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const asyncFn = async ()=>{
      
      const games = await fetch(`${serverURL}/api/games`);
      if (games.ok) {
        setTodaysList(await games.json())
      } else {
        setTodaysList([])
      }

      const genres = await fetch(`${serverURL}/api/genres`)
      if (genres.ok){
        setGenreList(await genres.json())
      } else {
        setGenreList([])
      }

      const platforms = await fetch(`${serverURL}/api/platforms`)
      if (platforms.ok){
        setPlatformList(await platforms.json())
      } else {
        setPlatformList([])
      }

      //for recommendation
      const popular = await fetch(`${serverURL}/api/recommend/popular`)
      if (popular.ok){
        setPopularList(await popular.json())
      } else {
        setPopularList([])
      }
      if (isLoggedIn()){ //display user data only if logged in

        registerReactComp({dataColumn: 'id', reactFunction: setUserId})

        const favorite = await fetch(`${serverURL}/api/recommend/byfavorites/${userid}`)
        if (favorite.ok){
          setFavoriteList(await favorite.json())
        } else {
          setFavoriteList([])
        }

        const random = await fetch(`${serverURL}/api/recommend/random/${userid}`)
        if (random.ok){
          const res = await random.json()
          setRandomList(res.list)
          setRandomListTitle(res.recommendTitle)
        } else {
          setRandomList([])
          setRandomListTitle("")
        }

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

        {isLoggedIn() ? GameCarosel(`Recommended based on favorites`, favoriteList) : null}
        {GameCarosel(`Popular`, popularList)}
        {isLoggedIn() ? GameCarosel(randomListTitle, randomList) : null}
        {GameCarosel(`What's new`, todaysList)}
        {GenreCarosel(genreList)}
        {PlatformCarosel(platformList)}

        <div className="mt-20"></div>

    </>;

  return (loading) ? LoadingPage() : (defaultReturn);
}
