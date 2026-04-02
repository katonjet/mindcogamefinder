
import { Glass, onClickAmberStyles } from "@/app/frontend/Glass";
import React from "react";

function TestBar (count: number) {

  const styleTest: React.CSSProperties = {
    backgroundImage: `url('/tuesday.png')`,
    backgroundSize: 'cover',
  };

  const V: React.ReactNode = 
      <Glass className="p-3 text-center min-w-[70vw] min-h-[70vh] snap-start mr-20 first:ml-40 last:mr-40" style={styleTest}>
      </Glass>
      ;

  var output: React.ReactNode[] = [];

  for (let i = 0; i < count; i++) {
    var E = React.cloneElement(V, {key: i.toString()});
    output.push(E)  
  }

  return output;

}

function TestBar2(count?: number){

  const V: React.ReactNode = <>
    <div className="flex relative">
      <div className="flex overflow-x-scroll whitespace-nowrap snap-mandatory mt-6" 
                style={{
                  scrollbarWidth: 'none',
                }}>
            {TestBar(count ? count : 6).map((test: React.ReactNode) => {
              return test;
            })}
      </div>
    </div>
  </>

  return V;

}

export default function ScreenshotViewPanel(closeAction: ()=>void){

    return <div className="bg-black/60 backdrop-blur-3xl fixed min-h-screen min-w-screen z-10">

        <div className="min-w-screen mt-10 h-screen min-h-screen min w-screen flex flex-col">
            <div className="flex mb-10 pl-40 pr-40">
                <div className="flex-1"></div>
                <div className="flex items-center">
                    <Glass className={`max-h-min p-3 flex justify-center items-center align-middle ml-6 text-4xl rounded-[100px] ${onClickAmberStyles}`} onClick={closeAction}>
                        <div className="m-4 leading-10">Close</div>
                    </Glass>
                </div>
            </div>

            <div className="flex-1">
                {TestBar2()}
            </div>

        </div>

    </div>

}