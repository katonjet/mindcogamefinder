import { getStarString, H1, H2, P } from "@/app/frontend/Common";
import { Glass, onClickAmberStyles } from "@/app/frontend/Glass";
import { GlyphClass } from "@/app/frontend/Glyphs";

export default function ReviewViewPanel(reviews: any, closeAction: ()=>void){

    return <div className="bg-black/60 backdrop-blur-3xl fixed min-h-screen min-w-screen z-10">

        <div className="min-w-screen h-screen min-h-screen min w-screen flex flex-col relative">

            <div className="flex mb-5 items-end absolute pl-40 pr-40 z-13 w-screen min-w-screen">
                <div className="flex-1"></div>
                <div className="flex items-center">
                    <Glass className={`max-h-min p-3 mt-7 mb-7 flex justify-center items-center align-middle text-4xl rounded-[100px] ${onClickAmberStyles}`} onClick={closeAction}>
                        <div className="m-4 leading-10">Close</div>
                    </Glass>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pl-40 pr-40 absolute inset-0 z-12 max-h-screen h-screen" style={{ scrollbarWidth: 'none' }}>
                <div className="mt-40"></div>
                <div className="grid grid-cols-2 gap-5 auto-rows-fr">
                    {reviews.map((n: any) => {
                    return ((n.title || n.comment) ? <Glass key={n.id} className="p-10 text-shadow-none">
                                <div className="flex">
                                    <H2 className="flex-1">{n.title}</H2>
                                    <H2 className={`${GlyphClass().className}`}>{getStarString(n.rating)}</H2>
                                </div>
                                <P>{n.comment}</P>
                            </Glass> : null)
                    })}
                </div>
                <div className="mb-40"></div>
            </div>


        </div>

    </div>

}