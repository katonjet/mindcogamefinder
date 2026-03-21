"use client";

import { useEffect, useState } from "react";
import { H1, H2, P, FlexContainer, GamePanel } from "../../frontend/Common";
import { Glass, onClickAmberStyles } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import { deleteGameReview, getUsersGameReviews, isLoggedIn } from "@/lib/user";


import Link from "next/link";

export default function Page(){

    const [loggedIN, setLoggedIN] = useState(false);
    const [loading, setLoading] = useState(true);

    const lStore = localStorage.getItem('userData'); //error showing up as 'localStorage not defined'
    const userData = JSON.parse(lStore as string);

    const [myReviewList, setMyReviewList] = useState([]);

    useEffect(()=>{

        const asyncFn = async () => {

            try {
                const data = await getUsersGameReviews();
                setMyReviewList(data)
                console.log(myReviewList)
            } catch (error) {
                console.log("Cannot fetch reviews");
            }

        };

        asyncFn();

    },[]);

    useEffect(() => {

        const loginCheck = async () => {

            if (isLoggedIn()) setLoggedIN(true);
 
            setLoading(false);

        }

        loginCheck();

    });

    function UserPage(){

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
                    <Glass onClick={()=>{}} className={`p-3 max-w-min whitespace-nowrap text-shadow-none ${onClickAmberStyles}`}>
                            Log Out
                    </Glass>
                </Link>
            </div>
        </div>

        {/* Review list */}
        <FlexContainer>
                <GamePanel className="flex-1">
                    <H1>Reviews</H1>

                    {/*<Glass className="mb-5 p-10">
                        <H2>Review 1</H2>
                        <P>Good Game</P>
                        <Glass onClick={()=>{}} className={`p-3 max-w-min mt-3 ${onClickAmberStyles} text-shadow-none`}>
                            <span className="whitespace-nowrap">Remove</span>
                        </Glass>
                    </Glass>*/}
                    {myReviewList.map((review: any)=>{
                        return (<Glass key={review.id} className="mb-5 p-10">
                                <H2>{review.title}</H2>
                                <P>{review.comment}</P>
                                <Glass onClick={()=>{deleteGameReview(review.id)}} className={`p-3 max-w-min mt-3 ${onClickAmberStyles} text-shadow-none`}>
                                    <span className="whitespace-nowrap">Remove</span>
                                </Glass>
                        </Glass>);
                    })}

                </GamePanel>
        </FlexContainer>

    </div>);
}

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