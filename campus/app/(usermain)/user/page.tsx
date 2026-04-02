"use client";

import { useEffect, useState } from "react";
import { H1, H2, P, FlexContainer, GamePanel, getStarString } from "@/app/frontend/Common";
import { Glass, onClickAmberStyles } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import { deleteGameReview, getUsersGameReviews, isLoggedIn } from "@/lib/user";


import Link from "next/link";
import LoadingPage, { DelayLoad } from "@/app/frontend/LoadingPage";
import { useRouter } from "next/navigation";
import Review from "@/app/game/Review";
import { hideHeaderFn } from "@/app/frontend/Header";
import { setBackColor } from "@/app/frontend/Background";
import { serverURL } from "@/lib/axios";

export default function Page(){

    const router = useRouter();

    const [loggedIN, setLoggedIN] = useState(false);
    const [loading, setLoading] = useState(true);

    const lStore = localStorage.getItem('userData'); //error showing up as 'localStorage not defined'
    const userData = JSON.parse(lStore as string);

    const [myReviewList, setMyReviewList] = useState([]);

    //For game review writing
    const [showReviewPopup,setShowReviewPopup] = useState(false);

    const [editReviewId, setEditReviewId] = useState(-1);
    const [editReviewGameId, setEditReviewGameId] = useState(-1);

    //Toggle based refresh
    const [reviewListRefreshToggle, setReviewListRefreshToggle] = useState(false);


    useEffect(()=>{
        const asyncFn = async () => {

            DelayLoad(2000)
            try {
                const data = await getUsersGameReviews();
                setMyReviewList(data)
                console.log(myReviewList)
            } catch (error) {
                console.log("Cannot fetch reviews");
            }

        };
        asyncFn();
    },[reviewListRefreshToggle]);

    //Check if user is logged in
    useEffect(() => {
        const loginCheck = async () => {
            if (isLoggedIn()){
                setLoggedIN(true)
            } else {
                router.push('/login')
            }

            await DelayLoad(2000);
            setLoading(false);
            setBackColor('#e67d19') //testing colors
        }
        loginCheck();
    });

    function toggleRefresh(fn: ((...args: any[]) => any), ...args: any[]){
        fn(args); //Trigger received function

        setReviewListRefreshToggle(!reviewListRefreshToggle); //Refresh list
        //if (fn.name==='deleteGameReview') {
        //}
    }

    function triggerReviewEdit(reviewId: number, gameid: number){
        setEditReviewId(reviewId)
        setEditReviewGameId(gameid)
        hideHeaderFn(true)
        setShowReviewPopup(true)
    }

    function triggerSendEdit(status_: boolean) {
        hideHeaderFn(false)
        setShowReviewPopup(false)
        if (status_) toggleRefresh(console.log, 'refresh requested');

        //Reset back to normal
        setEditReviewId(-1);
        setEditReviewGameId(-1);
    }

    function UserPage(){

        return (<>
        {/* Game reviewing panel */}
        {showReviewPopup ? (<Review
            gameid={editReviewGameId}
            reviewid={editReviewId}
            effectReturnFn={triggerSendEdit} />
            ) : null}
        <div className="m-14 ml-40 mr-40">

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
                        <H1>My Reviews</H1>
                        <div className="grid grid-cols-2 gap-5">
                            {
                                (myReviewList.length===0 || !myReviewList) ? (<div><P className="text-center p-3">No comments found</P></div>) : (
                                    myReviewList.map((review: any)=>{
                                    return (<Glass key={review.id} style={{backgroundImage: `url(${serverURL}${review.game.backdropimagepath})`}} className="p-10 bg-cover bg-center text-shadow-none">
                                            <Glass className="m-0 p-0 backdrop-blur-none border-none absolute bg-contain inset-0 -z-10 bg-black/40 overflow-hidden"></Glass>
                                            <div className="relative z-10">
                                                <div className="flex ml-1">
                                                    <H2 className="flex-1">{(!review.title || review.title==="") ? "Rating only" : review.title}</H2>
                                                    <H2 className={`${GlyphClass().className}`}>{getStarString(review.rating)}</H2>
                                                </div>

                                                <P className="ml-1 min-h-15 line-clamp-2">{review.comment}</P>

                                                <div className="flex flex-row mt-3">
                                                    <Link href={`/game/${review.game_id}`} className="mr-3">
                                                        <Glass onClick={()=>{}} className={`p-3 max-w-min m-0`}>
                                                            <span className="whitespace-nowrap">View game</span>
                                                        </Glass>
                                                    </Link>    
                                                    <Glass onClick={()=>{
                                                        triggerReviewEdit(
                                                            review.id,
                                                            review.game_id
                                                        )
                                                    }} className={`p-3 max-w-min m-0 mr-3`}>
                                                        <span className="whitespace-nowrap">Edit</span>
                                                    </Glass>
                                                    <Glass onClick={()=>{toggleRefresh(deleteGameReview, review.id)}} className={`p-3 max-w-min m-0 mr-3 ${onClickAmberStyles} text-shadow-none`}>
                                                        <span className="whitespace-nowrap">Remove</span>
                                                    </Glass>
                                                </div>
                                            </div>
                                    </Glass>);
                                })
                                )
                            }
                        </div>

                    </GamePanel>
            </FlexContainer>

        </div>
        </>);
        }

        if (loading) {
            return LoadingPage();
        } else {
            return (!loggedIN)? (<>
                    {/* USER NOT LOGGED IN - redirected to login page */}
                </>)
                :
                (UserPage());
        }

}