//to improve user experience
export function DelayLoad(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Loading() {
    return (<>
        <div className="flex justify-center animate-pulse min-h-screen h-screen text-center">
            <div className={`cursor-default inline self-center text-center font-[1000] text-9xl p-0 m-1 mb-20`}>
                GameFinder
            </div>
        </div>
    </>);
}