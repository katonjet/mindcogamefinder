"use client";

import { useEffect, useState } from "react";
import { H1, H2, P, FlexContainer, GamePanel } from "../../frontend/Common";
import { Glass } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import { isLoggedIn } from "@/lib/user";


function UserPage(){

    const userData = JSON.parse(localStorage.getItem('userData') as string);

    return (<div className="m-14 ml-40 mr-40">
        
        {/* User Info */}
        <div className="flex">
            <Glass
                className={`${GlyphClass().className} text-shadow-none min-w-max`}
                style={{
                    fontSize: '256px',
                    lineHeight: 1,
                    borderRadius: '256px',
                }}
            >
                A
            </Glass>
            <div className={`flex-5 flex flex-col pl-10 justify-center`}>
                <H1 style={{textShadow: `0px 0px 50px rgba(0,0,0,0.7), 0px 0px 50px rgba(0,0,0,0.7)`}}>{userData.name}</H1>
                <P className="text-shadow-lg font-bold">{userData.email}</P>
                <Link href={'/logout'} className="max-h-max max-w-max mt-3">
                    <Glass className="cursor-pointer p-3 max-w-min hover:bg-red-600 active:bg-red-900 transition-colors delay-50 whitespace-nowrap text-shadow-none">
                            Log Out
                    </Glass>
                </Link>
            </div>
        </div>

        {/* Review list */}
        <FlexContainer>
                <GamePanel className="flex-1">
                    <H1>Reviews</H1>

                    <Glass className="mb-5 p-10">
                        <H2>Review 1</H2>
                        <P>Good Game</P>
                        <Glass className="p-3 max-w-min mt-3 hover:bg-red-600 active:bg-red-900 transition-colors delay-50 text-shadow-none">
                            <span className="whitespace-nowrap">Remove</span>
                        </Glass>
                    </Glass>
                    <Glass className="mb-5 p-10">
                        <H2>Review 1</H2>
                        <P>Bad Game</P>
                        <Glass className="p-3 max-w-min mt-3 hover:bg-red-600 active:bg-red-900 transition-colors delay-50 text-shadow-none">
                            <span className="whitespace-nowrap">Remove</span>
                        </Glass>
                    </Glass>
                    <Glass className="mb-5 p-10">
                        <H2>Review 1</H2>
                        <P>Meh</P>
                        <Glass className="p-3 max-w-min mt-3 hover:bg-red-600 active:bg-red-900 transition-colors delay-50 text-shadow-none">
                            <span className="whitespace-nowrap">Remove</span>
                        </Glass>
                    </Glass>
                </GamePanel>
        </FlexContainer>

    </div>);
}

import Link from "next/link";

export default function Page(){

    const [loggedIN, setLoggedIN] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loginCheck = async () => {

            if (isLoggedIn()) setLoggedIN(true);
 
            setLoading(false);

        }

        loginCheck();

    });

    if (loading) {
        return <p>Please wait</p>;
    } else {
        return (!loggedIN)? (<>
                <div>You must login</div>
                <Link href={'/login'}>Click here to login</Link>
            </>)
            :
            (UserPage());
    }

}