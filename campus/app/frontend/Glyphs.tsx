import localFont from 'next/font/local';

const myGlyph = localFont({src: './glyphs.woff'});

export function GlyphClass(){
    return myGlyph;
}