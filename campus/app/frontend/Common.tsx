import { Glass } from "./Glass";

export type divCommon = {children?: React.ReactNode; style?: React.CSSProperties; className?: string; onClick?: (()=>void);};

export function H1({children, style, className}: divCommon){
    return <div className={`text-6xl mb-4 mt-4 font-bold ${className}`} style={style}>{children}</div>
}

export function H2({children, style, className}: divCommon){
    return <div className={`text-4xl mb-4 font-bold ${className}`} style={style}>{children}</div>
}

export function P({children, style, className}: divCommon){
    return <div style={style} className={`text-lg ${className}`}>{children}</div>
}

export function FlexContainer({children}: divCommon){
    return <div className="flex">{children}</div>
}

export function GamePanel({className, style, children}: divCommon) {
    return <Glass className={`p-8 m-5 first:ml-0 last:mr-0 ${className}`} style={style}>
        {children}
    </Glass>;
}

export function Pill({children, style, className}: divCommon){
    return <Glass className={`p-3 m-1 first:ml-0 last:mr-0 ${className}`} style={style}>{children}</Glass>;
}

export function PillContainer({children, style, className}: divCommon){
    return <div className={`flex ${className}`} style={style}>{children}</div>;
}

//DO NOT FORGET TO APPLY MY_GLYPH
export function getStarString(rating: string): string {
    const tempRating = Number(rating);

    //Make sure rating value is within range while not crashing the frontend
    if (tempRating < 1 || tempRating > 5){
        return 'BBBBB'
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

    return `${fullStarString()}${partialStarCharacter()}${emptyStarString()}`;
}