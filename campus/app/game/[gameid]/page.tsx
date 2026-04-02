"use client";

import { setGameBackdrop } from "@/app/frontend/Background";
import { H1, P, divCommon, FlexContainer, Pill, PillContainer, GamePanel, H2, getStarString } from "@/app/frontend/Common";
import { Glass } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import LoadingPage, { DelayLoad } from "@/app/frontend/LoadingPage";
import { getGameReviews, isLoggedIn } from "@/lib/user";
import React, { JSX, useEffect, useState } from "react";
import Review from "../Review";
import { hideHeaderFn } from "@/app/frontend/Header";
import ReviewViewPanel from "@/app/game/ReviewViewPanel";
import ScreenshotViewPanel from "@/app/game/ScreenshotViewPanel";
import { serverURL } from "@/lib/axios";
import Link from "next/link";

//allow for setting css variables
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

function TestBar () {

  const styleTest: React.CSSProperties = {
    backgroundImage: `url('/tuesday.png')`,
    backgroundSize: 'cover',
  };

  const V: React.ReactNode = 
      <Glass className="p-3 mr-5 first:ml-0 last:mr-0 text-center min-w-[450px] min-h-[254px] snap-start" style={styleTest}>
            <h1>Screenshot</h1>
      </Glass>;

  var output: React.ReactNode[] = [];

  for (let i = 0; i < 6; i++) {
    var E = React.cloneElement(V, {key: i.toString()});
    output.push(E)  
  }

  return output;

}

function TestBar2(){

  const V: React.ReactNode = <>
    <div className="flex relative max-w-min">
      <div className="flex overflow-x-scroll whitespace-nowrap snap-mandatory mt-6" 
                style={{
                  scrollbarWidth: 'none',
                }}>
            {TestBar().map((test: React.ReactNode) => {
              return test;
            })}
      </div>
    </div>
  </>

  var output: React.ReactNode[] = [];

  for (let i = 0; i < 1; i++){
    var E = React.cloneElement(V, {key: i.toString()});
    output.push(E);
  }

  return output;

}

function RatingPill({rating}: {rating: string}){

    const tempRating = Number(rating);

    //Make sure rating value is within range while not crashing the frontend
    if (tempRating < 1 || tempRating > 5){
        return <Pill><span className={`${GlyphClass().className} text-xl`}>BBBBB</span></Pill>
    }

    return <Pill className="text-yellow-300">{Number(tempRating.toFixed(1))} <span className={`${GlyphClass().className} text-xl`}>{getStarString(rating)}</span></Pill>

}

function BlurShadow({children, style, className}: divCommon){
    return <div 
            style={{
                ...style,
                gridTemplateAreas: "content"
            }}
            className={`grid grid-cols-1 grid-rows-1 relative ${className}`}>
                
                <div 
                    className="bg-[rgba(0,0,0,0.6)] blur-xl rounded-lg z-1 min-w-max"
                    style={{gridArea: "content"}}
                />
                <div
                    className="z-2"
                    style={{gridArea: "content"}}
                >
                    {children}
                </div>
        
    </div>;
}

async function getGame(gameid: string){
    const res = await fetch(`${serverURL}/api/games/${gameid}`);
    return (res.ok) ? (await res.json()) : null;
}

