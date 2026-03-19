"use client";

import { setGameBackdrop } from "@/app/frontend/Background";
import { H1, P, divCommon, FlexContainer, Pill, PillContainer, GamePanel } from "@/app/frontend/Common";
import { Glass } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
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
        return "B";
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

    const [title, setTitle] = useState("A game");
    const [desc, setDesc] = useState("A game description");
    const [rating, setRating] = useState("0");
    const [genres, setGenres] = useState([]);

    useEffect(() => {

        const asyncFunc = async () => {
            const { gameid } = await params;
            const gameData = await getGame(gameid);
            if (gameData) {
                setTitle(gameData.title);
                setDesc(gameData.desc);
                setRating(gameData.avgrating);
                setGenres(JSON.parse(gameData.genres));
                setGameBackdrop(`http://localhost:8000${gameData.backdropimagepath}`);
            }
        };

        asyncFunc();

    },[]);

    //const { gameid } = await params;
    //textShadow: `3px 3px 30px rgba(10,10,10), -3px -3px 30px rgba(10,10,10)`
    return(
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
                            {/*<Pill>RPG</Pill>
                            <Pill>Action</Pill>*/}
                            {genres.map((genre) => {
                                return <Pill key={genre}>{genre}</Pill>;
                            })}
                        </PillContainer>
                    </div>
                </div>
            </div>

            <FlexContainer>
                <GamePanel className="flex-1 overflow-hidden">
                    <H1>Screenshots</H1>
                    <TestBar2/>
                </GamePanel>
            </FlexContainer>

            <FlexContainer>
                <GamePanel className="flex-1">
                    <H1>Review</H1>

                </GamePanel>
            </FlexContainer>

        </div>
    );

}