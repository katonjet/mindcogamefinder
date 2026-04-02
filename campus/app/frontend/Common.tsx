import { Glass } from "./Glass";

export type divCommon = {children?: React.ReactNode; style?: React.CSSProperties; className?: string; onClick?: (()=>void);};

export function H1({children, style, className}: divCommon){
    return <div className={`text-6xl mb-4 mt-4 font-bold ${className}`} style={style}>{children}</div>
}

export function H2({children, style, className}: divCommon){
    return <div className={`text-4xl mb-4 font-bold ${className}`} style={style}>{children}</div>
}

export function P({children, style, className, onClick}: divCommon){
    return <div onClick={onClick} style={style} className={`text-lg ${className}`}>{children}</div>
}

export function FlexContainer({children}: divCommon){
    return <div className="flex">{children}</div>
}

export function GamePanel({className, style, children}: divCommon) {
    return <Glass className={`p-8 m-5 first:ml-0 last:mr-0 ${className}`} style={style}>
        {children}
    </Glass>;
}

const hexToRGB = (hex: string): number[] => {
  // Remove leading '#' if present
  hex = hex.startsWith("#") ? hex.slice(1) : hex;

  // Expand 3-digit shorthand (e.g., "27a" -> "2277aa")
  if (hex.length === 3) {
    hex = hex.split("").reduce((str, x) => str + x + x, "");
  }

  // Split string into chunks of 2 and convert to integers
  const values = hex
    .split(/([a-f0-9]{2})/i)
    .filter(Boolean)
    .map((x) => parseInt(x, 16));

  // Return formatted string with 'a' if alpha is detected
  //return `rgb${values.length === 4 ? "a" : ""}(${values.join(", ")})`;

  return values;
};

export function Pill({children, style, className, onClick, colorHex}: divCommon & {colorHex?: string}){

    //ARRAY => 0-Red,  1-Green,  2-Blue
    const rgbVals = hexToRGB(colorHex || '#000000');

    //Formula 1
    for (let i = 0; i < rgbVals.length; i++) {
        rgbVals[i] = ((rgbVals[i] + 0.055) / 1.055)^2.4;
    }

    //Formula 2 - luminance
    const luminance_bg = (rgbVals[0] * 0.2126) + (rgbVals[1] * 0.7152) + (rgbVals[2] * 0.0722)
    const luminance_white_text = (255 * 0.2126) + (255 * 0.7152) + (255 * 0.0722)
    
    //Formula 3 - contrast ratio
    const contrastRatio = luminance_white_text / luminance_bg;

    return <Glass onClick={onClick} className={`${(contrastRatio<2) ? 'hover:text-black' : ''} p-3 m-1 first:ml-0 last:mr-0 ${className} whitespace-nowrap`} style={style}>{children}</Glass>;
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