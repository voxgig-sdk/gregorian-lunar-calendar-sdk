export interface Lunardate {
    day?: string;
    isLeapMonth?: boolean;
    month?: string;
    year?: string;
    yearCycle?: number;
    zodiac?: string;
}
export interface LunardateLoadMatch {
    date: string;
}
