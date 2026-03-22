"use client";

import { setGameBackdrop } from "@/app/frontend/Background";
import { H1, P, divCommon, FlexContainer, Pill, PillContainer, GamePanel } from "@/app/frontend/Common";
import { Glass, onClickAmberStyles } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import LoadingPage, { DelayLoad } from "@/app/frontend/LoadingPage";
import { sendNewGameReview } from "@/lib/user";
import React, { useEffect, useState } from "react";

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

    const fullStarCount = parseInt(rating as string),
          partialStarPercent = Math.floor((tempRating - fullStarCount) * 100);

    const partialStarCharacter = function () {
        if (partialStarPercent > 0 && partialStarPercent < 50) {return "C";}
        if (partialStarPercent >= 50 && partialStarPercent < 75) {return "D";}
        if (partialStarPercent >= 75 && partialStarPercent < 100) {return "E";}
        return "";
    };

    const fullStarString = function () {
        let tempStoreStar = "";
        for (let index = 0; index < fullStarCount; index++) {
            tempStoreStar += "F"
        }
        return tempStoreStar;
    }

    const emptyStarString = function () {
        let tempStoreStar = "";

        const partialStarConsideration = (partialStarPercent > 0) ? 4 : 5;

        for (let index = 0; index < partialStarConsideration - fullStarCount; index++) {
            tempStoreStar += "B"
        }
        return tempStoreStar;
    }

    const starString: string = `${fullStarString()}${partialStarCharacter()}${emptyStarString()}`;

    return <Pill>{Number(tempRating.toFixed(1))} <span className={`${GlyphClass().className} text-xl`}>{starString}</span></Pill>

}

function BlurShadow({children, style, className}: divCommon){
    return <div 
            style={{
                ...style,
                gridTemplateAreas: "content"
            }}
            className={`grid relative mb-6 ${className}`}>
                
                <div 
                    className="bg-[rgba(0,0,0,0.35)] blur-xl rounded-lg z-1 min-w-max"
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
    const res = await fetch(`http://localhost:8000/api/games/${gameid}`);
    return (res.ok) ? (await res.json()) : null;
}

