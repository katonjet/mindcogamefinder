import { Glass } from "./Glass";

export type divCommon = {children?: React.ReactNode; style?: React.CSSProperties; className?: string;};

export function H1({children, style, className}: divCommon){
    return <div className={`text-6xl mb-6 font-bold ${className}`} style={style}>{children}</div>
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