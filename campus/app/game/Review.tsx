import { Glass, onClickAmberStyles } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";
import { getSelectUsersGameReviews, sendChangedGameReview, sendNewGameReview } from "@/lib/user";
import { useEffect, useState } from "react";

export default function ReviewPopup(
    {gameid,
    effectReturnFn,
    reviewid = -1,
}
    :
    {gameid: number;
    effectReturnFn: ((arg: boolean)=>void);
    reviewid?: number;}
){

    //React Hooks and consts
    const [myReviewRating, setMyReviewRating] = useState(0); //zero as null
    const [myReviewTitle, setMyReviewTitle] = useState("");
    const [myReviewComment, setMyReviewComment] = useState("");

    //Star rating Component
    //interactive stars
    const starHoverControl = (rate: number) => {
        //Reset state
        (document.getElementById('star1') as HTMLElement).style.color = '';
        (document.getElementById('star2') as HTMLElement).style.color = '';
        (document.getElementById('star3') as HTMLElement).style.color = '';
        (document.getElementById('star4') as HTMLElement).style.color = '';
        (document.getElementById('star5') as HTMLElement).style.color = ''; 
        
        //new state
        if (rate >= 1 && rate <= 5){
            setMyReviewRating(rate)
            if (rate >= 1) (document.getElementById('star1') as HTMLElement).style.color = 'yellow';
            if (rate >= 2) (document.getElementById('star2') as HTMLElement).style.color = 'yellow';
            if (rate >= 3) (document.getElementById('star3') as HTMLElement).style.color = 'yellow';
            if (rate >= 4) (document.getElementById('star4') as HTMLElement).style.color = 'yellow';
            if (rate >= 5) (document.getElementById('star5') as HTMLElement).style.color = 'yellow';
        }  
    }
    const starFn = (rate: number) => {//set rating value
        //Reset rate
        (document.getElementById('star1') as HTMLElement).innerHTML = 'B';
        (document.getElementById('star2') as HTMLElement).innerHTML = 'B';
        (document.getElementById('star3') as HTMLElement).innerHTML = 'B';
        (document.getElementById('star4') as HTMLElement).innerHTML = 'B';
        (document.getElementById('star5') as HTMLElement).innerHTML = 'B';

        //check range
        if (rate >= 1 && rate <= 5){
            if (rate >= 1) (document.getElementById('star1') as HTMLElement).innerHTML = 'F';
            if (rate >= 2) (document.getElementById('star2') as HTMLElement).innerHTML = 'F';
            if (rate >= 3) (document.getElementById('star3') as HTMLElement).innerHTML = 'F';
            if (rate >= 4) (document.getElementById('star4') as HTMLElement).innerHTML = 'F';
            if (rate >= 5) (document.getElementById('star5') as HTMLElement).innerHTML = 'F';
        } 
    }

    //Post Hook and consts declaration tasks
    useEffect(()=>{//only runs in editing mode (review id higher than -1)

        const getSelectReview = async () => {
            if (reviewid>-1) {
                const res = await getSelectUsersGameReviews(reviewid)
                if (res) {
                    setMyReviewRating(res.rating)
                    setMyReviewTitle(res.title)
                    setMyReviewComment(res.comment)

                    starFn(Number(res.rating));
                    (document.getElementById('title') as HTMLInputElement).value = res.title;
                    (document.getElementById('comment') as HTMLTextAreaElement).value = res.comment;
                }
            }
        }
        getSelectReview();

    },[]);

    const triggerServerSend = () => {
        if (myReviewRating>=1 && myReviewRating<=5){//rating is required

            try {

                if (reviewid < 0){ //new review
                    sendNewGameReview(gameid, myReviewRating, myReviewTitle, myReviewComment);
                } else {//update existing review
                    sendChangedGameReview(reviewid, myReviewRating, myReviewTitle, myReviewComment)
                }
                effectReturnFn(true)

            } catch (error) {
                const msg = (error instanceof Error)? (`${error.name}: ${error.message}`) : String(error)
                console.error(`Request to server failed -> ${msg}`)
            }

        } else {
            //error pop up
        }
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {setMyReviewTitle(event.target.value);};
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {setMyReviewComment(event.target.value);};

    return <div className="grid items-center justify-center bg-black/60 backdrop-blur-3xl fixed min-h-screen min-w-screen z-10">
        <div className="min-w-4xl w-4xl max-h-fit h-fit">
            <Glass className="p-4 bg-white/10">
                
                <div className="flex flex-row">
                    <div className="flex-1"></div>

                    <div className="flex flex-col flex-5">

                        <div className="flex mt-4 mb-4">
                            <div className="text-right flex-2">Rating</div>
                            <div className={`flex-10 ml-5 flex ${GlyphClass().className} text-5xl leading-7`}>
                                    <div id='star1' onMouseEnter={()=>{starHoverControl(1)}} onMouseLeave={()=>{starHoverControl(0)}} onClick={()=>{starFn(1)}}>B</div>
                                    <div id='star2' onMouseEnter={()=>{starHoverControl(2)}} onMouseLeave={()=>{starHoverControl(0)}} onClick={()=>{starFn(2)}}>B</div>
                                    <div id='star3' onMouseEnter={()=>{starHoverControl(3)}} onMouseLeave={()=>{starHoverControl(0)}} onClick={()=>{starFn(3)}}>B</div>
                                    <div id='star4' onMouseEnter={()=>{starHoverControl(4)}} onMouseLeave={()=>{starHoverControl(0)}} onClick={()=>{starFn(4)}}>B</div>
                                    <div id='star5' onMouseEnter={()=>{starHoverControl(5)}} onMouseLeave={()=>{starHoverControl(0)}} onClick={()=>{starFn(5)}}>B</div>
                                </div>
                        </div>

                        <div className="flex mt-4 mb-4">
                            <div className="text-right flex-2">Title</div>
                            <input onChange={handleTitleChange} className="ml-5 rounded-4xl bg-black/60 flex-10 p-2" type="text" name="" id="title" />
                        </div>

                        <div className="flex mt-4 mb-4">
                            <div className="text-right flex-2">Comment</div>
                            <textarea onChange={handleCommentChange} className="ml-5 h-36 rounded-2xl bg-black/60 flex-10 p-2" name="" id="comment"></textarea>
                        </div>

                        <div className="flex flex-row mt-4 mb-4">
                            <div className="flex-2"></div>
                            <div className="flex-11 ml-5 flex justify-start">
                                    <Glass className="p-3 m-1" onClick={()=>{triggerServerSend()}}>Submit</Glass>
                                    <Glass className={`${onClickAmberStyles} p-3 m-1`} onClick={()=>{effectReturnFn(false)}} >Cancel</Glass>
                            </div>
                        </div>

                    </div>
                    <div className="flex-1"></div>
                </div>



            </Glass>
        </div>
    </div>
}