export default function Game({params}: {params: {gameid: string;}}) {

    //Loading page
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("A game");
    const [desc, setDesc] = useState("A game description");
    const [rating, setRating] = useState("0");
    const [genres, setGenres] = useState([]);

    //For game review
    const [myReviewRating, setMyReviewRating] = useState(0);
    const [myReviewTitle, setMyReviewTitle] = useState("");
    const [myReviewComment, setMyReviewComment] = useState("");

    function starSelect (rate: number) {

        (document.getElementById('star1') as HTMLElement).innerHTML = 'B';
        (document.getElementById('star2') as HTMLElement).innerHTML = 'B';
        (document.getElementById('star3') as HTMLElement).innerHTML = 'B';
        (document.getElementById('star4') as HTMLElement).innerHTML = 'B';
        (document.getElementById('star5') as HTMLElement).innerHTML = 'B';
        setMyReviewRating(0);

        //check range
        if (rate >= 1 && rate <= 5){
            setMyReviewRating(rate);
            if (rate >= 1) (document.getElementById('star1') as HTMLElement).innerHTML = 'F';
            if (rate >= 2) (document.getElementById('star2') as HTMLElement).innerHTML = 'F';
            if (rate >= 3) (document.getElementById('star3') as HTMLElement).innerHTML = 'F';
            if (rate >= 4) (document.getElementById('star4') as HTMLElement).innerHTML = 'F';
            if (rate >= 5) (document.getElementById('star5') as HTMLElement).innerHTML = 'F';
        }
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {setMyReviewTitle(event.target.value);};
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {setMyReviewComment(event.target.value);};

    const sendReviewToServer = () => {
        
        const asyncFn = async ()=> {
            const { gameid } = await params;
            const res = await sendNewGameReview(gameid,myReviewRating,myReviewTitle,myReviewComment);
            console.log(res);
        }

        asyncFn();

    }

    useEffect(() => {

        const asyncFunc = async () => {
            const { gameid } = await params;
            const gameData = await getGame(gameid);
            if (gameData) {
                setTitle(gameData.title);
                setDesc(gameData.desc);
                setRating(gameData.avgrating);
                setGenres(JSON.parse(gameData.genres));
                
                await DelayLoad(2000);
                setGameBackdrop(`http://localhost:8000${gameData.backdropimagepath}`);
                setLoading(false);
            }
        };

        asyncFunc();

    },[]);

    //const { gameid } = await params;
    //textShadow: `3px 3px 30px rgba(10,10,10), -3px -3px 30px rgba(10,10,10)`
    const DefaultPage = (
        <div className="m-14 ml-40 mr-40">
            <div className="m-8 min-h-[60vh] flex">
                
                <div className="flex-3">
                    <div className="max-w-1/2" style={{/*textShadow: `3px 3px 15px rgb(10,10,10), 0 0 15px rgb(10,10,10), 0 0 15px rgb(10,10,10), 0 0 15px rgb(10,10,10)`*/}}>

                        <H1 style={{textShadow: `0px 0px 50px rgba(0,0,0,0.7), 0px 0px 50px rgba(0,0,0,0.7)`}}>{title}</H1>

                        <BlurShadow className="text-left">
                            <P className="font-extrabold">{desc}</P>
                        </BlurShadow>

                        <PillContainer>
                            <RatingPill rating={rating}/>
                        </PillContainer>
                        <PillContainer>
                            {genres.map((genre) => {
                                return <Pill key={genre}>{genre}</Pill>;
                            })}
                        </PillContainer>
                    </div>
                </div>
            </div>

            {/*<FlexContainer>
                <GamePanel className="flex-1 overflow-hidden">
                    <H1>Screenshots</H1>
                    <TestBar2/>
                </GamePanel>
            </FlexContainer>*/}

            <FlexContainer>
                <GamePanel className="flex-1">
                    <div className="flex mb-6">
                        <H1 className="flex-5">Review</H1>
                        <div>
                            <Glass className="max-h-min p-3 flex justify-center align-middle rl-7 text-7xl rounded-[100px]" onClick={()=>{}}>
                                <div className="m-4 leading-10">+</div>
                            </Glass>
                        </div>
                    </div>

                    {/* Game reviewing panel */}
                    <Glass className="p-4">

                        <div className="flex mt-4 mb-4">
                            <div className="text-right flex-1/150">Rating</div>
                            {/*<input className="ml-5 rounded-4xl bg-black/60 flex-6 p-2" type="text" name="" id="" />*/}
                            <div className={`flex-6 ml-5 flex ${GlyphClass().className} text-3xl leading-7`}>
                                <div id='star1' onClick={()=>{starSelect(1)}}>B</div>
                                <div id='star2' onClick={()=>{starSelect(2)}}>B</div>
                                <div id='star3' onClick={()=>{starSelect(3)}}>B</div>
                                <div id='star4' onClick={()=>{starSelect(4)}}>B</div>
                                <div id='star5' onClick={()=>{starSelect(5)}}>B</div>
                            </div>
                        </div>

                        <div className="flex mt-4 mb-4">
                            <div className="text-right flex-1/150">Title</div>
                            <input onChange={handleTitleChange} className="ml-5 rounded-4xl bg-black/60 flex-6 p-2" type="text" name="" id="title" />
                        </div>

                        <div className="flex mt-4 mb-4">
                            <div className="text-right flex-1/150">Comment</div>
                            <textarea onChange={handleCommentChange} className="ml-5 rounded-2xl bg-black/60 flex-6 p-2" name="" id="comment"></textarea>
                        </div>

                        <div className="flex flex-row mt-4 mb-4">
                            <div className="flex-1"></div>
                            <div className="flex-6 ml-5 flex justify-start">
                                <Glass className="p-3 m-1" onClick={sendReviewToServer}>Submit</Glass>
                                <Glass className={`${onClickAmberStyles} p-3 m-1`} onClick={()=>{}} >Cancel</Glass>
                            </div>
                        </div>


                    </Glass>

                    {/* other game reviews */}

                </GamePanel>
            </FlexContainer>

        </div>
    );

    if (loading) {
        return LoadingPage();
    } else {
        return DefaultPage;
    }

}
