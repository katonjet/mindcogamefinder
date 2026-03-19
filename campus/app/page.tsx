import Image from "next/image";
import { Glass } from "./frontend/Glass";
import React from "react";
import Link from "next/link";


function TestBar () {

  const styleTest: React.CSSProperties = {
    backgroundImage: `url('/sunday.png')`,
    backgroundSize: 'cover',
  };

  const V: React.ReactNode = 
    <Link href={'/game/1'}>
      <Glass className="p-3 mr-5 first:ml-8 last:mr-8 text-center min-w-[450px] min-h-[254px] snap-start" style={styleTest}>
            <h1>Hello</h1>
            <p>This is a demo Test</p>
      </Glass>
    </Link>
      ;

  var output: React.ReactNode[] = [];

  for (let i = 0; i < 6; i++) {
    var E = React.cloneElement(V, {key: i.toString()});
    output.push(E)  
  }

  return output;

}

function TestBar2(){

  const V: React.ReactNode = <>
    <div className="flex relative">
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

  for (let i = 0; i < 3; i++){
    var E = React.cloneElement(V, {key: i.toString()});
    output.push(E);
  }

  return output;

}

export default function Home() {

  return (
    <>

      <Glass className="m-8 h-100 p-3 text-center">
        <h1>Hello</h1>
        <p>This is a Carosel Demo</p>
      </Glass>

      {TestBar2().map((test: React.ReactNode) => {
          return test;
        })}

    </>
  );
}