export default function Game({params}: {params: {gameid: string;}}) {

    //Loading page
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("A game");
    const [desc, setDesc] = useState("A game description");
    const [rating, setRating] = useState("0");
    const [game_id, setGameId] = useState("1");
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    //For game review writing
    const [showReviewPopup,setShowReviewPopup] = useState(false);
    const [showReviewListPopup,setShowReviewListPopup] = useState(false); //this lists other users review
    const [showScreenshotPopup,setScreenshotPopup] = useState(false);

    //for listing existing game reviews
    const [myReviewList, setMyReviewList] = useState([]);

    //Toggles //toggle based trigger
    const [reviewListRefresh, setReviewListRefresh] = useState(false); 

    //user login status
    const [loggedIn, setLoggedIN] = useState(false);


    //set login state
    useEffect(()=>{
        setLoggedIN(isLoggedIn());
    })

    useEffect(()=>{
        const asyncFn = async () => {
            const { gameid } = await params;
            setGameId(gameid)
            try {
                const data = await getGameReviews(Number(gameid));
                setMyReviewList([]) //reset list
                setMyReviewList(data)
            } catch (error) {
                console.log("Cannot fetch reviews");
            }
        };

        asyncFn();
    },[reviewListRefresh]); //refresh list on toggle

    useEffect(() => {

        const asyncFunc = async () => {
            const { gameid } = await params;
            //setGameId(gameid);
            const gameData = await getGame(gameid);
            if (gameData) {

                const genreList = await fetch(`${serverURL}/api/games/genres/${gameid}`);
                const platformList = await fetch(`${serverURL}/api/games/platforms/${gameid}`);

                setTitle(gameData.title);
                setDesc(gameData.desc);
                setRating(gameData.avgrating);
                setGenres(genreList.ok ? (await genreList.json()) : []);
                setPlatforms(platformList.ok ? (await platformList.json()) : []);
                
                await DelayLoad(2000);
                setGameBackdrop(`${serverURL}${gameData.backdropimagepath}`);
                setLoading(false);
            }
        };

        asyncFunc();

    },[]);

    const responseReactPopup = (status_: boolean) => {
        //refresh review list using UseEffect
        if (status_) setReviewListRefresh(!reviewListRefresh);

        //Delay for server refresh
        DelayLoad(2000);

        //show header again
        hideHeaderFn(false);

        //Finally close popup
        setShowReviewPopup(false)
    };

    const setReviewUI = (array: any): JSX.Element => {

        const defaultNull = <Glass className="p-3"><P className="text-center p-3">No comments found</P></Glass>;

        if (!array || array.length===0) {
            return defaultNull;
        }

        if (array.length <=2) {
            return <>{array.map((review: any) => {
                    return (review.title || review.comment) ? 
                        <Glass key={review.id} className="p-10 mb-5 min-h-44 bg-black/36 text-shadow-none">
                            <div className="flex">
                                <H2 className="flex-1">{review.title}</H2>
                                <H2 className={`${GlyphClass().className}`}>{getStarString(review.rating)}</H2>
                            </div>
                            <P className="line-clamp-2">{review.comment}</P>
                        </Glass>
                         : null;
                    })}
                    <P onClick={()=>{setShowReviewListPopup(true);hideHeaderFn(true);}} className="text-center cursor-pointer p-3">View more...</P>
                    </>
        }

        if (array.length > 2) {

            //to select reviews with only title anc comment
            const visibleList = [];
            for (let i = 0; (visibleList.length <= 1 && i < array.length); i++) {
                if (array[i].title || array[i].comment) {
                    visibleList.push(array[i]);
                }
            }

            return <>
                {visibleList.map((review: any)=> {
                    return <Glass key={review.id} className="p-10 mb-5 min-h-44 bg-black/36 text-shadow-none">
                                <div className="flex">
                                    <H2 className="flex-1">{review.title}</H2>
                                    <H2 className={`${GlyphClass().className}`}>{getStarString(review.rating)}</H2>
                                </div>
                                <P className="line-clamp-2">{review.comment}</P>
                            </Glass>
                })}

                <P onClick={()=>{setShowReviewListPopup(true);hideHeaderFn(true);}} className="text-center cursor-pointer p-3">View more...</P>
            </>
        }

        return defaultNull;

    };

    const setScreenshotsUI = (count: number): JSX.Element => {

        const plusArb_N = (count>4) ? (count-4) : 0;

        const styleTest: React.CSSProperties = {
          backgroundImage: `url('/tuesday.png')`,
          backgroundSize: 'cover',
        };
        const V: React.ReactNode = 
        <Glass onClick={()=>{setScreenshotPopup(true);hideHeaderFn(true);}} className="p-3 min-h-50 text-center min-w-auto" style={styleTest}>
              
        </Glass>;
        const X: React.ReactNode = 
        <div>
            <Glass className="p-3 min-h-50 text-center min-w-auto" style={styleTest}>
                <Glass onClick={()=>{setScreenshotPopup(true);hideHeaderFn(true);}} className="m-0 p-0 backdrop-blur-none border-none absolute bg-contain inset-0 -z-10 bg-black/40 overflow-hidden flex justify-center items-center">
                    <H1 className="text-5xl font-light">{plusArb_N}+</H1>
                </Glass>
            </Glass>
        </div>

        const defaultElement = <div className="grid grid-cols-2 gap-5 mt-11">
            {V}
            {V}
            {V}
            {(plusArb_N!==0) ? X : V}
        </div>

        if (count>4) {
            return defaultElement
        } else {
            const Vx: JSX.Element[] = []
            for (let index = 0; index < count; index++) {
                Vx.push(V)
            }
            return <>
                <div className="grid grid-cols-2 gap-5 mt-11">
                    {Vx.map((n) => {
                        return n
                    })}
                </div>
            </>
        }

    }

    //Only render review panel add button if logged in
    const ReviewPanel = (loggedIn) ? (
        <Glass className="max-h-min p-3 flex justify-center align-middle ml-6 text-7xl rounded-[100px]" onClick={()=>{setShowReviewPopup(true);hideHeaderFn(true);}}>
            <div className="m-4 leading-10">+</div>
        </Glass>
    ) : (null);

    //const { gameid } = await params;
    //textShadow: `3px 3px 30px rgba(10,10,10), -3px -3px 30px rgba(10,10,10)`
    const DefaultPage = (<>
        {/* Game reviewing panel */}
        {
            (showReviewPopup) ? (<Review gameid={Number(game_id)} effectReturnFn={responseReactPopup} />) : (null)
        }
        {/* Game Review reading panel */}
        {
            (showReviewListPopup) ? ReviewViewPanel(myReviewList, ()=>{setShowReviewListPopup(false);hideHeaderFn(false);}) : null
        }
        {/* Game Review reading panel */}
        {
            (showScreenshotPopup) ? ScreenshotViewPanel(()=>{setScreenshotPopup(false);hideHeaderFn(false);}) : null
        }
        <div className="m-14 ml-40 mr-40">
            <div className="mt-8 mb-8 min-h-[60vh] flex">
                
                <div className="flex-3">
                    <div className="max-w-1/2" style={{/*textShadow: `3px 3px 15px rgb(10,10,10), 0 0 15px rgb(10,10,10), 0 0 15px rgb(10,10,10), 0 0 15px rgb(10,10,10)`*/}}>

                        <H1 style={{textShadow: `0px 0px 50px rgba(0,0,0,1), 0px 0px 50px rgba(0,0,0,1), 0px 0px 25px rgba(0,0,0,1)`}}>{title}</H1>

                        <BlurShadow className="text-left mb-6">
                            <div className="font-extrabold" dangerouslySetInnerHTML={{__html: desc}} />
                        </BlurShadow>

                        <PillContainer>
                            <RatingPill rating={rating}/>
                        </PillContainer>
                        <PillContainer>
                            {genres.map((genre: any) => {
                                return <Link key={genre.id} className="m-1 p-0 first:ml-0 last:mr-0" href={`/game/bygenre/${genre.id}`}>
                                    <Pill colorHex={genre.themecolor} onClick={()=>{}} style={{ '--dynamic-color': genre.themecolor }} className="hover:bg-(--dynamic-color) m-0 p-0" >{genre.title}</Pill>
                                </Link>
                            })}
                        </PillContainer>
                        <PillContainer>
                            {platforms.map((platform: any) => {
                                return <Link key={platform.id} className="m-1 p-0 first:ml-0 last:mr-0" href={`/game/byplatform/${platform.id}`}>
                                    <Pill colorHex={platform.themecolor} onClick={()=>{}} style={{ '--dynamic-color': platform.themecolor }} className="hover:bg-(--dynamic-color) m-0 p-0" >{platform.title}</Pill>
                                </Link>
                            })}
                        </PillContainer>
                    </div>
                </div>
            </div>

            <FlexContainer>
                <GamePanel className="flex-1">
                    <div className="flex mb-6">
                        <H1 className="flex-1">Reviews</H1>
                        {(showReviewPopup) ? null : ReviewPanel}
                    </div>

                    {/* Game reviewing panel (check up) */}

                    {/* others reviews (myReviewList) */}
                    <div className="">
                        {setReviewUI(myReviewList)}
                    </div>

                </GamePanel>

                <GamePanel className="flex-1 overflow-hidden">
                    <H1>Screenshots</H1>
                    {/*<TestBar2/>*/}
                    {setScreenshotsUI(Math.floor(Math.random() * 15) + 4)}
                </GamePanel>

            </FlexContainer>

        </div>
    </>);

    if (loading) {
        return LoadingPage();
    } else {
        return DefaultPage;
    }

}
