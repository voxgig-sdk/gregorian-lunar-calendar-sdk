export interface LunarDate {
    day?: string;
    isLeapMonth?: boolean;
    month?: string;
    year?: string;
    yearCycle?: number;
    zodiac?: string;
}
export interface LunarDateLoadMatch {
    date: string;
}
